Page({
  /**
   * 页面的初始数据
   */
  data: {
    financialTools: [
      { 
        icon: '💰', 
        name: '收支管理', 
        description: '记录和管理个人收入和支出' 
      },
      { 
        icon: '📊', 
        name: '预算规划', 
        description: '制定和跟踪个人预算' 
      },
      { 
        icon: '📈', 
        name: '投资分析', 
        description: '分析和跟踪投资组合' 
      },
      { 
        icon: '💳', 
        name: '信用卡管理', 
        description: '管理和跟踪信用卡使用情况' 
      }
    ],
    calculators: [
      { 
        icon: '🧮', 
        name: '投资计算器', 
        description: '计算投资收益和风险' 
      },
      { 
        icon: '🏠', 
        name: '房贷计算器', 
        description: '计算房贷还款和利息' 
      },
      { 
        icon: '🚗', 
        name: '车贷计算器', 
        description: '计算车贷还款和利息' 
      },
      { 
        icon: '📱', 
        name: '货币计算器', 
        description: '计算不同货币之间的汇率' 
      }
    ],
    budgetTools: [
      { 
        icon: '📝', 
        name: '预算模板', 
        description: '提供个人预算模板' 
      },
      { 
        icon: '🎯', 
        name: '目标预算', 
        description: '制定和跟踪目标预算' 
      },
      { 
        icon: '🔍', 
        name: '预算分析', 
        description: '分析个人预算和支出' 
      },
      { 
        icon: '📅', 
        name: '预算日历', 
        description: '使用日历视图管理预算' 
      }
    ],
    investmentTools: [
      { 
        icon: '📚', 
        name: '投资指南', 
        description: '提供投资入门指南' 
      },
      { 
        icon: '📊', 
        name: '投资组合', 
        description: '管理个人投资组合' 
      },
      { 
        icon: '📈', 
        name: '市场分析', 
        description: '分析市场趋势和投资机会' 
      },
      { 
        icon: '📄', 
        name: '投资报告', 
        description: '生成个人投资报告' 
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 打开财务工具
   */
  openTool(e) {
    const index = e.currentTarget.dataset.index
    const tool = this.data.financialTools[index]
    
    wx.showModal({
      title: '打开工具',
      content: `正在打开 ${tool.name} 工具...`,
      showCancel: false
    })
  },

  /**
   * 打开计算器工具
   */
  openCalculator(e) {
    const index = e.currentTarget.dataset.index
    const calculator = this.data.calculators[index]
    
    wx.showModal({
      title: '打开计算器',
      content: `正在打开 ${calculator.name} 计算器...`,
      showCancel: false
    })
  },

  /**
   * 打开预算工具
   */
  openBudgetTool(e) {
    const index = e.currentTarget.dataset.index
    const budgetTool = this.data.budgetTools[index]
    
    wx.showModal({
      title: '打开预算工具',
      content: `正在打开 ${budgetTool.name} 工具...`,
      showCancel: false
    })
  },

  /**
   * 打开投资工具
   */
  openInvestmentTool(e) {
    const index = e.currentTarget.dataset.index
    const investmentTool = this.data.investmentTools[index]
    
    wx.showModal({
      title: '打开投资工具',
      content: `正在打开 ${investmentTool.name} 工具...`,
      showCancel: false
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
      title: '财务工具',
      desc: '提供各种财务工具和计算器',
      path: '/pages/financial-tools/financial-tools'
    }
  }
})