Page({
  /**
   * ں--ҳ
   */
  onLoad: function(options) {
    console.log('warning-records ҳ')
  },

  /**
   * ں--ҳ
   */
  onLoad: function(options) {
    console.log('records ҳ')
  },

  /**
   * 页面的初始数?   */
  data: {
    warningRecords: [],
    totalWarnings: 0,
    highRiskWarnings: 0,
    mediumRiskWarnings: 0,
    lowRiskWarnings: 0,
    suggestions: []
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
    // 风险预警记录
    var warningRecords = [
      { time: '2023-12-01 10:30', content: '您的负债比率已达到37.5%，接近预警阈值值', level: 'medium', levelText: '中风险' },
      { time: '2023-11-25 15:20', content: '本月还款额占收入0%，需要注意', level: 'medium', levelText: '中风险' },
      { time: '2023-11-15 09:45', content: '单笔消费超过预算10%，建议控', level: 'low', levelText: '低风险' },
      { time: '2023-10-28 14:20', content: '连续3天消费超过预算，需要控', level: 'low', levelText: '低风险' },
      { time: '2023-10-20 09:15', content: '您的储蓄率已降至10%以下，需要提', level: 'medium', levelText: '中风险' },
      { time: '2023-09-15 16:30', content: '您的债务率已超过30%，需要减少债务', level: 'high', levelText: '高风险' }
    ]
    
    // 统计数据
    const totalWarnings = warningRecords.length
    const highRiskWarnings = warningRecords.filter(item => item.level === 'high').length
    const mediumRiskWarnings = warningRecords.filter(item => item.level === 'medium').length
    const lowRiskWarnings = warningRecords.filter(item => item.level === 'low').length
    
    // 行动建议
    const suggestions = [
      '定期查看风险预警记录，及时了解财务状况态',
      '针对高风险险预警，立即采取措施降低风险险',
      '分析预警趋势，发现财务问题的根源',
      '制定风险防范计划，避免未来风',
      '如果风险持续增加，考虑寻求专业帮助'
    ]
    
    this.setData({
      warningRecords,
      totalWarnings,
      highRiskWarnings,
      mediumRiskWarnings,
      lowRiskWarnings,
      suggestions
    })
  },

  /**
   * 查看记录详情
   */
  viewRecordDetails: function(e) {
    const index = e.currentTarget.dataset.index
    const record = this.data.warningRecords[index]
    
    wx.showModal({
      title: '预警记录详情',
      content: record.content,
      showCancel: false
    })
  },

  /**
   * 分享记录
   */
  shareRecords: function() {
    const { totalWarnings, highRiskWarnings, mediumRiskWarnings, lowRiskWarnings } = this.data
    
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    })
  },

  /**
   * 导出记录
   */
  exportRecords: function() {
    wx.showModal({
      title: '导出记录',
      content: '导出功能正在开发发中，敬请期待！',
      showCancel: false
    })
  },

  /**
   * 页面分享
   */
  onShareAppMessage: function() {
    const { totalWarnings, highRiskWarnings, mediumRiskWarnings, lowRiskWarnings } = this.data
    
    return {
      title: `我的风险预警记录 - ${totalWarnings}次预警`,
      desc: `高风险${highRiskWarnings}次，中风险${mediumRiskWarnings}次，低风险${lowRiskWarnings}次`,
      path: '/pages/warning-records/warning-records'
    }
  },

  /**
   * 分享到朋友圈
   */
  onShareTimeline: function() {
    const { totalWarnings, highRiskWarnings, mediumRiskWarnings, lowRiskWarnings } = this.data
    
    return {
      title: `我的风险预警记录 - ${totalWarnings}次预警`,
      query: '',
      imageUrl: ''
    }
  }
})




