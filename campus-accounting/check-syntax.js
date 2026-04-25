
const fs = require('fs');
const content = fs.readFileSync('pages/analysis/analysis.js', 'utf8');

// 查找所有箭头函数
const arrowFunctions = content.match(/\([^)]*\)\s*=>/g);
if (arrowFunctions) {
    console.log('找到箭头函数:', arrowFunctions.length, '个');
    arrowFunctions.forEach((match, index) => {
        console.log(`第 ${index+1} 个: ${match}`);
    });
} else {
    console.log('未找到箭头函数');
}

// 查找所有模板字面量
const templateLiterals = content.match(/`[^`]*`/g);
if (templateLiterals) {
    console.log('找到模板字面量:', templateLiterals.length, '个');
    templateLiterals.forEach((match, index) => {
        console.log(`第 ${index+1} 个: ${match}`);
    });
} else {
    console.log('未找到模板字面量');
}

// 查找所有 const 关键字
const constKeywords = content.match(/\bconst\b/g);
if (constKeywords) {
    console.log('找到 const 关键字:', constKeywords.length, '个');
} else {
    console.log('未找到 const 关键字');
}
