const fs = require('fs');
const acorn = require('acorn');
const path = require('path');

const analysisFile = path.join(__dirname, 'pages', 'analysis', 'analysis.js');
const content = fs.readFileSync(analysisFile, 'utf8');

console.log('=== 逐行解析分析文件语法 (script 模式) ===');

const lines = content.split('\n');
let cumulativeCode = '';

for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // 跳过空行和单行注释
    if (!line || line.startsWith('//')) {
        cumulativeCode += '\n';
        continue;
    }
    
    try {
        // 尝试解析当前累计的代码
        cumulativeCode += line + '\n';
        acorn.parse(cumulativeCode, {
            ecmaVersion: 'latest',
            sourceType: 'script'
        });
    } catch (error) {
        // 只有当解析到当前行时出现的错误才记录
        console.log(`第 ${i + 1} 行解析失败: ${error.message}`);
        console.log('行内容:', line);
        console.log('当前累计代码长度:', cumulativeCode.length);
        
        // 显示周围的上下文
        console.log('\n=== 上下文 ===');
        const startLine = Math.max(0, i - 5);
        const endLine = Math.min(lines.length - 1, i + 5);
        for (let j = startLine; j <= endLine; j++) {
            const prefix = j === i ? '👉' : '  ';
            console.log(`${prefix}${j + 1}: ${lines[j]}`);
        }
        
        console.log('\n=== 代码片段 ===');
        console.log(cumulativeCode.slice(Math.max(0, cumulativeCode.length - 200)));
        
        return;
    }
}

console.log('✅ 整个文件解析成功');
