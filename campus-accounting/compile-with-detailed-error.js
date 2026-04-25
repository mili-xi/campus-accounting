const fs = require('fs');
const vm = require('vm');
const path = require('path');

const analysisFile = path.join(__dirname, 'pages', 'analysis', 'analysis.js');
const content = fs.readFileSync(analysisFile, 'utf8');

console.log('=== 尝试编译 analysis.js 文件 ===');

try {
  // 创建一个最小化的上下文
  const context = vm.createContext({
    getApp: () => ({
      formatDate: () => '',
      getRecordsInTimeRange: () => []
    }),
    Page: function() {},
    wx: {
      getSystemInfoSync: () => ({
        screenWidth: 375,
        screenHeight: 667,
        pixelRatio: 2
      }),
      createCanvasContext: () => ({
        setStrokeStyle: () => {},
        setFillStyle: () => {},
        setLineWidth: () => {},
        beginPath: () => {},
        moveTo: () => {},
        lineTo: () => {},
        stroke: () => {},
        fill: () => {},
        draw: () => {},
        arc: () => {},
        setFontSize: () => {},
        setTextAlign: () => {},
        fillText: () => {},
        fillRect: () => {}
      }),
      createSelectorQuery: () => ({
        select: () => ({
          boundingClientRect: () => ({})
        }),
        exec: (cb) => {
          cb([{ width: 300, height: 200 }]);
        }
      })
    },
    console: console
  });
  
  // 尝试编译整个文件
  const script = new vm.Script(content);
  console.log('✅ 代码编译成功');
  
  // 虽然我们不能直接运行它，但至少我们知道它语法上是正确的
  
} catch (error) {
  console.log('❌ 编译失败');
  console.log('错误类型:', error.constructor.name);
  console.log('错误信息:', error);
  console.log('完整堆栈:');
  console.log(error.stack);
  
  if (error instanceof SyntaxError) {
    console.log('错误位置:');
    if (error.stack) {
      const stackLines = error.stack.split('\n');
      for (let i = 0; i < Math.min(10, stackLines.length); i++) {
        console.log('  ' + stackLines[i]);
      }
    }
    
    // 尝试查找错误位置附近的上下文
    if (typeof error.lineNumber === 'number') {
      const lines = content.split('\n');
      const startLine = Math.max(1, error.lineNumber - 5);
      const endLine = Math.min(lines.length, error.lineNumber + 5);
      
      console.log(`\n第 ${error.lineNumber} 行周围的代码:`);
      for (let i = startLine; i <= endLine; i++) {
        const prefix = i === error.lineNumber ? '👉' : '  ';
        const line = lines[i - 1] || '';
        console.log(`${prefix}${i}: ${line}`);
      }
    }
  }
}

console.log('=== 编译尝试完成 ===');
