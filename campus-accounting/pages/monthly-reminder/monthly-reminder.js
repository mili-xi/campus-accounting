Page({
  /**
   * 页面的初始数据
   */
  data: {
    monthReminders: [
      { 
        title: '还款提醒', 
        description: '本月是助学贷款还款日，请及时还款', 
        date: '2023-12-25', 
        completed: false 
      },
      { 
        title: '预算提醒', 
        description: '本月预算已使用85%，请控制支出', 
        date: '2023-12-20', 
        completed: true 
      }
    ],
    nextMonthReminders: [
      { 
        title: '还款提醒', 
        description: '下月是信用卡还款日，请提前准备', 
        date: '2024-01-05' 
      },
      { 
        title: '预算提醒', 
        description: '下月预算将更新，请查看', 
        date: '2024-01-01' 
      }
    ],
    monthlyExpense: 3500,
    monthlyIncome: 5000,
    monthlyBalance: 1500,
    budgetUsage: 85,
    selectedDate: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 标记为已完成
   */
  markAsCompleted(e) {
    const index = e.currentTarget.dataset.index
    const monthReminders = [...this.data.monthReminders]
    monthReminders[index].completed = !monthReminders[index].completed
    
    this.setData({
      monthReminders: monthReminders
    })
  },

  /**
   * 查看详情
   */
  viewDetail() {
    wx.showModal({
      title: '月度详情',
      content: '查看月度详细数据',
      showCancel: false
    })
  },

  /**
   * 日期选择改变
   */
  onDateChange(e) {
    this.setData({
      selectedDate: e.detail.value
    })
  },

  /**
   * 提交提醒
   */
  submitReminder(e) {
    const formData = e.detail.value
    
    if (!formData.title || !formData.description || !this.data.selectedDate) {
      wx.showModal({
        title: '提示',
        content: '请填写完整的提醒信息',
        showCancel: false
      })
      return
    }

    wx.showLoading({
      title: '添加中'
    })

    setTimeout(() => {
      wx.hideLoading()
      wx.showModal({
        title: '提示',
        content: '提醒添加成功',
        showCancel: false
      })

      // 重置表单
      this.setData({
        selectedDate: ''
      })

      // 清空表单
      const pages = getCurrentPages()
      const currentPage = pages[pages.length - 1]
      const form = currentPage.selectComponent('#reminderForm')
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
      title: '每月提醒',
      desc: '管理每月财务提醒和月度总结',
      path: '/pages/monthly-reminder/monthly-reminder'
    }
  }
})