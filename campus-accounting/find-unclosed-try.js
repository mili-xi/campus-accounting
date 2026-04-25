const fs = require('fs');
const path = require('path');

const analysisFile = path.join(__dirname, 'pages', 'analysis', 'analysis.js');
const content = fs.readFileSync(analysisFile, 'utf8');

console.log('=== 查找未闭合的 try 块 ===');

const lines = content.split('\n');
const stack = [];

lines.forEach((line, index) => {
  // 查找 try 语句
  if (line.includes('try {')) {
    stack.push({
      line: index + 1,
      type: 'try',
      content: line.trim()
    });
  }
  
  // 查找 catch 语句
  if (line.includes('catch (') && stack.length > 0 && stack[stack.length - 1].type === 'try') {
    stack.pop();
  }
  
  // 查找 finally 语句
  if (line.includes('finally {') && stack.length > 0 && stack[stack.length - 1].type === 'try') {
    stack.pop();
  }
  
  // 查找 try 块的结束
  if (line.includes('}') && stack.length > 0) {
    const currentStack = stack[stack.length - 1];
    
    // 检查是否有对应的 catch 或 finally
    const searchRange = Math.min(lines.length - index - 1, 20); // 向前搜索 20 行
    let hasCatchOrFinally = false;
    
    for (let i = 1; i <= searchRange; i++) {
      const nextLine = lines[index + i];
      if (nextLine && (nextLine.includes('catch (') || nextLine.includes('finally {'))) {
        hasCatchOrFinally = true;
        break;
      }
    }
    
    if (!hasCatchOrFinally) {
      console.log(`在第 ${index + 1} 行发现可能未闭合的 try 块（开始于第 ${currentStack.line} 行）:`);
      console.log(`  开始行内容: ${currentStack.content}`);
      console.log(`  结束行内容: ${line.trim()}`);
      console.log();
    }
  }
});

console.log(`=== 栈状态: ${stack.length} 个未闭合的块 ===`);
stack.forEach((item, index) => {
  console.log(`  ${index + 1}. ${item.type} - 第 ${item.line} 行`);
});
