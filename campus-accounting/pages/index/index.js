const app = getApp()

Page({
  /**
   * 页面初始数据
   */
  data: {
    monthlyBudget: 0,
    weeklyBudget: 0,
    weekExpense: 0,
    weekRemaining: 0,
    budgetProgress: 0,
    todayExpense: 0,
    hasWarnings: false,
    warnings: []
  },

  onLoad: function (options) {
    this.loadData()
  },

  onShow: function () {
    this.loadData()
  },

  // 加载数据
  loadData: function () {
    this.loadBudget()
    
    // 无论 useCloud 是什么值，都直接从本地存储加载数据
    this.loadTodayExpense()
    this.loadWeekExpense()
    this.checkWarnings()
  },

  // 加载预算数据
  loadBudget: function () {
    var monthlyBudget = app.globalData.monthlyBudget
    var weeklyBudget = app.globalData.weeklyBudget
    this.setData({
      monthlyBudget: monthlyBudget,
      weeklyBudget: weeklyBudget
    })
  },

  // 加载今日支出（本地存储）
  loadTodayExpense: function () {
    var today = app.formatDate(new Date())
    
    try {
      // 从本地存储获取记录
      var records = JSON.parse(wx.getStorageSync('records') || '[]')
      
      // 计算今日支出
      let todayExpense = 0
      records.forEach(record => {
        if (record.type === 'expense' && record.date === today) {
          todayExpense += parseFloat(record.amount)
        }
      })
      
      console.log('今日支出计算结果:', todayExpense)
      
      this.setData({
        todayExpense: todayExpense.toFixed(2)
      })
      
    } catch (err) {
      console.error('加载今日支出失败:', err)
      this.setData({
        todayExpense: 0
      })
    }
  },

  // 加载本周支出（本地存储）
  loadWeekExpense: function () {
    var now = new Date()
    // 计算本周一的日期（与财务分析页面保持一致）
    var weekStart = new Date(now)
    weekStart.setDate(now.getDate() - (now.getDay() === 0 ? 6 : now.getDay() - 1))
    var weekStartStr = app.formatDate(weekStart)
    
    // 计算本周结束日期为当前日期（与财务分析页面保持一致）
    var weekEndStr = app.formatDate(now)
    
    try {
      // 使用与财务分析页面相同的方法获取记录
      const records = app.getRecordsInTimeRange(weekStartStr, weekEndStr)
      
      // 计算本周支出
      let weekExpense = 0
      records.forEach(record => {
        if (record.type === 'expense') {
          weekExpense += parseFloat(record.amount)
        }
      })
      
      const weekRemaining = this.data.weeklyBudget - weekExpense
      const budgetProgress = Math.min((weekExpense / this.data.weeklyBudget) * 100, 100)
      
      this.setData({
        weekExpense: weekExpense.toFixed(2),
        weekRemaining: weekRemaining.toFixed(2),
        budgetProgress: Math.round(budgetProgress)
      })
      
    } catch (err) {
      console.error('加载本周支出失败:', err)
      this.setData({
        weekExpense: 0,
        weekRemaining: this.data.weeklyBudget,
        budgetProgress: 0
      })
    }
  },

  // 加载模拟数据（无云开发时）
  loadMockData: function () {
    var mockRecords = app.globalData.mockData.records
    
    // 计算今日支出
    var today = app.formatDate(new Date())
    var todayRecords = mockRecords.filter(record => record.date === today && record.type === 'expense')
    var todayExpense = todayRecords.reduce((sum, record) => sum + parseFloat(record.amount), 0)
    
    // 计算本周支出
    var weekRecords = mockRecords.filter(record => record.type === 'expense')
    var weekExpense = weekRecords.reduce((sum, record) => sum + parseFloat(record.amount), 0)
    
    var weekRemaining = this.data.weeklyBudget - weekExpense
    var budgetProgress = Math.min((weekExpense / this.data.weeklyBudget) * 100, 100)
    
    this.setData({
      todayExpense: todayExpense.toFixed(2),
      weekExpense: weekExpense.toFixed(2),
      weekRemaining: weekRemaining.toFixed(2),
      budgetProgress: Math.round(budgetProgress)
    })
  },

  // 检查警告
  checkWarnings: function () {
    var warnings = []
    
    // 单日支出预警
    if (this.data.todayExpense > 300) {
      warnings.push('今日支出超过300元，请注意控制消费')
    }
    
    // 周预算预警
    if (this.data.weekRemaining < 0) {
      warnings.push('本周预算已超支，请合理安排支出')
    }
    
    this.setData({
      warnings: warnings,
      hasWarnings: warnings.length > 0
    })
  },

  // 设置预算
  setBudget: function () {
    wx.showModal({
      title: '设置本月预算',
      editable: true,
      placeholderText: '请输入本月生活费预算',
      success: res => {
        if (res.confirm && res.content) {
          var budget = parseFloat(res.content)
          if (budget > 0) {
            app.globalData.monthlyBudget = budget
            app.globalData.weeklyBudget = budget / 4
            wx.setStorageSync('monthlyBudget', budget)
            this.loadBudget()
            this.loadWeekExpense()
            wx.showToast({
              title: '预算设置成功',
              icon: 'success'
            })
          } else {
            wx.showToast({
              title: '请输入有效的预算金额',
              icon: 'none'
            })
          }
        }
      }
    })
  },

  // 添加记录
  addRecord: function () {
    wx.navigateTo({
      url: '/pages/add-record/add-record'
    })
  },

  // 查看记录
  viewRecords: function () {
    wx.switchTab({
      url: '/pages/records/records'
    })
  },

  // 查看分析
  viewAnalysis: function () {
    wx.switchTab({
      url: '/pages/analysis/analysis'
    })
  },

  // 显示安全页面
  showSafetyPage: function () {
    wx.switchTab({
      url: '/pages/help/help'
    })
  },

  // 查看校园贷防范指南
  viewGuide: function () {
    wx.navigateTo({
      url: '/pages/guide/guide'
    })
  },

  // 查看法律后果科普
  viewRiskConsequence: function () {
    wx.navigateTo({
      url: '/pages/risk-consequence/risk-consequence'
    })
  },

  // 查看月度财务报告
  viewMonthlyReport: function () {
    wx.navigateTo({
      url: '/pages/monthly-report/monthly-report'
    })
  },

  // 查看债务预警系统
  viewDebtWarning: function () {
    wx.navigateTo({
      url: '/pages/debt-warning/debt-warning'
    })
  },

  // 查看消费习惯分析
  viewSpendingHabits: function () {
    wx.navigateTo({
      url: '/pages/spending-habits/spending-habits'
    })
  },

  // 查看智能财务建议
  viewSmartSuggestion: function () {
    wx.navigateTo({
      url: '/pages/smart-suggestion/smart-suggestion'
    })
  }
})