Page({
  /**
   * ں--ҳ
   */
  onLoad: function(options) {
    console.log('repayment-plan ҳ')
  },

  /**
   * 页面的初始数?   */
  data: {
    debtAmount: '',
    interestRate: '',
    repaymentTerm: '',
    monthlyRepayment: '',
    showResult: false,
    estimatedTerm: 0,
    totalInterest: '',
    totalPayment: '',
    repaymentPlan: [],
    suggestions: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 债务金额输入
   */
  onDebtAmountInput: function(e) {
    this.setData({
      debtAmount: e.detail.value
    })
  },

  /**
   * 年利率输?   */
  onInterestRateInput: function(e) {
    this.setData({
      interestRate: e.detail.value
    })
  },

  /**
   * 还款期限输入
   */
  onRepaymentTermInput: function(e) {
    this.setData({
      repaymentTerm: e.detail.value
    })
  },

  /**
   * 每月还款能力输入
   */
  onMonthlyRepaymentInput: function(e) {
    this.setData({
      monthlyRepayment: e.detail.value
    })
  },

  /**
   * 生成功还款计划
   */
  generateRepaymentPlan: function() {
    const { debtAmount, interestRate, monthlyRepayment } = this.data
    
    // 验证输入
    if (!debtAmount || !interestRate || !monthlyRepayment) {
      wx.showToast({
        title: '请输入完整的债务信息',
        icon: 'none'
      })
      return
    }
    
    // 计算还款计划
    const [estimatedTerm, totalInterest, totalPayment, repaymentPlan, suggestions] = this.calculateRepaymentPlan(
      parseFloat(debtAmount), parseFloat(interestRate), parseFloat(monthlyRepayment)
    )
    
    this.setData({
      estimatedTerm: estimatedTerm,
      totalInterest: totalInterest.toFixed(2),
      totalPayment: totalPayment.toFixed(2),
      repaymentPlan: repaymentPlan,
      suggestions: suggestions,
      showResult: true
    })
  },

  /**
   * 计算还款计划
   */
  calculateRepaymentPlan: function(debtAmount, interestRate, monthlyRepayment) {
    const monthlyRate = interestRate / 100 / 12
    let remainingPrincipal = debtAmount
    let estimatedTerm = 0
    let totalInterest = 0
    let repaymentPlan = []
    let suggestions = []
    
    // 计算还款计划
    while (remainingPrincipal > 0) {
      estimatedTerm++
      const interest = remainingPrincipal * monthlyRate
      let principal = monthlyRepayment - interest
      
      if (principal <= 0) {
        principal = remainingPrincipal
        remainingPrincipal = 0
      } else {
        remainingPrincipal -= principal
      }
      
      totalInterest += interest
      
      repaymentPlan.push({
        period: estimatedTerm,
        payment: monthlyRepayment.toFixed(2),
        principal: principal.toFixed(2),
        interest: interest.toFixed(2),
        remaining: Math.max(remainingPrincipal.toFixed(2), 0)
      })
    }
    
    const totalPayment = debtAmount + totalInterest
    
    // 生成功优化建议
    suggestions = this.generateSuggestions(debtAmount, totalInterest, estimatedTerm, monthlyRepayment)
    
    return [estimatedTerm, totalInterest, totalPayment, repaymentPlan, suggestions]
  },

  /**
   * 生成功优化建议
   */
  generateSuggestions: function(debtAmount, totalInterest, estimatedTerm, monthlyRepayment) {
    const suggestions = []
    
    // 还款能力分析
    if (monthlyRepayment < debtAmount * 0.05) {
      suggestions.push('您的每月还款能力较低，建议增加收入或延长还款期限')
    } else if (monthlyRepayment < debtAmount * 0.1) {
      suggestions.push('您的每月还款能力适中，建议合理安排支出')
    } else {
      suggestions.push('您的每月还款能力较强，可以考虑缩短还款期限')
    }
    
    // 利息分析
    if (totalInterest > debtAmount * 0.3) {
      suggestions.push('总利息较高，建议考虑提前还款或寻找更低利率的贷款')
    }
    
    // 还款期限分析
    if (estimatedTerm > 36) {
      suggestions.push('还款期限较长，建议考虑增加每月还款金额')
    }
    
    // 其他建议
    suggestions.push('定期检查财务状况态况，及时调整还款计划')
    suggestions.push('建立紧急备用金额，应对突发情')
    suggestions.push('学习理财知识，提高财务素')
    
    return suggestions
  },

  /**
   * 重置表单
   */
  resetForm: function() {
    this.setData({
      debtAmount: '',
      interestRate: '',
      repaymentTerm: '',
      monthlyRepayment: '',
      showResult: false,
      estimatedTerm: 0,
      totalInterest: '',
      totalPayment: '',
      repaymentPlan: [],
      suggestions: []
    })
  },

  /**
   * 分享结果
   */
  shareResult: function() {
    const { estimatedTerm, totalInterest, totalPayment } = this.data
    
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    })
  },

  /**
   * 页面分享
   */
  onShareAppMessage: function() {
    const { estimatedTerm, totalInterest, totalPayment } = this.data
    
    return {
      title: `我的还款计划`,
      desc: `预计${estimatedTerm}个月还清，总利息${totalInterest}元，还款总额${totalPayment}元`,
      path: '/pages/repayment-plan/repayment-plan'
    }
  },

  /**
   * 分享到朋友圈
   */
  onShareTimeline: function() {
    const { estimatedTerm, totalInterest, totalPayment } = this.data
    
    return {
      title: `我的还款计划`,
      query: '',
      imageUrl: ''
    }
  }
})




