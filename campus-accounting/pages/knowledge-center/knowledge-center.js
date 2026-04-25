Page({
  /**
   * 页面的初始数据
   */
  data: {
    searchText: '',
    hotTopics: [
      { name: '校园贷风险防范', hits: 1234 },
      { name: '财务管理技巧', hits: 987 },
      { name: '如何识别非法集资', hits: 756 },
      { name: '合理规划消费', hits: 634 }
    ],
    latestArticles: [
      { 
        id: 1, 
        title: '校园贷的危害与防范措施', 
        date: '2023-12-15', 
        views: 567 
      },
      { 
        id: 2, 
        title: '大学生如何建立正确的消费观念', 
        date: '2023-12-10', 
        views: 423 
      },
      { 
        id: 3, 
        title: '个人财务管理的重要性', 
        date: '2023-12-05', 
        views: 389 
      },
      { 
        id: 4, 
        title: '如何避免陷入债务陷阱', 
        date: '2023-11-28', 
        views: 543 
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 查看法律知识
   */
  viewLegalKnowledge() {
    wx.navigateTo({
      url: '/pages/legal-knowledge/legal-knowledge'
    })
  },

  /**
   * 查看财务知识
   */
  viewFinancialKnowledge() {
    wx.navigateTo({
      url: '/pages/financial-knowledge/financial-knowledge'
    })
  },

  /**
   * 查看常见问题
   */
  viewFAQ() {
    wx.navigateTo({
      url: '/pages/faq/faq'
    })
  },

  /**
   * 查看热门话题
   */
  viewTopic(e) {
    const topic = e.currentTarget.dataset.topic
    wx.showModal({
      title: topic.name,
      content: `查看话题 "${topic.name}" 的详细内容`,
      showCancel: false
    })
  },

  /**
   * 查看文章
   */
  viewArticle(e) {
    const article = e.currentTarget.dataset.article
    wx.showModal({
      title: article.title,
      content: `查看文章 "${article.title}" 的详细内容`,
      showCancel: false
    })
  },

  /**
   * 搜索输入
   */
  onSearchInput(e) {
    this.setData({
      searchText: e.detail.value
    })
  },

  /**
   * 执行搜索
   */
  performSearch() {
    const searchText = this.data.searchText.trim()
    
    if (!searchText) {
      wx.showModal({
        title: '提示',
        content: '请输入搜索关键词',
        showCancel: false
      })
      return
    }

    wx.showLoading({
      title: '搜索中'
    })

    // 模拟搜索过程
    setTimeout(() => {
      wx.hideLoading()
      wx.showModal({
        title: '搜索结果',
        content: `搜索关键词 "${searchText}" 找到 5 条相关内容`,
        showCancel: false
      })
    }, 1500)
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
      title: '知识中心',
      desc: '了解校园贷风险与财务管理知识',
      path: '/pages/knowledge-center/knowledge-center'
    }
  }
})