Page({
  /**
   * 页面的初始数据
   */
  data: {
    currentScore: 85,
    targetScore: 95,
    scoreDifference: 10,
    improvementPlans: [
      { 
        title: '优化还款计划', 
        progress: 75, 
        description: '制定详细的还款计划，确保按时还款，避免逾期', 
        actionText: '查看详情' 
      },
      { 
        title: '控制消费', 
        progress: 60, 
        description: '合理规划消费，避免冲动消费，减少不必要的开支', 
        actionText: '查看详情' 
      },
      { 
        title: '增加收入来源', 
        progress: 40, 
        description: '寻找兼职或其他收入来源，增加经济收入', 
        actionText: '查看详情' 
      }
    ],
    dailyTasks: [
      { 
        title: '查看当天消费记录', 
        description: '核对当天的消费记录，确保没有错误', 
        completed: true 
      },
      { 
        title: '制定次日消费计划', 
        description: '规划次日的消费，避免冲动消费', 
        completed: false 
      },
      { 
        title: '检查还款提醒', 
        description: '查看是否有即将到期的还款提醒', 
        completed: false 
      }
    ],
    taskCompletionRate: 33,
    dailyProgress: 0.3,
    estimatedCompletionTime: '30天'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 查看计划详情
   */
  viewPlanDetail(e) {
    const index = e.currentTarget.dataset.index
    const plan = this.data.improvementPlans[index]
    
    wx.showModal({
      title: plan.title,
      content: plan.description,
      showCancel: false
    })
  },

  /**
   * 任务状态改变
   */
  onTaskChange(e) {
    const index = e.currentTarget.dataset.index
    const dailyTasks = [...this.data.dailyTasks]
    dailyTasks[index].completed = e.detail.value[0] === 'true'
    
    this.setData({
      dailyTasks: dailyTasks
    })
    
    // 计算任务完成率
    this.calculateTaskCompletionRate()
  },

  /**
   * 计算任务完成率
   */
  calculateTaskCompletionRate() {
    const completedTasks = this.data.dailyTasks.filter(task => task.completed).length
    const totalTasks = this.data.dailyTasks.length
    const completionRate = Math.round((completedTasks / totalTasks) * 100)
    
    this.setData({
      taskCompletionRate: completionRate
    })
  },

  /**
   * 查看进度
   */
  viewProgress() {
    wx.showModal({
      title: '进度详情',
      content: '您的评分已从 80 分提升到 85 分，还需要 10 分才能达到目标',
      showCancel: false
    })
  },

  /**
   * 生成报告
   */
  generateReport() {
    wx.showLoading({
      title: '生成报告中'
    })
    
    setTimeout(() => {
      wx.hideLoading()
      wx.showModal({
        title: '报告生成成功',
        content: '您的改进计划报告已生成，是否需要发送到邮箱？',
        success: res => {
          if (res.confirm) {
            wx.showToast({
              title: '发送成功',
              icon: 'success'
            })
          }
        }
      })
    }, 2000)
  },

  /**
   * 分享计划
   */
  sharePlan() {
    const { currentScore, targetScore, scoreDifference } = this.data
    
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
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
    const { currentScore, targetScore, scoreDifference } = this.data
    
    return {
      title: '我的改进计划',
      desc: `当前评分 ${currentScore} 分，目标评分 ${targetScore} 分，还差 ${scoreDifference} 分`,
      path: '/pages/improvement-plan/improvement-plan'
    }
  },

  /**
   * 分享到朋友圈
   */
  onShareTimeline() {
    const { currentScore, targetScore, scoreDifference } = this.data
    
    return {
      title: `我的改进计划：${currentScore}分→${targetScore}分`,
      query: '',
      imageUrl: ''
    }
  }
})