Page({
  /**
   * 页面的初始数据
   */
  data: {
    monthlyExpense: 3500,
    dailyExpense: 116.67,
    expenseGrowth: 12.5,
    budgetUsage: 87.5,
    expenseCategories: [
      { 
        name: '生活消费', 
        amount: 1500, 
        percentage: 42.86 
      },
      { 
        name: '学习费用', 
        amount: 800, 
        percentage: 22.86 
      },
      { 
        name: '娱乐支出', 
        amount: 700, 
        percentage: 20 
      },
      { 
        name: '其他支出', 
        amount: 500, 
        percentage: 14.28 
      }
    ],
    optimizationSuggestions: [
      '优化生活消费，减少不必要的开支',
      '控制娱乐支出，避免超出预算',
      '增加学习费用投入，提升自我价值',
      '合理规划其他支出，实现预算平衡'
    ],
    recentRecords: [
      { 
        name: '购买书籍', 
        date: '2023-12-15', 
        amount: 150 
      },
      { 
        name: '餐厅用餐', 
        date: '2023-12-14', 
        amount: 80 
      },
      { 
        name: '交通费', 
        date: '2023-12-13', 
        amount: 25 
      },
      { 
        name: '购物', 
        date: '2023-12-12', 
        amount: 300 
      }
    ],
    budgetTypes: ['生活消费', '学习费用', '娱乐支出', '其他支出'],
    budgetPeriods: ['每日', '每周', '每月'],
    selectedType: '',
    selectedPeriod: '',
    selectedDate: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 预算类型改变
   */
  onTypeChange(e) {
    const index = e.detail.value
    const budgetTypes = this.data.budgetTypes
    this.setData({
      selectedType: budgetTypes[index]
    })
  },

  /**
   * 预算周期改变
   */
  onPeriodChange(e) {
    const index = e.detail.value
    const budgetPeriods = this.data.budgetPeriods
    this.setData({
      selectedPeriod: budgetPeriods[index]
    })
  },

  /**
   * 提交预算
   */
  submitBudget(e) {
    const formData = e.detail.value
    
    if (!this.data.selectedType || !formData.amount || !this.data.selectedPeriod) {
      wx.showModal({
        title: '提示',
        content: '请填写完整的预算信息',
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
        content: '预算添加成功',
        showCancel: false
      })

      // 重置表单
      this.setData({
        selectedType: '',
        selectedPeriod: '',
        selectedDate: ''
      })

      // 清空表单
      const pages = getCurrentPages()
      const currentPage = pages[pages.length - 1]
      const form = currentPage.selectComponent('#budgetForm')
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
      title: '消费优化',
      desc: '管理和优化个人消费',
      path: '/pages/expense-optimization/expense-optimization'
    }
  }
})