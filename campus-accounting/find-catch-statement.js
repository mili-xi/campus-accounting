const fs = require('fs');
const path = require('path');

const analysisFile = path.join(__dirname, 'pages', 'analysis', 'analysis.js');
const content = fs.readFileSync(analysisFile, 'utf8');

// 查找包含 catch 语句的行号
const lines = content.split('\n');
let foundCatch = false;

console.log('=== 查找 catch 语句 ===');
for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // 查找 catch 语句
    if (line.includes('catch') && line.includes('{')) {
        console.log(`在第 ${i + 1} 行找到 catch 语句: ${line.trim()}`);
        foundCatch = true;
        
        // 显示前后几行的上下文
        console.log('上下文:');
        const startLine = Math.max(0, i - 5);
        const endLine = Math.min(lines.length - 1, i + 5);
        
        for (let j = startLine; j <= endLine; j++) {
            const prefix = j === i ? '👉' : '  ';
            console.log(`${prefix}${j + 1}: ${lines[j]}`);
        }
        console.log();
    }
}

if (!foundCatch) {
    console.log('未找到包含 { 的 catch 语句');
}

// 同时检查可能的未闭合块
console.log('=== 检查未闭合的块 ===');
let openBraces = [];

for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmedLine = line.trim();
    
    // 跳过注释和空行
    if (trimmedLine.startsWith('//') || trimmedLine === '') {
        continue;
    }
    
    // 查找块开始
    for (let j = 0; j < trimmedLine.length; j++) {
        if (trimmedLine[j] === '{') {
            openBraces.push(i + 1);
        } else if (trimmedLine[j] === '}') {
            const openedAt = openBraces.pop();
            // 如果没有匹配的开启块，或者嵌套不正确
            if (!openedAt) {
                console.log(`第 ${i + 1} 行有额外的闭合括号}`);
            }
        }
    }
}

// 检查是否有未闭合的块
if (openBraces.length > 0) {
    console.log(`有 ${openBraces.length} 个未闭合的块，位于第 ${openBraces.join(', ')} 行`);
}

console.log('=== 检查完成 ===');
