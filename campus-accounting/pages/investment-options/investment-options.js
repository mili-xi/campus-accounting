Page({
  /**
   * 页面的初始数据
   */
  data: {
    investmentCategories: [
      { 
        icon: '💰', 
        name: '股票', 
        description: '股票投资产品' 
      },
      { 
        icon: '📊', 
        name: '基金', 
        description: '基金投资产品' 
      },
      { 
        icon: '📈', 
        name: '债券', 
        description: '债券投资产品' 
      },
      { 
        icon: '💳', 
        name: '理财产品', 
        description: '银行理财产品' 
      }
    ],
    popularProducts: [
      { 
        icon: '🎯', 
        name: '指数基金', 
        description: '跟踪市场指数的基金产品', 
        type: '基金', 
        rating: 4.8, 
        users: 5678 
      },
      { 
        icon: '🚀', 
        name: '科技股票', 
        description: '科技行业股票投资产品', 
        type: '股票', 
        rating: 4.5, 
        users: 3456 
      },
      { 
        icon: '🌟', 
        name: '理财产品', 
        description: '低风险银行理财产品', 
        type: '理财产品', 
        rating: 4.6, 
        users: 7890 
      }
    ],
    newProducts: [
      { 
        icon: '📚', 
        name: '新基金', 
        description: '最新发行的基金产品', 
        type: '基金', 
        rating: 4.7, 
        users: 1234 
      },
      { 
        icon: '💡', 
        name: '创新产品', 
        description: '创新型投资产品', 
        type: '理财产品', 
        rating: 4.9, 
        users: 2345 
      },
      { 
        icon: '🔍', 
        name: '海外投资', 
        description: '海外市场投资产品', 
        type: '股票', 
        rating: 4.4, 
        users: 3456 
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
   * 打开投资产品分类
   */
  openCategory(e) {
    const index = e.currentTarget.dataset.index
    const category = this.data.investmentCategories[index]
    
    wx.showModal({
      title: '打开投资产品分类',
      content: `正在打开 ${category.name} 分类...`,
      showCancel: false
    })
  },

  /**
   * 打开热门投资产品
   */
  openProduct(e) {
    const index = e.currentTarget.dataset.index
    const product = this.data.popularProducts[index]
    
    wx.showModal({
      title: '打开投资产品',
      content: `正在打开 ${product.name} 产品...`,
      showCancel: false
    })
  },

  /**
   * 打开最新投资产品
   */
  openNewProduct(e) {
    const index = e.currentTarget.dataset.index
    const product = this.data.newProducts[index]
    
    wx.showModal({
      title: '打开最新投资产品',
      content: `正在打开 ${product.name} 产品...`,
      showCancel: false
    })
  },

  /**
   * 搜索投资产品
   */
  searchProducts() {
    const searchText = this.data.searchText.trim()
    if (!searchText) {
      wx.showModal({
        title: '搜索投资产品',
        content: '请输入搜索关键词',
        showCancel: false
      })
      return
    }
    
    wx.showModal({
      title: '搜索投资产品',
      content: `正在搜索包含 "${searchText}" 的投资产品...`,
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
      title: '投资选项',
      desc: '提供各种投资产品和投资建议',
      path: '/pages/investment-options/investment-options'
    }
  }
})