const fs = require('fs');
const vm = require('vm');
const path = require('path');

const analysisFile = path.join(__dirname, 'pages', 'analysis', 'analysis.js');
const content = fs.readFileSync(analysisFile, 'utf8');

console.log('=== 尝试编译 analysis.js 文件 ===');

try {
  // 创建一个最小化的上下文
  const context = vm.createContext({
    require: require,
    module: { exports: {} },
    exports: {},
    global: {}
  });
  
  // 尝试编译代码
  const script = new vm.Script(content);
  console.log('✅ 代码编译成功');
  
  // 虽然我们不能直接运行它，但至少我们知道它语法上是正确的
  
} catch (error) {
  console.log('❌ 编译失败');
  console.log('错误信息:', error.message);
  if (error instanceof SyntaxError) {
    console.log('错误位置:', error.stack.split('\n')[1]);
  }
}

console.log('=== 编译尝试完成 ===');
