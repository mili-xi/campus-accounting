Page({
  /**
   * ں--ҳ
   */
  onLoad: function(options) {
    console.log('smart-suggestion ҳ')
  },

  /**
   * 页面的初始数?   */
  data: {
    financialStatus: '',
    savingsRate: 0,
    debtRatio: 0,
    cashFlow: '',
    personalizedSuggestions: [],
    expenseOptimization: [],
    savingsSuggestions: [],
    investmentSuggestions: [],
    financialGoals: [],
    budgetOptimization: [],
    learningResources: [],
    financialTools: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    
    // 初始化建议数?    this.initSuggestionData()
  },

  /**
   * 初始化建议数?   */
  initSuggestionData: function() {
    // 财务健康状态况
    var financialStatus = '良好'
    var savingsRate = 25
    var debtRatio = 20
    var cashFlow = ''
    
    // 个性化财务建议
    var personalizedSuggestions = [
      '您的财务状况态况良好，建议继续保持理性消费习',
      '适当增加储蓄金额，为未来的财务目标做准备',
      '可以考虑开始进行小额贷贷投资，增加被动收入',
      '定期检查财务状况态况，及时调整理财策略'
    ]
    
    // 消费优化建议
    var expenseOptimization = [
      '减少不必要的消费，每月节省10%-15%的开支',
      '优化购物习惯，避免冲动消费和过度消费',
      '合理规划交通通通费用，选择更经济的交通通通方',
      '适当减少在外就餐次数，增加自己做饭的频率'
    ]
    
    // 储蓄建议
    var savingsSuggestions = [
      '将每月收入的30%用于储蓄',
      '建立紧急备用金额，至少覆盖3-6个月的生活费',
      '考虑使用定期存款或货币基金额等低风险险储蓄方',
      '制定长期储蓄目标，如购房、旅游等'
    ]
    
    // 投资建议
    var investmentSuggestions = [
      '了解基金额定投，开始进行长期投',
      '根据风险承受能力选择适合自己的投资产',
      '不要把所有资金额放在同一投资产品中，分散风险',
      '学习投资知识，提高投资决策能'
    ]
    
    // 财务目标设置定
    var financialGoals = [
      '短期目标：6个月内建立紧急备用金额',
      '中期目标：3年内实现旅游或其他大额消费',
      '长期目标：10年内实现购房或其他重大财务目标'
    ]
    
    // 预算优化建议
    var budgetOptimization = [
      '制定详细的月度预算，严格控制消费',
      '定期检查预算执行情况，及时调整',
      '设置消费提醒，避免超',
      '优化预算分配，提高资金额使用效'
    ]
    
    // 财务知识学习
    var learningResources = [
      '阅读理财类书籍，提高财务知识水平',
      '关注财经新闻，了解市场动',
      '参加理财课程，学习投资技',
      '关注理财公众号，获取实用信息'
    ]
    
    // 财务工具推荐
    var financialTools = [
      '使用记录账软件记录消费，了解消费习',
      '使用理财计算器，计算投资收入益和风',
      '关注财务APP，获取实时财务信',
      '使用信用卡卡卡管理软件，避免逾期还款'
    ]
    
    this.setData({
      financialStatus,
      savingsRate,
      debtRatio,
      cashFlow,
      personalizedSuggestions,
      expenseOptimization,
      savingsSuggestions,
      investmentSuggestions,
      financialGoals,
      budgetOptimization,
      learningResources,
      financialTools
    })
  },

  /**
   * 查看更多建议
   */
  viewMoreSuggestions: function() {
    wx.navigateTo({
      url: '/pages/more-suggestions/more-suggestions'
    })
  },

  /**
   * 优化消费
   */
  optimizeExpenses: function() {
    wx.navigateTo({
      url: '/pages/expense-optimization/expense-optimization'
    })
  },

  /**
   * 设置储蓄目标
   */
  setSavingsGoals: function() {
    wx.navigateTo({
      url: '/pages/savings-goals/savings-goals'
    })
  },

  /**
   * 查看投资选项
   */
  viewInvestmentOptions: function() {
    wx.navigateTo({
      url: '/pages/investment-options/investment-options'
    })
  },

  /**
   * 设置定财务目标
   */
  setFinancialGoals: function() {
    wx.navigateTo({
      url: '/pages/financial-goals/financial-goals'
    })
  },

  /**
   * 优化预算
   */
  optimizeBudget: function() {
    wx.navigateTo({
      url: '/pages/budget-optimization/budget-optimization'
    })
  },

  /**
   * 进入学习中心
   */
  viewLearningCenter: function() {
    wx.navigateTo({
      url: '/pages/learning-center/learning-center'
    })
  },

  /**
   * 查看更多工具
   */
  viewFinancialTools: function() {
    wx.navigateTo({
      url: '/pages/financial-tools/financial-tools'
    })
  },

  /**
   * 预约咨询
   */
  bookConsultation: function() {
    wx.navigateTo({
      url: '/pages/consultation/consultation'
    })
  },

  /**
   * 完成功阅读
   */
  finishReading: function() {
    wx.showToast({
      title: '阅读完成功',
      icon: 'success',
      duration: 1000
    })
    
    // 延迟返回首页
    setTimeout(() => {
      wx.navigateBack()
    }, 1000)
  },

  /**
   * 页面分享
   */
  onShareAppMessage: function() {
    return {
      title: '智能财务建议',
      desc: '获取个性化的财务建议和理财方案',
      path: '/pages/smart-suggestion/smart-suggestion'
    }
  },

  /**
   * 分享到朋友圈
   */
  onShareTimeline: function() {
    return {
      title: '智能财务建议',
      query: '',
      imageUrl: ''
    }
  }
})




