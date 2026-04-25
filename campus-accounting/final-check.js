
const fs = require('fs');
const vm = require('vm');
const path = 'pages/analysis/analysis.js';

try {
    const content = fs.readFileSync(path, 'utf8');
    const sandbox = {
        Page: function() {},
        getApp: function() {},
        wx: {}
    };
    
    vm.createContext(sandbox);
    vm.runInContext(content, sandbox);
    
    console.log('✅ 文件语法检查成功');
    
    // 检查是否还有任何可能不支持的语法
    const remainingIssues = [];
    
    // 检查箭头函数
    const arrowFunctions = content.match(/\([^)]*\)\s*=>/g);
    if (arrowFunctions) {
        remainingIssues.push(`发现 ${arrowFunctions.length} 个箭头函数`);
    }
    
    // 检查模板字面量
    const templateLiterals = content.match(/`[^`]*`/g);
    if (templateLiterals) {
        remainingIssues.push(`发现 ${templateLiterals.length} 个模板字面量`);
    }
    
    // 检查 const 关键字
    const constKeywords = content.match(/\bconst\b/g);
    if (constKeywords) {
        remainingIssues.push(`发现 ${constKeywords.length} 个 const 关键字`);
    }
    
    if (remainingIssues.length > 0) {
        console.log('⚠️  警告:');
        remainingIssues.forEach(issue => {
            console.log(`  - ${issue}`);
        });
    } else {
        console.log('✅ 所有不支持的语法已修复');
    }
    
} catch (error) {
    console.log('❌ 语法错误:', error);
}
