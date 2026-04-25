const fs = require('fs');
const path = require('path');

const analysisFile = path.join(__dirname, 'pages', 'analysis', 'analysis.js');
const content = fs.readFileSync(analysisFile, 'utf8');

console.log('=== 文件大小 ===');
console.log(content.length, '字符');

// 查找所有可能的函数和数据结构分隔符
console.log('\n=== 尝试逐段解析 ===');

const sections = [
  { name: 'data 属性', start: 'data:', end: '},' },
  { name: 'onLoad 函数', start: 'onLoad:', end: '},' },
  { name: 'onShow 函数', start: 'onShow:', end: '},' },
  { name: 'drawCharts 函数', start: 'drawCharts:', end: '},' },
  { name: 'drawPieChart 函数', start: 'drawPieChart:', end: '},' },
  { name: 'drawLineChart 函数', start: 'drawLineChart:', end: '},' },
  { name: 'buildTimeQuery 函数', start: 'buildTimeQuery:', end: '},' }
];

sections.forEach(({ name, start, end }) => {
  const startIdx = content.indexOf(start);
  if (startIdx !== -1) {
    // 找到函数结束的位置
    let endIdx = content.indexOf(end, startIdx);
    if (endIdx === -1) {
      endIdx = content.indexOf('},', startIdx + start.length);
    }
    
    if (endIdx !== -1) {
      const sectionContent = content.slice(startIdx, endIdx + 2);
      
      console.log(`\n--- ${name} ---`);
      
      try {
        // 尝试在上下文中解析这个部分
        const wrapper = `({ ${sectionContent} })`;
        const parsed = eval(wrapper); // 只用于调试目的，不推荐在生产中使用
        console.log('✅ 解析成功');
      } catch (error) {
        console.log('❌ 解析失败');
        console.log('错误信息:', error);
        
        if (error instanceof SyntaxError) {
          // 显示该部分内容
          console.log('内容:');
          console.log(sectionContent.slice(0, 200));
        }
      }
    }
  }
});

console.log('\n=== 解析完成 ===');
