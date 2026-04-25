Page({
  /**
   * 页面的初始数据
   */
  data: {
    completedGoals: 2,
    inProgressGoals: 3,
    notStartedGoals: 1,
    totalGoals: 6,
    savingsGoals: [
      { 
        name: '购买新手机', 
        status: '进行中', 
        description: '购买一部新的智能手机', 
        progress: 75 
      },
      { 
        name: '旅游基金', 
        status: '进行中', 
        description: '攒钱去旅游', 
        progress: 40 
      },
      { 
        name: '学习课程', 
        status: '已完成', 
        description: '购买在线课程学习', 
        progress: 100 
      },
      { 
        name: '应急储备金', 
        status: '进行中', 
        description: '建立应急储备金', 
        progress: 60 
      },
      { 
        name: '投资基金', 
        status: '未开始', 
        description: '投资指数基金', 
        progress: 0 
      },
      { 
        name: '还清信用卡', 
        status: '已完成', 
        description: '还清所有信用卡债务', 
        progress: 100 
      }
    ],
    selectedDeadline: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 查看目标详情
   */
  viewGoalDetail(e) {
    const index = e.currentTarget.dataset.index
    const goal = this.data.savingsGoals[index]
    
    wx.showModal({
      title: '目标详情',
      content: `目标：${goal.name}\n描述：${goal.description}\n进度：${goal.progress}%\n状态：${goal.status}`,
      showCancel: false
    })
  },

  /**
   * 编辑目标
   */
  editGoal(e) {
    const index = e.currentTarget.dataset.index
    const goal = this.data.savingsGoals[index]
    
    wx.showModal({
      title: '编辑目标',
      content: `编辑目标：${goal.name}`,
      showCancel: false
    })
  },

  /**
   * 删除目标
   */
  deleteGoal(e) {
    const index = e.currentTarget.dataset.index
    const goal = this.data.savingsGoals[index]
    
    wx.showModal({
      title: '删除目标',
      content: `确定要删除目标：${goal.name}吗？`,
      success: (res) => {
        if (res.confirm) {
          var savingsGoals = [...this.data.savingsGoals]
          savingsGoals.splice(index, 1)
          
          var completedGoals = savingsGoals.filter(goal => goal.status === '已完成').length
          var inProgressGoals = savingsGoals.filter(goal => goal.status === '进行中').length
          var notStartedGoals = savingsGoals.filter(goal => goal.status === '未开始').length
          var totalGoals = savingsGoals.length
          
          this.setData({
            savingsGoals: savingsGoals,
            completedGoals: completedGoals,
            inProgressGoals: inProgressGoals,
            notStartedGoals: notStartedGoals,
            totalGoals: totalGoals
          })
          
          wx.showToast({
            title: '删除成功',
            icon: 'success'
          })
        }
      }
    })
  },

  /**
   * 目标期限选择
   */
  onDeadlineChange(e) {
    this.setData({
      selectedDeadline: e.detail.value
    })
  },

  /**
   * 提交目标
   */
  submitGoal(e) {
    const formData = e.detail.value
    
    if (!formData.name || !formData.description || !formData.amount || !this.data.selectedDeadline) {
      wx.showModal({
        title: '提示',
        content: '请填写完整的目标信息',
        showCancel: false
      })
      return
    }

    const newGoal = {
      name: formData.name,
      status: '未开始',
      description: formData.description,
      progress: 0
    }

    const savingsGoals = [...this.data.savingsGoals, newGoal]
    
    const completedGoals = savingsGoals.filter(goal => goal.status === '已完成').length
    const inProgressGoals = savingsGoals.filter(goal => goal.status === '进行中').length
    const notStartedGoals = savingsGoals.filter(goal => goal.status === '未开始').length
    const totalGoals = savingsGoals.length

    this.setData({
      savingsGoals: savingsGoals,
      completedGoals: completedGoals,
      inProgressGoals: inProgressGoals,
      notStartedGoals: notStartedGoals,
      totalGoals: totalGoals,
      selectedDeadline: ''
    })

    wx.showModal({
      title: '提示',
      content: '目标添加成功',
      showCancel: false
    })

    // 重置表单
    const pages = getCurrentPages()
    const currentPage = pages[pages.length - 1]
    const form = currentPage.selectComponent('#goalForm')
    if (form) {
      form.reset()
    }
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
      title: '储蓄目标',
      desc: '管理个人储蓄目标',
      path: '/pages/savings-goals/savings-goals'
    }
  }
})