Page({
  /**
   * 页面的初始数据
   */
  data: {
    searchText: '',
    featuredCourses: [
      { 
        image: '📈', 
        title: '财务管理的基本原理', 
        summary: '了解财务管理的基本原理，掌握财务规划的核心方法', 
        time: '2023-12-15', 
        students: '1.2w' 
      },
      { 
        image: '💼', 
        title: '投资入门指南', 
        summary: '从零基础开始学习投资，掌握基本的投资技巧', 
        time: '2023-12-10', 
        students: '8.9k' 
      },
      { 
        image: '💰', 
        title: '债务管理的科学方法', 
        summary: '学习科学的债务管理方法，避免陷入债务危机', 
        time: '2023-12-05', 
        students: '6.5k' 
      }
    ],
    latestCourses: [
      { 
        title: '预算控制的实用技巧', 
        time: '2023-11-28', 
        students: '5.2k' 
      },
      { 
        title: '如何选择适合自己的投资产品', 
        time: '2023-11-20', 
        students: '4.3k' 
      },
      { 
        title: '个人财务规划的重要性', 
        time: '2023-11-15', 
        students: '3.8k' 
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 查看分类课程
   */
  viewCategory(e) {
    const category = e.currentTarget.dataset.category
    
    wx.showModal({
      title: '查看分类课程',
      content: `正在加载${category}分类的课程...`,
      showCancel: false
    })
  },

  /**
   * 查看课程详情
   */
  viewCourse(e) {
    const index = e.currentTarget.dataset.index
    
    wx.showModal({
      title: '查看课程详情',
      content: '正在加载课程详情...',
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
        content: `搜索关键词 "${searchText}" 找到 8 个相关课程`,
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
      title: '在线课程',
      desc: '学习财务管理、投资知识和债务管理的在线课程',
      path: '/pages/courses/courses'
    }
  }
})