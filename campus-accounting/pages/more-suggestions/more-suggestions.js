Page({
  /**
   * 页面的初始数据
   */
  data: {
    suggestionCategories: [
      { 
        icon: '💰', 
        name: '财务管理', 
        description: '个人财务管理的建议' 
      },
      { 
        icon: '📊', 
        name: '预算规划', 
        description: '预算规划的建议' 
      },
      { 
        icon: '📈', 
        name: '投资分析', 
        description: '投资分析的建议' 
      },
      { 
        icon: '💳', 
        name: '信用卡管理', 
        description: '信用卡管理的建议' 
      }
    ],
    popularSuggestions: [
      { 
        icon: '🎯', 
        name: '预算规划', 
        description: '制定个人预算，控制消费', 
        type: '财务管理', 
        rating: 4.8, 
        users: 1234 
      },
      { 
        icon: '🚀', 
        name: '投资分析', 
        description: '学习投资分析的方法', 
        type: '投资分析', 
        rating: 4.5, 
        users: 890 
      },
      { 
        icon: '🌟', 
        name: '信用卡管理', 
        description: '合理使用信用卡，避免逾期', 
        type: '信用卡管理', 
        rating: 4.6, 
        users: 2345 
      }
    ],
    newSuggestions: [
      { 
        icon: '📚', 
        name: '财务管理入门', 
        description: '学习个人财务管理的基础知识', 
        type: '财务管理', 
        rating: 4.7, 
        users: 456 
      },
      { 
        icon: '💡', 
        name: '预算优化', 
        description: '优化个人预算，减少浪费', 
        type: '预算规划', 
        rating: 4.9, 
        users: 678 
      },
      { 
        icon: '🔍', 
        name: '投资风险评估', 
        description: '评估投资风险，避免损失', 
        type: '投资分析', 
        rating: 4.4, 
        users: 567 
      }
    ],
    searchText: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 打开建议分类
   */
  openCategory(e) {
    const index = e.currentTarget.dataset.index
    const category = this.data.suggestionCategories[index]
    
    wx.showModal({
      title: '打开建议分类',
      content: `正在打开 ${category.name} 分类...`,
      showCancel: false
    })
  },

  /**
   * 打开热门建议
   */
  openSuggestion(e) {
    const index = e.currentTarget.dataset.index
    const suggestion = this.data.popularSuggestions[index]
    
    wx.showModal({
      title: '打开热门建议',
      content: `正在打开 ${suggestion.name} 建议...`,
      showCancel: false
    })
  },

  /**
   * 打开最新建议
   */
  openNewSuggestion(e) {
    const index = e.currentTarget.dataset.index
    const suggestion = this.data.newSuggestions[index]
    
    wx.showModal({
      title: '打开最新建议',
      content: `正在打开 ${suggestion.name} 建议...`,
      showCancel: false
    })
  },

  /**
   * 搜索建议
   */
  searchSuggestions() {
    const searchText = this.data.searchText.trim()
    if (!searchText) {
      wx.showModal({
        title: '搜索建议',
        content: '请输入搜索关键词',
        showCancel: false
      })
      return
    }
    
    wx.showModal({
      title: '搜索建议',
      content: `正在搜索包含 "${searchText}" 的建议...`,
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
      title: '更多建议',
      desc: '提供各种财务建议和学习资源',
      path: '/pages/more-suggestions/more-suggestions'
    }
  }
})