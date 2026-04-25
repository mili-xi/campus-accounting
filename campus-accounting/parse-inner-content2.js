const fs = require('fs');
const acorn = require('acorn');
const path = require('path');

const analysisFile = path.join(__dirname, 'pages', 'analysis', 'analysis.js');
const content = fs.readFileSync(analysisFile, 'utf8');

console.log('=== 尝试解析 Page() 内部的内容 ===');

try {
  // 尝试提取 Page() 函数内部的对象字面量
  const pageStart = content.indexOf('Page({') + 6;
  const pageEnd = findMatchingBracket(content, pageStart, '{', '}');
  
  if (pageEnd === -1) {
    throw new Error('未找到匹配的闭合括号');
  }
  
  const pageContent = content.slice(pageStart, pageEnd);
  
  // 尝试解析函数声明
  console.log('=== 检查函数声明语法 ===');
  
  // 查找函数定义的位置
  const functionPattern = /\bfunction\s+\w+\s*\(\)/g;
  const functionMatch = functionPattern.exec(pageContent);
  
  if (functionMatch) {
    console.log(`找到函数声明: ${functionMatch[0]}`);
  }
  
  // 尝试解析单个函数
  const calculateDailyAverageIndex = pageContent.indexOf('calculateDailyAverage');
  if (calculateDailyAverageIndex !== -1) {
    const functionStart = pageContent.indexOf('{', calculateDailyAverageIndex);
    const functionEnd = findMatchingBracket(pageContent, functionStart, '{', '}');
    
    if (functionEnd !== -1) {
      const functionContent = pageContent.slice(calculateDailyAverageIndex, functionEnd + 1);
      
      console.log(`\n=== calculateDailyAverage 函数 ===`);
      console.log(functionContent.slice(0, 200));
      
      try {
        const parsedFunction = acorn.parse(`(${functionContent})`, {
          ecmaVersion: 'latest',
          sourceType: 'script'
        });
        
        console.log('✅ 函数解析成功');
      } catch (funcError) {
        console.log(`❌ 函数解析失败: ${funcError.message}`);
        
        // 检查是否有未闭合的括号
        const { openCount, closeCount } = countBrackets(functionContent);
        console.log(`函数内容包含 ${openCount} 个 ( 和 ${closeCount} 个 )`);
        console.log(`包含 ${(functionContent.match(/{/g) || []).length} 个 {`);
        console.log(`包含 ${(functionContent.match(/}/g) || []).length} 个 }`);
      }
    }
  }
  
} catch (error) {
  console.log('❌ 解析失败');
  console.log(`错误类型: ${error.constructor.name}`);
  console.log(`错误信息: ${error.message}`);
  
  if (error.stack) {
    console.log('\n=== 错误堆栈 ===');
    console.log(error.stack);
  }
}

// 辅助函数：寻找匹配的括号
function findMatchingBracket(str, start, open, close) {
  let count = 1;
  
  for (let i = start; i < str.length; i++) {
    const char = str[i];
    
    if (char === open) {
      count++;
    } else if (char === close) {
      count--;
      
      if (count === 0) {
        return i;
      }
    }
  }
  
  return -1;
}

function countBrackets(str) {
  let openCount = 0;
  let closeCount = 0;
  
  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    if (char === '(') {
      openCount++;
    } else if (char === ')') {
      closeCount++;
    }
  }
  
  return { openCount, closeCount };
}
