Page({
  /**
   * 页面的初始数据
   */
  data: {
    searchText: '',
    featuredCases: [
      { 
        image: '💼', 
        title: '从负债累累到财务自由', 
        summary: '小王通过科学的债务管理和预算控制，在2年内还清了所有债务', 
        time: '2023-12-15', 
        views: '1.2w' 
      },
      { 
        image: '💰', 
        title: '三个月储蓄翻一番', 
        summary: '小李通过优化消费习惯和增加收入来源，三个月内储蓄增长了100%', 
        time: '2023-12-10', 
        views: '8.9k' 
      },
      { 
        image: '📊', 
        title: '成功控制月消费在预算内', 
        summary: '小张通过严格的预算管理，连续6个月将消费控制在预算范围内', 
        time: '2023-12-05', 
        views: '6.5k' 
      }
    ],
    hotCases: [
      { 
        title: '学生党如何在半年内存够10000元', 
        time: '2023-11-28', 
        views: '5.2k' 
      },
      { 
        title: '如何避免成为月光族', 
        time: '2023-11-20', 
        views: '4.3k' 
      },
      { 
        title: '信用卡还款技巧，避免逾期', 
        time: '2023-11-15', 
        views: '3.8k' 
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 查看分类案例
   */
  viewCategory(e) {
    const category = e.currentTarget.dataset.category
    
    wx.showModal({
      title: '查看分类案例',
      content: `正在加载${category}分类的案例...`,
      showCancel: false
    })
  },

  /**
   * 查看案例详情
   */
  viewCase(e) {
    const index = e.currentTarget.dataset.index
    
    wx.showModal({
      title: '查看案例详情',
      content: `正在加载案例详情...`,
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
        content: `搜索关键词 "${searchText}" 找到 5 条相关案例`,
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
      title: '成功案例',
      desc: '查看他人的成功财务案例，学习经验',
      path: '/pages/success-stories/success-stories'
    }
  }
})