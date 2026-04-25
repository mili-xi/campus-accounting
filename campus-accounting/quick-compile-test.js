const fs = require('fs');
const path = require('path');

const analysisFile = path.join(__dirname, 'pages', 'analysis', 'analysis.js');
const content = fs.readFileSync(analysisFile, 'utf8');

console.log('=== 正在检查 calculateDailyAverage 函数 ===');

// 查找 calculateDailyAverage 函数
const calculateDailyAveragePattern = /calculateDailyAverage.*?\{([^}]*)\}/s;
const match = calculateDailyAveragePattern.exec(content);

if (match) {
  const functionBody = match[1];
  
  // 检查是否还有未修复的 const 声明
  const constDeclarations = (functionBody.match(/\bconst\b/g) || []).length;
  const varDeclarations = (functionBody.match(/\bvar\b/g) || []).length;
  
  console.log(`函数内部包含 ${constDeclarations} 个 const 声明`);
  console.log(`函数内部包含 ${varDeclarations} 个 var 声明`);
  
  if (constDeclarations === 0) {
    console.log('✅ calculateDailyAverage 函数修复成功');
  } else {
    console.log('❌ 函数内部仍有未修复的 const 声明');
    console.log('需要修复的声明:');
    functionBody.split('\n').forEach((line, index) => {
      if (line.includes('const')) {
        console.log(`第 ${index + 1} 行: ${line}`);
      }
    });
  }
} else {
  console.log('❌ 未找到 calculateDailyAverage 函数');
}
