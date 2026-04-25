Page({
  /**
   * 页面的初始数?   */
  data: {
    currentSection: '',
    sections: [
      '什么是校园贷？',
      '校园贷的常见风险',
      '如何识别非法校园贷？',
      '如何保护自己',
      '遇到问题怎么办？'
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    
    // 记录用户已阅读指南?    wx.setStorageSync('guideRead', true)
  },

  /**
   * 滚动到指南定章?   */
  scrollToSection: function(e) {
    const section = e.currentTarget.dataset.section
    this.setData({
      currentSection: section
    })
    
    // 滚动到指南定章?    wx.createSelectorQuery()
      .select(`#${section}`)
      .boundingClientRect(rect => {
        if (rect) {
          wx.pageScrollTo({
            scrollTop: rect.top + wx.pageScrollTo({}) - 20,
            duration: 300
          })
        }
      })
      .exec()
  },

  /**
   * 开始知识测?   */
  startQuiz: function() {
    wx.navigateTo({
      url: '/pages/quiz/quiz'
    })
  },

  /**
   * 开始风险评?   */
  startAssessment: function() {
    wx.navigateTo({
      url: '/pages/assessment/assessment'
    })
  },

  /**
   * 完成功阅读
   */
  finishGuide: function() {
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
      title: '校园贷风险防范指南',
      desc: '保护大学生权益，远离校园贷陷',
      path: '/pages/guide/guide'
    }
  },

  /**
   * 分享到朋友圈
   */
  onShareTimeline: function() {
    return {
      title: '校园贷风险防范指南',
      query: '',
      imageUrl: ''
    }
  },

  /**
   * 页面打印
   */
  onPrint: function() {
    wx.showModal({
      title: '打印功能',
      content: '您可以使用手机的截图功能保存指南南内容，或转发给其他同学共同学习',
      showCancel: false
    })
  },

  /**
   * 页面收入藏
   */
  onCollect: function() {
    wx.setStorageSync('guideCollected', true)
    wx.showToast({
      title: '收入藏成功',
      icon: 'success'
    })
  },

  /**
   * 页面转发给好?   */
  onForward: function() {
    this.onShareAppMessage()
  },

  /**
   * 页面反馈
   */
  onFeedback: function() {
    wx.showModal({
      title: '意见反馈',
      content: '如果您对本指南南有任何建议或意见，请通过微信小程序客服功能与我们联系',
      showCancel: false
    })
  },

  /**
   * 页面加载更多内容
   */
  loadMoreContent: function() {
    wx.showToast({
      title: '已加载全部内',
      icon: 'none'
    })
  },

  /**
   * 页面重新加载
   */
  reloadPage: function() {
    wx.reLaunch({
      url: '/pages/guide/guide'
    })
  },

  /**
   * 页面截图
   */
  takeScreenshot: function() {
    wx.showModal({
      title: '截图功能',
      content: '您可以使用手机的截图功能保存指南南内容，或转发给其他同学共同学习',
      showCancel: false
    })
  },

  /**
   * 页面添加到桌?   */
  addToDesktop: function() {
    wx.showModal({
      title: '添加到桌',
      content: '您可以将本页面添加到手机桌面，方便随时查看和学习',
      showCancel: false
    })
  },

  /**
   * 页面搜索功能
   */
  onSearch: function(e) {
    const keyword = e.detail.value
    if (!keyword) return
    
    // 简单的搜索实现
    const sections = ['what', 'risks', 'identify', 'protect', 'help']
    let found = false
    
    sections.forEach(section => {
      // 微信小程序中获取DOM元素的方式需要使用wx.createSelectorQuery
      var query = wx.createSelectorQuery()
      query.select(`#${section}`).boundingClientRect()
      query.exec((res) => {
        if (res && res.length > 0 && res[0]) {
          // 这里简化实现，实际上需要根据内容判断是否包含关键词
          // 由于微信小程序不支持直接获取DOM文本内容，这里简化处理
          var sectionTitle = this.data.sections[sections.indexOf(section)]
          if (sectionTitle.includes(keyword)) {
            this.scrollToSection({
              currentTarget: {
                dataset: {
                  section: section
                }
              }
            })
            found = true
          }
        }
      })
    })
    
    if (!found) {
      wx.showModal({
        title: '搜索结果',
        content: '未找到相关内容',
        showCancel: false
      })
    }
  }
})




