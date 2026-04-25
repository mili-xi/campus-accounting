const fs = require('fs');
const acorn = require('acorn');
const path = require('path');

const analysisFile = path.join(__dirname, 'pages', 'analysis', 'analysis.js');
const content = fs.readFileSync(analysisFile, 'utf8');

console.log('=== 使用 acorn 解析器验证分析文件语法 ===');

try {
    // 解析文件
    const ast = acorn.parse(content, {
        ecmaVersion: 'latest',
        sourceType: 'script'
    });
    
    console.log('✅ 文件解析成功');
    console.log(`包含 ${ast.body.length} 个声明`);
    
    // 查找 drawCharts 函数
    const drawCharts = ast.body.find(node => 
        node.type === 'ExpressionStatement' && 
        node.expression.type === 'CallExpression' && 
        node.expression.callee.type === 'Identifier' && 
        node.expression.callee.name === 'Page' &&
        node.expression.arguments.length === 1 &&
        node.expression.arguments[0].type === 'ObjectExpression' &&
        node.expression.arguments[0].properties.some(prop => 
            prop.type === 'ObjectProperty' &&
            prop.key.type === 'Identifier' &&
            prop.key.name === 'drawCharts'
        )
    );
    
    if (drawCharts) {
        console.log('✅ drawCharts 函数解析成功');
        
        const drawChartsProp = drawCharts.expression.arguments[0].properties.find(prop => 
            prop.type === 'ObjectProperty' &&
            prop.key.type === 'Identifier' &&
            prop.key.name === 'drawCharts'
        );
        
        if (drawChartsProp && drawChartsProp.value.type === 'FunctionExpression') {
            console.log(`drawCharts 函数有 ${drawChartsProp.value.params.length} 个参数`);
        }
    }
    
} catch (error) {
    console.log('❌ 文件解析失败');
    console.log(`错误类型: ${error.constructor.name}`);
    console.log(`错误信息: ${error.message}`);
    
    if (error.loc) {
        console.log(`错误位置: ${error.loc.line}:${error.loc.column}`);
        
        // 显示错误位置的上下文
        const lines = content.split('\n');
        const errorLine = error.loc.line;
        const startLine = Math.max(1, errorLine - 5);
        const endLine = Math.min(lines.length, errorLine + 5);
        
        console.log('=== 上下文 ===');
        for (let i = startLine; i <= endLine; i++) {
            const prefix = i === errorLine ? '👉' : '  ';
            console.log(`${prefix}${i}: ${lines[i-1]}`);
        }
    }
}
