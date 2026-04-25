const fs = require('fs');
const path = require('path');

const projectDir = path.resolve(__dirname);

// 要检查的文件扩展名
const targetExtensions = ['.js'];

// 遍历目录并检查 JavaScript 文件语法
function checkFiles(dir) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      // 跳过 node_modules 和 .git 目录
      if (file === 'node_modules' || file === '.git') {
        return;
      }
      checkFiles(filePath);
    } else if (stat.isFile()) {
      // 检查文件类型
      const ext = path.extname(file).toLowerCase();
      if (targetExtensions.includes(ext)) {
        try {
          checkSyntax(filePath);
        } catch (error) {
          console.error(`检查文件失败: ${filePath}`, error);
        }
      }
    }
  });
}

// 检查单个 JavaScript 文件的语法
function checkSyntax(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  
  try {
    // 尝试解析 JavaScript 代码
    new Function(content);
    console.log(`✅ ${filePath} - 语法正确`);
  } catch (error) {
    console.error(`❌ ${filePath} - 语法错误: ${error.message}`);
  }
}

// 执行语法检查
console.log('开始检查项目中的 JavaScript 文件语法...');
checkFiles(projectDir);
console.log('检查完成！');
