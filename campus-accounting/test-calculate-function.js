const fs = require('fs');
const acorn = require('acorn');

const functionCode = `
  calculateDailyAverage: function () {
    const now = new Date()
    const query = this.buildTimeQuery()
    const startDate = new Date(query.startDate)
    
    // 计算天数
    const diffTime = Math.abs(now - startDate)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1
    
    const averageDailyExpense = this.data.totalExpense / diffDays
    const averageDailyIncome = this.data.totalIncome / diffDays
    
    // 计算收支比和样式
    var expenseRatio = 0
    var ratioClass = 'amount-expense'
    
    if (this.data.totalIncome > 0) {
      expenseRatio = this.data.totalExpense / this.data.totalIncome
      if (expenseRatio < 0.8) {
        ratioClass = 'amount-income'
      } else if (expenseRatio < 1) {
        ratioClass = 'amount-warning'
      }
    }
    
    const expenseRatioPercentage = this.data.totalIncome > 0 ? (expenseRatio * 100).toFixed(1) : '0'
    
    this.setData({
      averageDailyExpense: averageDailyExpense.toFixed(2),
      averageDailyIncome: averageDailyIncome.toFixed(2),
      expenseRatioPercentage: expenseRatioPercentage,
      ratioClass: ratioClass
    })
  },
`;

console.log('=== 尝试解析 calculateDailyAverage 函数 ===');

try {
  const parsed = acorn.parse(`({${functionCode}})`, {
    ecmaVersion: 'latest',
    sourceType: 'script'
  });
  
  console.log('✅ 函数解析成功');
  
} catch (error) {
  console.log('❌ 函数解析失败');
  console.log(`错误类型: ${error.constructor.name}`);
  console.log(`错误信息: ${error.message}`);
  
  if (error.loc) {
    console.log(`错误位置: 第 ${error.loc.line} 行，第 ${error.loc.column + 1} 列`);
  }
  
  console.log('\n=== 错误堆栈 ===');
  console.log(error.stack);
}
