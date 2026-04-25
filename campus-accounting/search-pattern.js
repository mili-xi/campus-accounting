const fs = require('fs');
const path = require('path');

const analysisFile = path.join(__dirname, 'pages', 'analysis', 'analysis.js');
const content = fs.readFileSync(analysisFile, 'utf8');

// 搜索可能导致问题的模式
const patternsToSearch = [
  /\]\)\.then/g,           // 搜索可能有问题的 Promise 链式调用
  /,\s*\]/g,                // 搜索可能有问题的数组末尾逗号
  /,\s*}/g,                // 搜索可能有问题的对象末尾逗号
  /\(\s*\)/g,              // 搜索可能有问题的空函数
];

console.log('=== 在 analysis.js 中搜索可能的语法问题 ===');

patternsToSearch.forEach((pattern, index) => {
  console.log(`\n--- 模式 ${index + 1}: ${pattern} ---`);
  let match;
  let offset = 0;
  
  while ((match = pattern.exec(content.slice(offset))) !== null) {
    const lineNumber = getLineNumber(content, offset + match.index);
    console.log(`在第 ${lineNumber} 行找到匹配:`, match[0]);
    
    // 显示周围的上下文
    showSurroundingContext(content, offset + match.index);
    offset += match.index + 1;
  }
});

function getLineNumber(content, position) {
  return content.slice(0, position).split('\n').length;
}

function showSurroundingContext(content, position) {
  // 显示匹配位置的上下文（前 100 个字符到后 100 个字符）
  const start = Math.max(0, position - 50);
  const end = Math.min(content.length, position + 100);
  const context = content.slice(start, end);
  
  // 高亮匹配位置
  const highlight = ' '.repeat(position - start) + '^'.repeat(10);
  
  console.log('上下文:');
  console.log(context);
  console.log(highlight);
}

console.log('\n=== 搜索完成 ===');
