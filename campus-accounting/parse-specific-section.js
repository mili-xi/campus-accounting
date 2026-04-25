const fs = require('fs');
const vm = require('vm');
const path = require('path');

const analysisFile = path.join(__dirname, 'pages', 'analysis', 'analysis.js');
const content = fs.readFileSync(analysisFile, 'utf8');

console.log('=== 开始解析 analysis.js 文件 ===');

// 定义安全的上下文
const sandbox = {
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
};

// 尝试运行部分代码
const sectionsToTest = [
  { name: '页面初始化', start: 0, end: 50 },
  { name: '数据定义', start: 5, end: 40 },
  { name: 'onLoad', start: 40, end: 60 },
  { name: 'onShow', start: 60, end: 80 },
  { name: 'buildTimeQuery', start: 550, end: 620 }
];

sectionsToTest.forEach(({ name, start, end }) => {
  console.log(`\n=== 测试 "${name}" (第 ${start}-${end} 行) ===`);
  try {
    const lines = content.split('\n');
    const code = lines.slice(start, end).join('\n');
    vm.createContext(sandbox);
    vm.runInContext(code, sandbox, { filename: 'analysis.js', timeout: 1000 });
    console.log('✅ 代码片段解析成功');
  } catch (error) {
    console.log('❌ 代码片段解析失败');
    console.log('错误信息:', error.message);
    if (error instanceof SyntaxError) {
      console.log('错误位置:', error.stack.split('\n')[0]);
    }
  }
});

console.log('\n=== 测试完成 ===');
