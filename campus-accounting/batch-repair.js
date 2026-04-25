
const fs = require('fs');
const path = 'pages/analysis/analysis.js';

let content = fs.readFileSync(path, 'utf8');

console.log('正在开始批量修复...');

// 1. 修复所有模板字面量 `text`
content = content.replace(/`([^`]*)`/g, function(match, p1) {
    // 处理 ${var} 格式的变量
    return '\'' + p1.replace(/\$\{([^}]*)\}/g, function(m, p2) {
        return '\' + ' + p2.trim() + ' + \'';
    }) + '\'';
});

console.log('✅ 模板字面量修复完成');

// 2. 修复所有 const 关键字
content = content.replace(/\bconst\b/g, 'var');
console.log('✅ const 关键字修复完成');

// 3. 修复所有箭头函数
// 修复简单的箭头函数：() => {}
content = content.replace(/\(\s*\)\s*=>\s*\{\s*([^}]*)\s*\}/g, function(match, p1) {
    return 'function() {\n' + p1.trim() + '\n}';
});

// 修复带参数的箭头函数：(a, b) => {}
content = content.replace(/\(\s*([^)]*)\s*\)\s*=>\s*\{\s*([^}]*)\s*\}/g, function(match, p1, p2) {
    return 'function(' + p1.trim() + ') {\n' + p2.trim() + '\n}';
});

// 修复箭头函数表达式：() => expr
content = content.replace(/\(\s*\)\s*=>\s*([^\n;]+)/g, function(match, p1) {
    return 'function() { return ' + p1.trim() + ' }';
});

// 修复带参数的箭头函数表达式：(a, b) => expr
content = content.replace(/\(\s*([^)]*)\s*\)\s*=>\s*([^\n;]+)/g, function(match, p1, p2) {
    return 'function(' + p1.trim() + ') { return ' + p2.trim() + ' }';
});

console.log('✅ 箭头函数修复完成');

// 4. 修复一些常见的语法问题
// 修复数组方法中的箭头函数
content = content.replace(/forEach\(\s*\(\s*([^)]*)\s*\)\s*=>\s*\{/g, 'forEach(function($1) {');
content = content.replace(/map\(\s*\(\s*([^)]*)\s*\)\s*=>\s*\{/g, 'map(function($1) {');
content = content.replace(/filter\(\s*\(\s*([^)]*)\s*\)\s*=>\s*\{/g, 'filter(function($1) {');

console.log('✅ 数组方法箭头函数修复完成');

// 保存修复后的文件
fs.writeFileSync(path, content, 'utf8');
console.log('✅ 文件已保存');

console.log('\n修复完成！');
console.log('现在让我们检查修复后的语法是否正确...');

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
