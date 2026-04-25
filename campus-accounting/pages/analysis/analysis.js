const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    currentDate: '',
    totalIncome: 0,
    totalExpense: 0,
    balance: 0,
    expenseRatio: 0,
    monthlyBudget: 0,
    usedBudget: 0,
    remainingBudget: 0,
    budgetProgress: 0,
    expenseCategories: [],
    incomeCategories: [],
    trendData: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 默认选择本月
    this.selectMonth()

    // 从app.js获取数据
    this.loadData()

    // 绘制图表
    this.drawExpenseChart()
    this.drawIncomeChart()
    this.drawTrendChart()
  },

  /**
   * 选择本周
   */
  selectWeek: function() {
    const now = new Date()
    const dayOfWeek = now.getDay()
    const startDate = new Date(now)
    startDate.setDate(now.getDate() - dayOfWeek + 1) // 本周一

    const endDate = new Date(startDate)
    endDate.setDate(startDate.getDate() + 6) // 本周日

    const currentDate = `${startDate.getFullYear()}年${startDate.getMonth() + 1}月${startDate.getDate()}日 - ${endDate.getFullYear()}年${endDate.getMonth() + 1}月${endDate.getDate()}日`
    this.setData({ currentDate, startDate: this.formatDate(startDate), endDate: this.formatDate(endDate) })

    this.loadData()
    this.drawExpenseChart()
    this.drawIncomeChart()
    this.drawTrendChart()
  },

  /**
   * 选择本月
   */
  selectMonth: function() {
    const now = new Date()
    const startDate = new Date(now.getFullYear(), now.getMonth(), 1)
    const endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0)

    const currentDate = `${now.getFullYear()}年${now.getMonth() + 1}月`
    this.setData({ currentDate, startDate: this.formatDate(startDate), endDate: this.formatDate(endDate) })

    this.loadData()
    this.drawExpenseChart()
    this.drawIncomeChart()
    this.drawTrendChart()
  },

  /**
   * 选择一年
   */
  selectYear: function() {
    const now = new Date()
    const startDate = new Date(now.getFullYear(), 0, 1)
    const endDate = new Date(now.getFullYear(), 11, 31)

    const currentDate = `${now.getFullYear()}年`
    this.setData({ currentDate, startDate: this.formatDate(startDate), endDate: this.formatDate(endDate) })

    this.loadData()
    this.drawExpenseChart()
    this.drawIncomeChart()
    this.drawTrendChart()
  },

  /**
   * 格式化日期
   */
  formatDate: function(date) {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  },

  /**
   * 从app.js获取数据
   */
  loadData: function() {
    // 获取所有记录
    const allRecords = app.getAllRecords()

    // 根据日期范围过滤记录
    const filteredRecords = allRecords.filter(record => {
      return record.date >= this.data.startDate && record.date <= this.data.endDate
    })

    // 计算总收入和总支出
    const totalIncome = app.calculateTotalIncome(filteredRecords)
    const totalExpense = app.calculateTotalExpense(filteredRecords)
    const balance = totalIncome - totalExpense
    const expenseRatio = totalIncome > 0 ? (totalExpense / totalIncome * 100).toFixed(2) : 0

    // 计算预算
    const monthlyBudget = app.globalData.monthlyBudget
    const usedBudget = totalExpense
    const remainingBudget = monthlyBudget - usedBudget
    const budgetProgress = monthlyBudget > 0 ? (usedBudget / monthlyBudget * 100).toFixed(2) : 0

    // 计算支出分类
    const expenseCategories = this.calculateExpenseCategories(filteredRecords)
    const incomeCategories = this.calculateIncomeCategories(filteredRecords)

    // 计算消费趋势
    const trendData = this.calculateTrendData(filteredRecords)

    // 更新数据
    this.setData({
      totalIncome,
      totalExpense,
      balance,
      expenseRatio,
      monthlyBudget,
      usedBudget,
      remainingBudget,
      budgetProgress,
      expenseCategories,
      incomeCategories,
      trendData
    })
  },

  /**
   * 计算支出分类
   */
  calculateExpenseCategories: function(records) {
    const expenseRecords = records.filter(record => record.type === 'expense')
    const categories = app.globalData.categories.expense
    const colors = ['#FF8C69', '#4ECDC4', '#45B7D1', '#FFA07A', '#9B59B6', '#3498DB', '#FFC107', '#8BC34A', '#CDDC39', '#E91E63', '#607D8B', '#795548']

    const categoryData = categories.map((category, index) => {
      const total = expenseRecords.filter(record => record.category === category).reduce((sum, record) => sum + record.amount, 0)
      return {
        name: category,
        amount: total,
        color: colors[index % colors.length]
      }
    }).filter(category => category.amount > 0)

    // 计算百分比
    const totalExpense = categoryData.reduce((sum, category) => sum + category.amount, 0)
    categoryData.forEach(category => {
      category.percentage = totalExpense > 0 ? (category.amount / totalExpense * 100).toFixed(1) + '%' : '0%'
    })

    return categoryData
  },

  /**
   * 计算收入分类
   */
  calculateIncomeCategories: function(records) {
    const incomeRecords = records.filter(record => record.type === 'income')
    const categories = app.globalData.categories.income
    const colors = ['#4CAF50', '#8BC34A', '#CDDC39', '#FFC107', '#FF9800', '#FF5722']

    const categoryData = categories.map((category, index) => {
      const total = incomeRecords.filter(record => record.category === category).reduce((sum, record) => sum + record.amount, 0)
      return {
        name: category,
        amount: total,
        color: colors[index % colors.length]
      }
    }).filter(category => category.amount > 0)

    // 计算百分比
    const totalIncome = categoryData.reduce((sum, category) => sum + category.amount, 0)
    categoryData.forEach(category => {
      category.percentage = totalIncome > 0 ? (category.amount / totalIncome * 100).toFixed(1) + '%' : '0%'
    })

    return categoryData
  },

  /**
   * 计算消费趋势
   */
  calculateTrendData: function(records) {
    // 按日期分组记录
    const dateMap = {}
    records.forEach(record => {
      if (!dateMap[record.date]) {
        dateMap[record.date] = { income: 0, expense: 0 }
      }
      if (record.type === 'income') {
        dateMap[record.date].income += record.amount
      } else {
        dateMap[record.date].expense += record.amount
      }
    })

    // 转换为数组
    const trendData = Object.keys(dateMap).map(date => {
      return {
        date,
        income: dateMap[date].income,
        expense: dateMap[date].expense
      }
    }).sort((a, b) => new Date(a.date) - new Date(b.date))

    return trendData
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

      // 绘制饼图
      this.drawPieChart(ctx, res[0].width, res[0].height, this.data.expenseCategories)
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

      // 绘制饼图
      this.drawPieChart(ctx, res[0].width, res[0].height, this.data.incomeCategories)
    })
  },

  /**
   * 绘制饼图
   */
  drawPieChart: function(ctx, width, height, categories) {
    const centerX = width / 2
    const centerY = height / 2
    const radius = Math.min(width, height) / 3

    let startAngle = 0

    categories.forEach(category => {
      const percentage = parseFloat(category.percentage) / 100
      const endAngle = startAngle + percentage * 2 * Math.PI

      ctx.beginPath()
      ctx.arc(centerX, centerY, radius, startAngle, endAngle)
      ctx.lineWidth = 1
      ctx.strokeStyle = '#fff'
      ctx.stroke()
      ctx.fillStyle = category.color
      ctx.fill()

      startAngle = endAngle
    })

    // 绘制图表中心文字
    ctx.fillStyle = '#333'
    ctx.font = '16px Arial'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText('总支出', centerX, centerY)
    ctx.fillText(`¥${this.data.totalExpense}`, centerX, centerY + 20)
  },

  /**
   * 绘制趋势图表
   */
  drawTrendChart: function() {
    const query = wx.createSelectorQuery()
    query.select('#trendChart').fields({
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

      // 绘制折线图
      this.drawLineChart(ctx, res[0].width, res[0].height, this.data.trendData)
    })
  },

  /**
   * 绘制折线图
   */
  drawLineChart: function(ctx, width, height, trendData) {
    // 设置图表区域
    const padding = 40
    const chartWidth = width - 2 * padding
    const chartHeight = height - 2 * padding

    // 计算最大值
    let maxValue = 0
    trendData.forEach(item => {
      maxValue = Math.max(maxValue, item.income, item.expense)
    })

    // 绘制坐标轴
    ctx.beginPath()
    ctx.strokeStyle = '#ccc'
    ctx.lineWidth = 1
    ctx.moveTo(padding, padding)
    ctx.lineTo(padding, height - padding)
    ctx.lineTo(width - padding, height - padding)
    ctx.stroke()

    // 绘制网格线
    ctx.beginPath()
    ctx.strokeStyle = '#f0f0f0'
    ctx.lineWidth = 1
    for (let i = 0; i <= 5; i++) {
      const y = padding + i * (chartHeight / 5)
      ctx.moveTo(padding, y)
      ctx.lineTo(width - padding, y)
    }
    ctx.stroke()

    // 绘制收入折线
    ctx.beginPath()
    ctx.strokeStyle = '#4CAF50'
    ctx.lineWidth = 2
    trendData.forEach((item, index) => {
      const x = padding + index * (chartWidth / (trendData.length - 1))
      const y = height - padding - (item.income / maxValue) * chartHeight
      if (index === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    })
    ctx.stroke()

    // 绘制支出折线
    ctx.beginPath()
    ctx.strokeStyle = '#F44336'
    ctx.lineWidth = 2
    trendData.forEach((item, index) => {
      const x = padding + index * (chartWidth / (trendData.length - 1))
      const y = height - padding - (item.expense / maxValue) * chartHeight
      if (index === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    })
    ctx.stroke()

    // 绘制数据点
    trendData.forEach((item, index) => {
      const x = padding + index * (chartWidth / (trendData.length - 1))
      
      // 绘制收入点
      const yIncome = height - padding - (item.income / maxValue) * chartHeight
      ctx.beginPath()
      ctx.arc(x, yIncome, 3, 0, 2 * Math.PI)
      ctx.fillStyle = '#4CAF50'
      ctx.fill()

      // 绘制支出点
      const yExpense = height - padding - (item.expense / maxValue) * chartHeight
      ctx.beginPath()
      ctx.arc(x, yExpense, 3, 0, 2 * Math.PI)
      ctx.fillStyle = '#F44336'
      ctx.fill()
    })

    // 绘制图例
    ctx.fillStyle = '#333'
    ctx.font = '12px Arial'
    ctx.textAlign = 'left'
    ctx.textBaseline = 'middle'
    ctx.fillText('收入', padding, padding - 20)
    ctx.fillText('支出', width / 2, padding - 20)
  }
})
