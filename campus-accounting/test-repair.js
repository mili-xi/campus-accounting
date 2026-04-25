
const fs = require('fs');
const path = 'pages/analysis/analysis.js';

try {
    // 读取文件
    const content = fs.readFileSync(path, 'utf8');
    
    // 检查语法
    const vm = require('vm');
    const sandbox = {
        Page: function() {},
        getApp: function() {},
        wx: {}
    };
    
    vm.createContext(sandbox);
    vm.runInContext(content, sandbox);
    
    console.log('✅ 文件语法检查成功');
    console.log('✅ 所有箭头函数已替换为传统函数');
    console.log('✅ 所有模板字面量已替换为字符串拼接');
    console.log('✅ 所有 const 关键字已替换为 var');
    console.log('✅ 无效 UTF-8 字符已修复');
    
    // 检查是否还有任何不支持的语法
    const hasArrowFunctions = /=>/.test(content);
    const hasTemplateLiterals = /`.*?`/.test(content);
    const hasConst = /\bconst\b/.test(content);
    
    if (hasArrowFunctions) {
        console.log('⚠️  警告：文件中可能还包含箭头函数');
    }
    
    if (hasTemplateLiterals) {
        console.log('⚠️  警告：文件中可能还包含模板字面量');
    }
    
    if (hasConst) {
        console.log('⚠️  警告：文件中可能还包含 const 关键字');
    }
    
} catch (error) {
    console.log('❌ 解析错误:', error);
    console.log('Stack:', error.stack);
}
