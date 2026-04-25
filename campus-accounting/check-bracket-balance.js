const fs = require('fs');
const path = require('path');

const analysisFile = path.join(__dirname, 'pages', 'analysis', 'analysis.js');
const content = fs.readFileSync(analysisFile, 'utf8');

// 检查括号匹配
function checkBracketBalance(text) {
    const stack = [];
    let errors = [];
    
    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        const lineNum = text.slice(0, i).split('\n').length;
        
        if (char === '{' || char === '[' || char === '(') {
            stack.push({ char, index: i, line: lineNum });
        } else if (char === '}' || char === ']' || char === ')') {
            const matching = stack.pop();
            
            if (!matching) {
                errors.push(`Unmatched closing bracket '${char}' at line ${lineNum}`);
            } else if (
                (char === '}' && matching.char !== '{') ||
                (char === ']' && matching.char !== '[') ||
                (char === ')' && matching.char !== '(')
            ) {
                errors.push(`Mismatched bracket at line ${lineNum}: '${char}' does not match '${matching.char}'`);
            }
        }
    }
    
    // 检查未匹配的打开括号
    stack.forEach(opening => {
        errors.push(`Unmatched opening bracket '${opening.char}' at line ${opening.line}`);
    });
    
    return errors;
}

// 查找 drawCharts 函数
function findDrawCharts(text) {
    const start = text.indexOf('drawCharts: function') + 'drawCharts: function'.length;
    let openBrackets = 0;
    let end = -1;
    
    for (let i = start; i < text.length; i++) {
        if (text[i] === '{') {
            openBrackets++;
            if (openBrackets === 1) {
                // 找到函数开始的左括号
                let tempOpen = 1;
                for (let j = i + 1; j < text.length; j++) {
                    if (text[j] === '{') tempOpen++;
                    else if (text[j] === '}') tempOpen--;
                    
                    if (tempOpen === 0) {
                        end = j;
                        break;
                    }
                }
                break;
            }
        }
    }
    
    if (end !== -1) {
        return text.slice(start, end + 1);
    }
    return null;
}

// 执行检查
const drawChartsContent = findDrawCharts(content);

if (drawChartsContent) {
    console.log('=== drawCharts 函数内容 ===');
    console.log(drawChartsContent);
    console.log('=== 括号匹配检查 ===');
    
    const errors = checkBracketBalance(drawChartsContent);
    
    if (errors.length > 0) {
        console.log('发现问题:');
        errors.forEach(error => console.log(error));
    } else {
        console.log('括号匹配完全');
    }
} else {
    console.log('未找到 drawCharts 函数');
}

console.log('=== 整个文件括号匹配检查 ===');
const allErrors = checkBracketBalance(content);
if (allErrors.length > 0) {
    console.log('发现问题:');
    allErrors.forEach(error => console.log(error));
} else {
    console.log('括号匹配完全');
}
