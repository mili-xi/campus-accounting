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
  console.log(`提取到 Page 内部内容，长度: ${pageContent.length} 字符`);
  
  // 尝试解析提取的内容
  const parsed = acorn.parse(`const pageData = ${pageContent}`, {
    ecmaVersion: 'latest',
    sourceType: 'script'
  });
  
  console.log('✅ Page 内部内容解析成功');
  console.log(`包含 ${parsed.body.length} 个声明`);
  
} catch (error) {
  console.log('❌ 解析失败');
  console.log(`错误类型: ${error.constructor.name}`);
  console.log(`错误信息: ${error.message}`);
  
  if (error.loc) {
    console.log(`错误位置: 第 ${error.loc.line} 行，第 ${error.loc.column + 1} 列`);
    
    // 显示错误位置的上下文
    const lines = content.split('\n');
    const errorLine = error.loc.line;
    const startLine = Math.max(1, errorLine - 5);
    const endLine = Math.min(lines.length, errorLine + 5);
    
    console.log('\n=== 上下文 ===');
    for (let i = startLine; i <= endLine; i++) {
      const prefix = i === errorLine ? '👉' : '  ';
      const line = lines[i - 1] || '';
      console.log(`${prefix}${i}: ${line}`);
    }
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
