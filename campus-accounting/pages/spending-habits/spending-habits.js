Page({
  /**
   * ں--ҳ
   */
  onLoad: function(options) {
    console.log('spending-habits ҳ')
  },

  /**
   * 页面的初始数?   */
  data: {
    habitScore: 0,
    scoreDescription: '',
    scoreSuggestion: '',
    consumptionFrequency: '',
    averageAmount: 0,
    largeExpenseCount: 0,
    impulsiveCount: 0,
    timePreference: '',
    habitType: '',
    habitTypeDescription: '',
    advantages: [],
    disadvantages: [],
    improvementPlan: [],
    habitSuggestions: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    
    // 初始化分析数?    this.initAnalysisData()
  },

  /**
   * 初始化分析数?   */
  initAnalysisData: function() {
    // 消费习惯评分
    var habitScore = 82
    let scoreDescription = '您的消费习惯良好，能够理性消费，但仍有一些可以改进的地方'
    let scoreSuggestion = '建议：继续保持理性消费习惯，避免冲动消费，合理规划消费预算'
    
    if (habitScore >= 90) {
      scoreDescription = '您的消费习惯非常优秀，能够严格控制消费，理性规划财务'
      scoreSuggestion = '建议：继续保持良好的消费习惯，定期评估财务状况态况，实现财务目标'
    } else if (habitScore >= 70) {
      scoreDescription = '您的消费习惯一般，需要注意控制消费，避免冲动消费'
      scoreSuggestion = '建议：制定详细的消费预算，避免冲动消费，培养储蓄习惯'
    } else {
      scoreDescription = '您的消费习惯较差，需要立即采取措施改善消费行为'
      scoreSuggestion = '建议：制定严格的消费计划，控制消费，逐步改善消费习惯'
    }
    
    // 消费行为分析数据
    const consumptionFrequency = '每周5-7'
    const averageAmount = 45
    const largeExpenseCount = 2
    const impulsiveCount = 1
    const timePreference = '周末消费较多'
    
    // 消费习惯类型
    const habitType = '理性型'
    const habitTypeDescription = '您的消费习惯较为理性，能够根据实际需求进行消费，但在某些情况下可能会有冲动消费的倾向'
    
    // 消费优势
    const advantages = [
      '能够根据实际需求消',
      '消费前会进行必要的思',
      '能够控制大额消费',
      '有一定的储蓄意识'
    ]
    
    // 消费劣势
    const disadvantages = [
      '偶尔会有冲动消费的倾向',
      '消费时间偏好较为集中',
      '对某些商品有轻微的购物欲',
      '需要进一步提高储蓄率'
    ]
    
    // 消费习惯改善计划
    const improvementPlan = [
      '制定详细的消费预',
      '避免冲动消费，购物前做好计划',
      '分散消费时间，避免集中消',
      '定期评估消费行为，及时调'
    ]
    
    // 消费习惯培养建议
    const habitSuggestions = [
      '购物前制定清单，避免冲动消费',
      '设置消费提醒，控制消费额',
      '学习理财知识，提高消费理',
      '定期复盘消费行为，总结经验'
    ]
    
    this.setData({
      habitScore,
      scoreDescription,
      scoreSuggestion,
      consumptionFrequency,
      averageAmount,
      largeExpenseCount,
      impulsiveCount,
      timePreference,
      habitType,
      habitTypeDescription,
      advantages,
      disadvantages,
      improvementPlan,
      habitSuggestions
    })
  },

  /**
   * 查看评分详情
   */
  viewScoreDetails: function() {
    wx.navigateTo({
      url: '/pages/score-details/score-details'
    })
  },

  /**
   * 开始改善计?   */
  startImprovementPlan: function() {
    wx.navigateTo({
      url: '/pages/improvement-plan/improvement-plan'
    })
  },

  /**
   * 开始测?   */
  startHabitTest: function() {
    wx.navigateTo({
      url: '/pages/habit-test/habit-test'
    })
  },

  /**
   * 查看成功案例
   */
  viewSuccessStories: function() {
    wx.navigateTo({
      url: '/pages/success-stories/success-stories'
    })
  },

  /**
   * 阅读文章
   */
  viewArticles: function() {
    wx.navigateTo({
      url: '/pages/articles/articles'
    })
  },

  /**
   * 观看视频
   */
  viewVideos: function() {
    wx.navigateTo({
      url: '/pages/videos/videos'
    })
  },

  /**
   * 在线课程
   */
  viewCourses: function() {
    wx.navigateTo({
      url: '/pages/courses/courses'
    })
  },

  /**
   * 每日提醒
   */
  setDailyReminder: function() {
    wx.navigateTo({
      url: '/pages/daily-reminder/daily-reminder'
    })
  },

  /**
   * 每周提醒
   */
  setWeeklyReminder: function() {
    wx.navigateTo({
      url: '/pages/weekly-reminder/weekly-reminder'
    })
  },

  /**
   * 每月提醒
   */
  setMonthlyReminder: function() {
    wx.navigateTo({
      url: '/pages/monthly-reminder/monthly-reminder'
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
      title: '消费习惯分析',
      desc: '了解自己的消费习惯，培养健康的消费理',
      path: '/pages/spending-habits/spending-habits'
    }
  },

  /**
   * 分享到朋友圈
   */
  onShareTimeline: function() {
    return {
      title: '消费习惯分析',
      query: '',
      imageUrl: ''
    }
  }
})




