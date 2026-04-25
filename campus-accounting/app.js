App({
  onLaunch: function () {
    console.log('校园记录账小程序启动')
    // 初始化本地存储
    this.initLocalStorage()
    
    // 检查预算设置
    const budget = wx.getStorageSync('monthlyBudget')
    if (budget) {
      this.globalData.monthlyBudget = budget
      this.globalData.weeklyBudget = budget / 4
    }
  },
  
  // 初始化本地存储
  initLocalStorage: function() {
    console.log('使用本地存储')
    this.globalData.useCloud = false
    // 初始化本地存储，避免复杂操作
    try {
      const records = wx.getStorageSync('records')
      if (!records) {
        // 使用极简测试数据
        const testData = [
          {
            _id: '1',
            date: '2026-04-20',
            type: 'expense',
            amount: 35,
            category: '餐饮',
            remark: '午餐'
          },
          {
            _id: '2',
            date: '2026-04-20',
            type: 'income',
            amount: 100,
            category: '兼职',
            remark: '家教收入'
          }
        ]
        
        wx.setStorageSync('records', JSON.stringify(testData))
        console.log('初始化测试数据完成')
      }
    } catch (error) {
      console.error('初始化本地存储失败:', error)
      wx.setStorageSync('records', '[]')
    }
  },
  
  globalData: {
    userInfo: null,
    monthlyBudget: 0,
    weeklyBudget: 0,
    categories: {
      income: ['奖学金', '兼职', '生活费', '其他'],
      expense: ['餐饮', '超市购物', '零食/水果', '日常用品', '化妆品', '衣服', '学习资料', '交通', '娱乐', '网购', '恋爱社交', '话费', '其他']
    },
    warningKeywords: [
      '校园贷', '分期贷', '秒批', '无抵押', '低息贷款', '花呗套现',
      '网贷', '贷款', '借款', '分期', '套现', '低息', '免息', '信用卡',
      '小额贷', '快速贷', '无需抵押', '当天放款', '大学生贷款'
    ], // 贷款相关危险关键词
    useCloud: false,
    useLocalStorage: true
  },
  
  // 格式化金额
  formatAmount: function(amount) {
    return parseFloat(amount).toFixed(2)
  },
  
  // 格式化日期
  formatDate: function(date) {
    const d = new Date(date)
    const year = d.getFullYear()
    const month = String(d.getMonth() + 1).padStart(2, '0')
    const day = String(d.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  },
  
  // 显示警告信息
  showWarning: function(title, content) {
    wx.showModal({
      title: title,
      content: content,
      showCancel: false,
      confirmText: '我知道了'
    })
  },
  
  // 从本地存储中筛选时间范围内的记录
  getRecordsInTimeRange: function(startDate, endDate) {
    try {
      const allRecords = this.getAllRecords()
      return allRecords.filter(record => {
        return record.date >= startDate && record.date <= endDate
      })
    } catch (error) {
      console.error('时间范围筛选失败:', error)
      return []
    }
  },
  
  // 从本地存储获取所有记录
  getAllRecords: function() {
    try {
      const recordsData = wx.getStorageSync('records')
      if (!recordsData) return []
      
      return JSON.parse(recordsData || '[]')
    } catch (error) {
      console.error('从本地存储获取记录失败:', error)
      return []
    }
  },
  
  // 根据类型筛选记录（收入/支出）
  getRecordsByType: function(type) {
    try {
      const allRecords = this.getAllRecords()
      return allRecords.filter(record => record.type === type)
    } catch (error) {
      console.error('类型筛选失败:', error)
      return []
    }
  },
  
  // 根据分类筛选记录
  getRecordsByCategory: function(category) {
    try {
      const allRecords = this.getAllRecords()
      return allRecords.filter(record => record.category === category)
    } catch (error) {
      console.error('分类筛选失败:', error)
      return []
    }
  },
  
  // 计算总收入
  calculateTotalIncome: function(records = null) {
    const targetRecords = records || this.getAllRecords()
    return targetRecords.filter(r => r.type === 'income').reduce((sum, r) => sum + r.amount, 0)
  },
  
  // 计算总支出
  calculateTotalExpense: function(records = null) {
    const targetRecords = records || this.getAllRecords()
    return targetRecords.filter(r => r.type === 'expense').reduce((sum, r) => sum + r.amount, 0)
  }
})
