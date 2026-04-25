
const fs = require('fs');
const path = 'pages/analysis/analysis.js';
let content = fs.readFileSync(path, 'utf8');

// 修复 sort 方法的语法错误
content = content.replace(/sortfunction\(\(/g, 'sort(function(');

fs.writeFileSync(path, content, 'utf8');
console.log('✅ sort 方法语法错误修复完成');

// 检查语法
try {
    const vm = require('vm');
    const sandbox = {
        Page: function() {},
        getApp: function() {},
        wx: {}
    };
    
    vm.createContext(sandbox);
    vm.runInContext(content, sandbox);
    
    console.log('✅ 语法检查通过');
} catch (error) {
    console.log('❌ 语法错误:', error);
}
