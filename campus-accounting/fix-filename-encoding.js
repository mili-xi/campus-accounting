const fs = require('fs');
const path = require('path');

const projectDir = path.resolve(__dirname);

// 已知的乱码文件名和对应的正确文件名
const filenameFixes = {
  '����˵��.md': '测试说明.md',
  '����ָ��.md': '调试指南.md',
  '��Ŀ˵��.md': '项目说明.md'
};

// 修复文件名乱码
function fixFilenames(dir) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      fixFilenames(filePath);
    } else {
      // 检查文件名是否需要修复
      if (filenameFixes[file]) {
        const newPath = path.join(dir, filenameFixes[file]);
        fs.renameSync(filePath, newPath);
        console.log(`已修复文件名: ${file} -> ${filenameFixes[file]}`);
      }
    }
  });
}

// 执行文件名修复
console.log('开始修复文件名乱码问题...');
fixFilenames(projectDir);
console.log('文件名修复完成！');
