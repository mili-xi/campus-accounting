Page({
  /**
   * ں--ҳ
   */
  onLoad: function(options) {
    console.log('debt-warning ҳ')
  },

  /**
   * 页面的初始数?   */
  data: {
    riskScore: 0,
    riskLevel: 'low',
    riskLevelText: '',
    riskDescription: '',
    totalDebt: 0,
    monthlyPayment: 0,
    debtRatio: 0,
    debtServiceRatio: 0,
    hasWarningRecords: false,
    warningRecords: [],
    preventionSuggestions: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    
    // 初始化预警数?    this.initWarningData()
  },

  /**
   * 初始化预警数?   */
  initWarningData: function() {
    // 风险评估数据
    var riskScore = 75
    let riskLevel = 'low'
    let riskLevelText = '低风险'
    let riskDescription = '您的债务风险较低，但仍需注意合理规划财务，避免过度消费'
    
    if (riskScore >= 80) {
      riskLevel = 'high'
      riskLevelText = '高风险'
      riskDescription = '您的债务风险较高，需要立即采取措施减少债务，避免财务危机'
    } else if (riskScore >= 60) {
      riskLevel = 'medium'
      riskLevelText = '中风险'
      riskDescription = '您的债务风险处于中等水平，需要关注财务状况态况，合理控制消费'
    }
    
    // 债务分析数据
    const totalDebt = 3000
    const monthlyPayment = 800
    const debtRatio = 37.5 // 债务/收入比率
    const debtServiceRatio = 40 // 还款/收入比率
    
    // 预警记录
    const hasWarningRecords = true
    const warningRecords = [
      {
        time: '2023-12-01 10:30',
        content: '您的负债比率已达到37.5%，接近预警阈值',
        level: 'medium',
        levelText: '中风险'
      },
      {
        time: '2023-11-25 15:20',
        content: '本月还款额占收入0%，需要注意',
        level: 'medium',
        levelText: '中风险'
      },
      {
        time: '2023-11-15 09:45',
        content: '单笔消费超过预算10%，建议控制',
        level: 'low',
        levelText: '低风险'
      }
    ]
    
    // 风险预防建议
    const preventionSuggestions = [
      '制定详细的预算计划，严格控制消费',
      '减少不必要的支出，避免冲动消费',
      '增加收入来源，提高还款能力',
      '优先偿还高利息债务，避免债务滚雪球',
      '建立紧急备用金额，应对突发情况',
      '定期评估财务状况，及时调整策略'
    ]
    
    this.setData({
      riskScore,
      riskLevel,
      riskLevelText,
      riskDescription,
      totalDebt,
      monthlyPayment,
      debtRatio,
      debtServiceRatio,
      hasWarningRecords,
      warningRecords,
      preventionSuggestions
    })
  },

  /**
   * 查看风险详情
   */
  viewRiskDetails: function() {
    wx.navigateTo({
      url: '/pages/risk-details/risk-details'
    })
  },

  /**
   * 查看全部记录
   */
  viewAllRecords: function() {
    wx.navigateTo({
      url: '/pages/warning-records/warning-records'
    })
  },

  /**
   * 债务计算?   */
  debtCalculator: function() {
    wx.navigateTo({
      url: '/pages/debt-calculator/debt-calculator'
    })
  },

  /**
   * 还款计划生成功
   */
  repaymentPlan: function() {
    wx.navigateTo({
      url: '/pages/repayment-plan/repayment-plan'
    })
  },

  /**
   * 债务合并建议
   */
  debtConsolidation: function() {
    wx.navigateTo({
      url: '/pages/debt-consolidation/debt-consolidation'
    })
  },

  /**
   * 立即联系
   */
  contactConsultant: function() {
    wx.navigateTo({
      url: '/pages/contact/contact'
    })
  },

  /**
   * 开始测?   */
  startRiskTest: function() {
    wx.navigateTo({
      url: '/pages/risk-test/risk-test'
    })
  },

  /**
   * 进入知识中心
   */
  viewKnowledgeCenter: function() {
    wx.navigateTo({
      url: '/pages/knowledge-center/knowledge-center'
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
      title: '债务预警系统',
      desc: '及时识别和预防债务风险，保障您的财务安',
      path: '/pages/debt-warning/debt-warning'
    }
  },

  /**
   * 分享到朋友圈
   */
  onShareTimeline: function() {
    return {
      title: '债务预警系统',
      query: '',
      imageUrl: ''
    }
  }
})




