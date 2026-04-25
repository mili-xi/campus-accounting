const fs = require('fs');
const path = require('path');

const searchDirectory = path.join(__dirname, 'pages');
console.log('=== 正在搜索并修复项目中的 const 声明 ===');
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

// 修复函数内部的 const 声明
function fixFile(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        
        // 查找函数内部的 const 声明并替换为 var
        const functionPattern = /(function\s*\w*\s*\(\s*\)\s*\{)([^}]*)/g;
        
        content = content.replace(functionPattern, (match, prefix, body) => {
            // 只替换函数内部的 const 声明
            const fixedBody = body.replace(/(?:^|\W)const(\s+\w+\s*=)/g, ' var$1');
            return prefix + fixedBody;
        });
        
        // 查找 arrow function 内部的 const 声明
        const arrowFunctionPattern = /=>\s*\{([^}]*)\}/g;
        content = content.replace(arrowFunctionPattern, (match, body) => {
            const fixedBody = body.replace(/(?:^|\W)const(\s+\w+\s*=)/g, ' var$1');
            return `=> {${fixedBody}}`;
        });
        
        // 查找 Promise 内部的 const 声明
        const promisePattern = /Promise\s*\((.*?)\)/g;
        content = content.replace(promisePattern, (match, body) => {
            const fixedBody = body.replace(/(?:^|\W)const(\s+\w+\s*=)/g, ' var$1');
            return `Promise(${fixedBody})`;
        });
        
        fs.writeFileSync(filePath, content);
        console.log(`✅ 已修复: ${filePath}`);
    } catch (error) {
        console.error(`❌ 修复失败: ${filePath}`);
        console.error(`   错误: ${error.message}`);
    }
}

// 开始搜索和修复
searchFiles(searchDirectory, fixFile);

console.log('\n=== 修复完成 ===');
