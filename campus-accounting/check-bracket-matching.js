const fs = require('fs');
const path = require('path');

const analysisFile = path.join(__dirname, 'pages', 'analysis', 'analysis.js');
const content = fs.readFileSync(analysisFile, 'utf8');

console.log('=== 检查括号匹配 ===');

const lines = content.split('\n');
const stack = [];
let hasErrors = false;

lines.forEach((line, index) => {
    for (let i = 0; i < line.length; i++) {
        const char = line[i];
        
        if (char === '{') {
            stack.push({ type: '{', line: index + 1, column: i + 1 });
        } else if (char === '}') {
            if (stack.length === 0) {
                console.error(`第 ${index + 1} 行第 ${i + 1} 列有多余的闭合括号 }`);
                hasErrors = true;
            } else {
                const last = stack.pop();
                if (last.type !== '{') {
                    console.error(`第 ${index + 1} 行第 ${i + 1} 列括号不匹配，期望 ${last.type} 但找到了 }`);
                    hasErrors = true;
                }
            }
        } else if (char === '(') {
            stack.push({ type: '(', line: index + 1, column: i + 1 });
        } else if (char === ')') {
            if (stack.length === 0) {
                console.error(`第 ${index + 1} 行第 ${i + 1} 列有多余的闭合括号 )`);
                hasErrors = true;
            } else {
                const last = stack.pop();
                if (last.type !== '(') {
                    console.error(`第 ${index + 1} 行第 ${i + 1} 列括号不匹配，期望 ${last.type} 但找到了 )`);
                    hasErrors = true;
                }
            }
        } else if (char === '[') {
            stack.push({ type: '[', line: index + 1, column: i + 1 });
        } else if (char === ']') {
            if (stack.length === 0) {
                console.error(`第 ${index + 1} 行第 ${i + 1} 列有多余的闭合括号 ]`);
                hasErrors = true;
            } else {
                const last = stack.pop();
                if (last.type !== '[') {
                    console.error(`第 ${index + 1} 行第 ${i + 1} 列括号不匹配，期望 ${last.type} 但找到了 ]`);
                    hasErrors = true;
                }
            }
        }
    }
});

// 检查是否还有未闭合的括号
if (stack.length > 0) {
    console.error(`有 ${stack.length} 个未闭合的括号：`);
    stack.forEach(item => {
        console.error(`类型 ${item.type} 第 ${item.line} 行第 ${item.column} 列`);
    });
    hasErrors = true;
}

if (!hasErrors) {
    console.log('✅ 所有括号都匹配');
}
