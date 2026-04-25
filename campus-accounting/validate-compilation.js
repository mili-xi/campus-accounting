const fs = require('fs');
const acorn = require('acorn');
const path = require('path');

console.log('=== 正在验证项目代码语法 ===');

// 要检查的目录
const directories = [
  'pages',
  'utils'
];

let allFilesValid = true;

directories.forEach(dir => {
  const dirPath = path.join(__dirname, dir);
  if (!fs.existsSync(dirPath)) {
    console.log(`目录 ${dir} 不存在，跳过`);
    return;
  }

  const files = fs.readdirSync(dirPath);
  files.forEach(file => {
    if (file.endsWith('.js')) {
      const filePath = path.join(dirPath, file);
      try {
        const content = fs.readFileSync(filePath, 'utf8');
        
        // 检查是否包含 Page({}) 语法
        if (content.includes('Page({')) {
          // 尝试解析 Page 内部内容
          const pageStart = content.indexOf('Page({') + 6;
          const pageEnd = findMatchingBracket(content, pageStart, '{', '}');
          
          if (pageEnd !== -1) {
            const pageContent = '{' + content.slice(pageStart, pageEnd) + '}';
            acorn.parse(pageContent, {
              ecmaVersion: 'latest',
              sourceType: 'script'
            });
          }
        } else {
          // 直接解析文件内容
          acorn.parse(content, {
            ecmaVersion: 'latest',
            sourceType: 'script'
          });
        }
        
        console.log(`✅ ${filePath}`);
      } catch (error) {
        console.log(`❌ ${filePath}`);
        console.log(`   错误: ${error.message}`);
        if (error.loc) {
          console.log(`   位置: ${error.loc.line}:${error.loc.column + 1}`);
        }
        allFilesValid = false;
      }
    }
  });
});

if (allFilesValid) {
  console.log('=== 所有 JavaScript 文件语法验证通过 ===');
} else {
  console.log('=== 部分 JavaScript 文件语法验证失败 ===');
  process.exit(1);
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
