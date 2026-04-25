Page({
  /**
   * 页面的初始数据
   */
  data: {
    score: 85,
    scoreLabel: '良好',
    scorePercent: 85,
    scoreComponents: [
      { 
        name: '还款能力', 
        score: 25, 
        maxScore: 30, 
        percent: 83.3 
      },
      { 
        name: '信用记录', 
        score: 28, 
        maxScore: 30, 
        percent: 93.3 
      },
      { 
        name: '债务情况', 
        score: 20, 
        maxScore: 30, 
        percent: 66.7 
      },
      { 
        name: '消费习惯', 
        score: 12, 
        maxScore: 10, 
        percent: 120 
      }
    ],
    suggestions: [
      '继续保持良好的还款习惯，按时还款',
      '合理控制消费，避免过度消费',
      '适当减少借贷规模，降低债务压力',
      '建立紧急备用金，应对突发情况'
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.calculateScoreDetails()
  },

  /**
   * 计算评分详情
   */
  calculateScoreDetails() {
    const score = this.data.score
    let scoreLabel = ''
    
    if (score >= 90) {
      scoreLabel = '优秀'
    } else if (score >= 80) {
      scoreLabel = '良好'
    } else if (score >= 70) {
      scoreLabel = '中等'
    } else if (score >= 60) {
      scoreLabel = '合格'
    } else {
      scoreLabel = '较差'
    }
    
    this.setData({
      scoreLabel: scoreLabel,
      scorePercent: score
    })
  },

  /**
   * 查看详细报告
   */
  viewReport() {
    wx.navigateTo({
      url: '/pages/report/report'
    })
  },

  /**
   * 分享评分结果
   */
  shareResult() {
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    })
  },

  /**
   * 重新评估
   */
  recheck() {
    wx.showModal({
      title: '重新评估',
      content: '重新评估需要重新填写信息，是否继续？',
      success: res => {
        if (res.confirm) {
          wx.navigateTo({
            url: '/pages/assessment/assessment'
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {
    return {
      title: '我的评分详情',
      desc: `我的评分是 ${this.data.score} 分，等级为 ${this.data.scoreLabel}`,
      path: '/pages/score-details/score-details'
    }
  },

  /**
   * 分享到朋友圈
   */
  onShareTimeline() {
    return {
      title: `我的评分是 ${this.data.score} 分，等级为 ${this.data.scoreLabel}`,
      query: '',
      imageUrl: ''
    }
  }
})