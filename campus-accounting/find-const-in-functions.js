const fs = require('fs');
const path = require('path');

const searchDirectory = path.join(__dirname, 'pages');
console.log('=== 正在搜索项目中的 JavaScript 文件 ===');
console.log(`搜索目录: ${searchDirectory}`);

// 递归搜索目录
function searchFiles(dir, callback) {
    fs.readdirSync(dir).forEach(file => {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
            searchFiles(fullPath, callback);
        } else if (file.endsWith('.js')) {
            callback(fullPath);
        }
    });
}

let hasError = false;

searchFiles(searchDirectory, (filePath) => {
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        
        // 查找函数内部使用 const 的模式
        const functionPattern = /function\s*\w*\s*\(\s*\)\s*\{[^}]*?const/mg;
        const matches = content.match(functionPattern);
        
        if (matches) {
            console.log(`\n🔍 ${filePath}`);
            matches.forEach(match => {
                console.log(`   - 包含 const 声明的函数: ${match.slice(0, 50)}...`);
                hasError = true;
            });
        }
    } catch (error) {
        console.error(`\n❌ 读取文件失败: ${filePath}`);
        console.error(`   错误: ${error.message}`);
    }
});

if (hasError) {
    console.log('\n=== 搜索完成，已找到包含 const 声明的函数 ===');
} else {
    console.log('\n=== 搜索完成，未找到包含 const 声明的函数 ===');
}
