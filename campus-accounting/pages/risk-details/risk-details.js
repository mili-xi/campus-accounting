Page({
  /**
   * ں--ҳ
   */
  onLoad: function(options) {
    console.log('risk-details ҳ')
  },

  /**
   * 页面的初始数?   */
  data: {
    riskScore: 0,
    riskLevelText: '',
    riskDescription: '',
    riskFactors: [],
    warningRecords: [],
    preventionMeasures: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    
    // 初始化页面数?    this.initPageData()
  },

  /**
   * 初始化页面数?   */
  initPageData: function() {
    // 风险评分和等?    var riskScore = 75
    let riskLevelText = '中风险'
    let riskDescription = '您的债务风险处于中等水平，需要关注财务状况态况，合理控制消费'
    
    if (riskScore >= 80) {
      riskLevelText = '高风险'
      riskDescription = '您的债务风险较高，需要立即采取措施减少债务，避免财务危机'
    } else if (riskScore <= 60) {
      riskLevelText = '低风险'
      riskDescription = '您的债务风险较低，但仍需注意合理规划财务，避免过度消费'
    }
    
    // 风险因子分析
    const riskFactors = [
      { name: '债务/收入比率', value: '37.5%', progress: 37.5 },
      { name: '还款/收入比率', value: '40%', progress: 40 },
      { name: '储蓄', value: '25%', progress: 25 },
      { name: '信用卡卡分数', value: '750', progress: 75 },
      { name: '逾期次数', value: '1', progress: 10 }
    ]
    
    // 风险预警记录
    const warningRecords = [
      { time: '2023-12-01 10:30', content: '您的负债比率已达到37.5%，接近预警阈值值', level: 'medium', levelText: '中风险' },
      { time: '2023-11-25 15:20', content: '本月还款额占收入0%，需要注意', level: 'medium', levelText: '中风险' },
      { time: '2023-11-15 09:45', content: '单笔消费超过预算10%，建议控', level: 'low', levelText: '低风险' }
    ]
    
    // 风险防范措施
    const preventionMeasures = [
      '制定详细的预算计划，严格控制消费',
      '减少不必要的开发支出，避免冲动消费',
      '增加收入来源，提高还款能',
      '优先偿还高利息债务，避免债务滚雪',
      '建立紧急备用金额，应对突发情',
      '定期评估财务状况态况，及时调整策'
    ]
    
    this.setData({
      riskScore,
      riskLevelText,
      riskDescription,
      riskFactors,
      warningRecords,
      preventionMeasures
    })
  },

  /**
   * 分享结果
   */
  shareResult: function() {
    const { riskScore, riskLevelText } = this.data
    
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    })
  },

  /**
   * 收入藏
   */
  saveToFavorites: function() {
    wx.setStorageSync('riskDetailsCollected', true)
    wx.showToast({
      title: '收入藏成功',
      icon: 'success',
      duration: 1500
    })
  },

  /**
   * 页面分享
   */
  onShareAppMessage: function() {
    const { riskScore, riskLevelText } = this.data
    
    return {
      title: `我的债务风险详情 - 风险评分${riskScore}分`,
      desc: `风险等级${riskLevelText}，需要关注财务状况态况`,
      path: '/pages/risk-details/risk-details'
    }
  },

  /**
   * 分享到朋友圈
   */
  onShareTimeline: function() {
    const { riskScore, riskLevelText } = this.data
    
    return {
      title: `我的债务风险详情 - 风险评分${riskScore}分`,
      query: '',
      imageUrl: ''
    }
  }
})




