const fs = require('fs');
const acorn = require('acorn');
const path = require('path');

const analysisFile = path.join(__dirname, 'pages', 'analysis', 'analysis.js');
const content = fs.readFileSync(analysisFile, 'utf8');

console.log('=== 使用 acorn 解析器分析文件语法 ===');

try {
  const ast = acorn.parse(content, {
    ecmaVersion: 'latest',
    sourceType: 'module'
  });
  console.log('✅ 文件语法解析成功');
  console.log(`AST 包含 ${ast.body.length} 个声明`);
} catch (error) {
  console.log('❌ 文件语法解析失败');
  console.log(`错误类型: ${error.constructor.name}`);
  console.log(`错误信息: ${error.message}`);
  console.log(`错误位置: 第 ${error.loc.line} 行，第 ${error.loc.column + 1} 列`);
  
  // 显示错误位置的上下文
  const lines = content.split('\n');
  const errorLine = error.loc.line;
  const startLine = Math.max(1, errorLine - 5);
  const endLine = Math.min(lines.length, errorLine + 5);
  
  console.log('\n=== 错误位置的上下文 ===');
  for (let i = startLine; i <= endLine; i++) {
    const prefix = i === errorLine ? '👉' : '  ';
    const line = lines[i - 1] || '';
    console.log(`${prefix}${i}: ${line}`);
  }
}
