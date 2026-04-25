Page({
  /**
   * 页面的初始数据
   */
  data: {
    todayReminders: [
      { 
        title: '还款提醒', 
        description: '今天是信用卡还款日，请及时还款', 
        time: '18:00', 
        completed: false 
      },
      { 
        title: '消费提醒', 
        description: '今日消费已超过预算，请控制支出', 
        time: '14:30', 
        completed: true 
      }
    ],
    tomorrowReminders: [
      { 
        title: '还款提醒', 
        description: '明天是助学贷款还款日，请提前准备', 
        time: '10:00' 
      },
      { 
        title: '预算提醒', 
        description: '明日预算将更新，请查看', 
        time: '09:00' 
      }
    ],
    todoList: [
      { 
        title: '整理财务报表', 
        description: '整理本月财务报表，分析支出情况', 
        dueDate: '2023-12-15', 
        completed: false 
      },
      { 
        title: '制定下月预算', 
        description: '制定下月预算计划，控制消费', 
        dueDate: '2023-12-16', 
        completed: false 
      }
    ],
    selectedTime: '',
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
    const todayReminders = [...this.data.todayReminders]
    todayReminders[index].completed = !todayReminders[index].completed
    
    this.setData({
      todayReminders: todayReminders
    })
  },

  /**
   * 待办事项状态改变
   */
  onTodoChange(e) {
    const index = e.currentTarget.dataset.index
    const todoList = [...this.data.todoList]
    todoList[index].completed = e.detail.value[0] === 'true'
    
    this.setData({
      todoList: todoList
    })
  },

  /**
   * 时间选择改变
   */
  onTimeChange(e) {
    this.setData({
      selectedTime: e.detail.value
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
    
    if (!formData.title || !formData.description || !this.data.selectedTime || !this.data.selectedDate) {
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
        selectedTime: '',
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
      title: '每日提醒',
      desc: '管理每日财务提醒和待办事项',
      path: '/pages/daily-reminder/daily-reminder'
    }
  }
})