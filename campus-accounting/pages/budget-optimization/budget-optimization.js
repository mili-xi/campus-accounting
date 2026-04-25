Page({
  /**
   * 页面的初始数据
   */
  data: {
    monthlyBudget: 5000,
    usedBudget: 4250,
    remainingBudget: 750,
    budgetUsage: 85,
    budgetCategories: [
      { 
        name: '生活消费', 
        usage: 90, 
        details: '已使用90%，超出预算' 
      },
      { 
        name: '学习费用', 
        usage: 75, 
        details: '已使用75%，在预算范围内' 
      },
      { 
        name: '娱乐支出', 
        usage: 80, 
        details: '已使用80%，接近预算上限' 
      },
      { 
        name: '其他支出', 
        usage: 60, 
        details: '已使用60%，在预算范围内' 
      }
    ],
    optimizationSuggestions: [
      '优化生活消费，减少不必要的开支',
      '控制娱乐支出，避免超出预算',
      '增加学习费用投入，提升自我价值',
      '合理规划其他支出，实现预算平衡'
    ],
    adjustmentTypes: ['增加预算', '减少预算', '调整预算分配'],
    selectedType: '',
    selectedDate: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 调整类型改变
   */
  onTypeChange(e) {
    const index = e.detail.value
    const adjustmentTypes = this.data.adjustmentTypes
    this.setData({
      selectedType: adjustmentTypes[index]
    })
  },

  /**
   * 提交调整
   */
  submitAdjustment(e) {
    const formData = e.detail.value
    
    if (!this.data.selectedType || !formData.amount || !formData.description) {
      wx.showModal({
        title: '提示',
        content: '请填写完整的调整信息',
        showCancel: false
      })
      return
    }

    wx.showLoading({
      title: '提交中'
    })

    setTimeout(() => {
      wx.hideLoading()
      wx.showModal({
        title: '提示',
        content: '预算调整成功',
        showCancel: false
      })

      // 重置表单
      this.setData({
        selectedType: '',
        selectedDate: ''
      })

      // 清空表单
      const pages = getCurrentPages()
      const currentPage = pages[pages.length - 1]
      const form = currentPage.selectComponent('#adjustmentForm')
      if (form) {
        form.reset()
      }
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
      title: '预算优化',
      desc: '管理和优化个人预算',
      path: '/pages/budget-optimization/budget-optimization'
    }
  }
})