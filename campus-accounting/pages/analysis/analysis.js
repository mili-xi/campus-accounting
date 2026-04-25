const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    currentDate: '2026年4月',
    totalIncome: 5000,
    totalExpense: 3874,
    balance: 1126,
    expenseRatio: 77.48,
    monthlyBudget: 4000,
    usedBudget: 3874,
    remainingBudget: 126,
    budgetProgress: 96.85,
    expenseCategories: [
      { name: '餐饮', percentage: '25.1%', amount: '¥1,250', color: '#FF8C69' },
      { name: '购物', percentage: '18.6%', amount: '¥925', color: '#4ECDC4' },
      { name: '交通', percentage: '12.3%', amount: '¥610', color: '#45B7D1' },
      { name: '娱乐', percentage: '10.8%', amount: '¥538', color: '#FFA07A' },
      { name: '学习', percentage: '8.7%', amount: '¥433', color: '#9B59B6' },
      { name: '其他', percentage: '24.5%', amount: '¥1,218', color: '#3498DB' }
    ],
    incomeCategories: [
      { name: '生活费', percentage: '70.0%', amount: '¥3,500', color: '#4CAF50' },
      { name: '兼职', percentage: '20.0%', amount: '¥1,000', color: '#8BC34A' },
      { name: '奖学金', percentage: '5.0%', amount: '¥250', color: '#CDDC39' },
      { name: '其他', percentage: '5.0%', amount: '¥250', color: '#FFC107' }
    ],
    consumptionSuggestions: [
      '餐饮支出占比较高，建议控制在外用餐频率，多自己做饭',
      '购物支出较大，建议制定购物清单，避免冲动消费',
      '交通支出合理，可继续保持当前出行方式',
      '娱乐支出偏高，建议减少不必要的娱乐消费'
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 绘制图表
    this.drawExpenseChart()
    this.drawIncomeChart()
    this.drawTrendChart()
  },

  /**
   * 绘制支出图表
   */
  drawExpenseChart: function() {
    const query = wx.createSelectorQuery()
    query.select('#expenseChart').fields({
      node: true,
      size: true
    }).exec((res) => {
      if (!res || !res[0]) return

      const canvas = res[0].node
      const ctx = canvas.getContext('2d')
      const dpr = wx.getSystemInfoSync().pixelRatio

      canvas.width = res[0].width * dpr
      canvas.height = res[0].height * dpr
      ctx.scale(dpr, dpr)

      // 绘制半圆形环状图
      this.drawDonut(ctx, res[0].width, res[0].height, this.data.expenseCategories)
    })
  },

  /**
   * 绘制收入图表
   */
  drawIncomeChart: function() {
    const query = wx.createSelectorQuery()
    query.select('#incomeChart').fields({
      node: true,
      size: true
    }).exec((res) => {
      if (!res || !res[0]) return

      const canvas = res[0].node
      const ctx = canvas.getContext('2d')
      const dpr = wx.getSystemInfoSync().pixelRatio

      canvas.width = res[0].width * dpr
      canvas.height = res[0].height * dpr
      ctx.scale(dpr, dpr)

      // 绘制半圆形环状图
      this.drawDonut(ctx, res[0].width, res[0].height, this.data.incomeCategories)
    })
  },

  /**
   * 绘制趋势图表
   */
  drawTrendChart: function() {
    // 这里可以添加趋势图表的绘制逻辑
    // 比如使用Canvas绘制折线图或柱状图
  },

  /**
   * 计算日均消费和日均收入
   */
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

  /**
   * 构建时间查询
   */
  buildTimeQuery: function() {
    const now = new Date()
    const startDate = new Date(now.getFullYear(), now.getMonth(), 1)
    const endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0)

    return {
      startDate: startDate.toISOString().split('T')[0],
      endDate: endDate.toISOString().split('T')[0]
    }
  },

  /**
   * 绘制半圆形环状图
   */
  drawDonut: function(ctx, width, height, categories) {
    const centerX = width / 2
    const centerY = height / 2
    const radius = Math.min(width, height) / 3
    const strokeWidth = 50

    const total = categories.reduce((sum, category) => sum + parseFloat(category.percentage), 0)
    
    let startAngle = -Math.PI / 2 // 从顶部开始

    categories.forEach(category => {
      const percentage = parseFloat(category.percentage) / total
      const endAngle = startAngle + percentage * Math.PI // 绘制半圆形

      ctx.beginPath()
      ctx.arc(centerX, centerY, radius, startAngle, endAngle)
      ctx.lineWidth = strokeWidth
      ctx.strokeStyle = category.color
      ctx.stroke()

      // 绘制放射状引出线和标签
      this.drawLabel(ctx, centerX, centerY, radius, startAngle, endAngle, category)

      startAngle = endAngle
    })
  },

  /**
   * 绘制放射状引出线和标签
   */
  drawLabel: function(ctx, centerX, centerY, radius, startAngle, endAngle, category) {
    const angle = (startAngle + endAngle) / 2
    const labelRadius = radius + 70

    // 计算标签位置
    const labelX = centerX + Math.cos(angle) * labelRadius
    const labelY = centerY + Math.sin(angle) * labelRadius

    // 绘制引出线
    ctx.beginPath()
    ctx.moveTo(centerX + Math.cos(angle) * radius, centerY + Math.sin(angle) * radius)
    ctx.lineTo(labelX, labelY)
    ctx.strokeStyle = category.color
    ctx.lineWidth = 2
    ctx.stroke()

    // 绘制标签
    ctx.fillStyle = category.color
    ctx.font = '12px Arial'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(category.name + ' ' + category.percentage, labelX, labelY)
  },

  /**
   * 导出PDF
   */
  exportPDF: function() {
    wx.showToast({
      title: '导出PDF功能开发中',
      icon: 'none'
    })
  },

  /**
   * 导出Excel
   */
  exportExcel: function() {
    wx.showToast({
      title: '导出Excel功能开发中',
      icon: 'none'
    })
  },

  /**
   * 导出图片
   */
  exportImage: function() {
    wx.showToast({
      title: '导出图片功能开发中',
      icon: 'none'
    })
  }
})
