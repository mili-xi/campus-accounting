
const fs = require('fs');
const path = 'pages/analysis/analysis.js';

try {
    const content = fs.readFileSync(path, 'utf8');
    console.log('文件读取成功');
    
    // 尝试使用不同的编码方式读取
    const contentUtf8 = fs.readFileSync(path, 'utf8');
    console.log('UTF8编码读取成功');
    
    // 检查是否有非UTF8字符
    let invalidChars = 0;
    for (let i = 0; i < content.length; i++) {
        const charCode = content.charCodeAt(i);
        if (charCode < 32 && charCode !== 9 && charCode !== 10 && charCode !== 13) {
            console.log(`发现控制字符 at position ${i}: ${charCode}`);
            invalidChars++;
        }
        if (charCode > 127) {
            // 检查是否是有效的UTF8多字节字符
            let valid = false;
            if (charCode >= 0xC0 && charCode <= 0xDF) { // 2字节序列
                if (i+1 < content.length && content.charCodeAt(i+1) >= 0x80 && content.charCodeAt(i+1) <= 0xBF) {
                    valid = true;
                }
            } else if (charCode >= 0xE0 && charCode <= 0xEF) { // 3字节序列
                if (i+2 < content.length && 
                    content.charCodeAt(i+1) >= 0x80 && content.charCodeAt(i+1) <= 0xBF && 
                    content.charCodeAt(i+2) >= 0x80 && content.charCodeAt(i+2) <= 0xBF) {
                    valid = true;
                }
            } else if (charCode >= 0xF0 && charCode <= 0xF7) { // 4字节序列
                if (i+3 < content.length && 
                    content.charCodeAt(i+1) >= 0x80 && content.charCodeAt(i+1) <= 0xBF && 
                    content.charCodeAt(i+2) >= 0x80 && content.charCodeAt(i+2) <= 0xBF && 
                    content.charCodeAt(i+3) >= 0x80 && content.charCodeAt(i+3) <= 0xBF) {
                    valid = true;
                }
            }
            
            if (!valid) {
                console.log(`发现无效的UTF8字符 at position ${i}: ${charCode}`);
                invalidChars++;
            }
        }
    }
    console.log(`发现 ${invalidChars} 个无效字符`);
    
    // 尝试解析
    console.log('尝试解析文件...');
    const parseResult = require('vm').runInNewContext(content);
    console.log('解析成功');
    console.log(parseResult);
    
} catch (error) {
    console.log('Error:', error);
    if (error instanceof SyntaxError) {
        console.log('语法错误位置:', error.loc);
    }
    console.log('Stack:', error.stack);
}
