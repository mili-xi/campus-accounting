const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const projectDir = path.resolve(__dirname);

// 获取文件内容的哈希值
function getFileHash(filePath) {
  const content = fs.readFileSync(filePath);
  return crypto.createHash('md5').update(content).digest('hex');
}

// 重命名文件
function renameFile(oldPath, newPath) {
  try {
    fs.renameSync(oldPath, newPath);
    console.log(`重命名成功: ${oldPath} -> ${newPath}`);
    return true;
  } catch (error) {
    console.error(`重命名失败: ${error}`);
    return false;
  }
}

// 处理文件名
console.log('开始处理乱码文件名...');

// 列出所有 .md 文件
const mdFiles = fs.readdirSync(projectDir).filter(file => file.endsWith('.md'));
console.log('找到 .md 文件:', mdFiles);

// 尝试识别并修复文件名
const foundFiles = [];

mdFiles.forEach(file => {
  const fullPath = path.join(projectDir, file);
  const hash = getFileHash(fullPath);
  console.log(`文件 ${file} 的哈希值: ${hash}`);
  
  // 根据文件内容判断文件名
  const content = fs.readFileSync(fullPath, 'utf8');
  
  // 判断是否为项目说明.md
  if (content.includes('校园记录账小程序') || content.includes('项目概述')) {
    foundFiles.push({ file, expected: '项目说明.md', hash });
  } 
  // 判断是否为调试指南.md
  else if (content.includes('调试') || content.includes('错误')) {
    foundFiles.push({ file, expected: '调试指南.md', hash });
  } 
  // 判断是否为测试说明.md
  else if (content.includes('测试') || content.includes('功能')) {
    foundFiles.push({ file, expected: '测试说明.md', hash });
  }
});

console.log('\n识别到需要重命名的文件:', foundFiles);

// 执行重命名
foundFiles.forEach(item => {
  const oldPath = path.join(projectDir, item.file);
  const newPath = path.join(projectDir, item.expected);
  
  if (item.file !== item.expected) {
    // 检查目标文件是否已存在
    if (!fs.existsSync(newPath)) {
      renameFile(oldPath, newPath);
    } else {
      console.log(`警告: 目标文件 ${item.expected} 已存在，不进行重命名`);
    }
  }
});

console.log('\n文件名处理完成');
