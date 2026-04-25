Page({
  /**
   * ں--ҳ
   */
  onLoad: function(options) {
    console.log('debt-calculator ҳ')
  },

  /**
   * 页面的初始数?   */
  data: {
    debtAmount: '',
    interestRate: '',
    repaymentTerm: '',
    repaymentType: 0,
    repaymentTypes: ['等额本息', '等额本金额', '一次性还款'],
    showResult: false,
    monthlyPayment: '',
    totalInterest: '',
    totalPayment: '',
    repaymentPlan: []
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
   * 还款方式选择
   */
  onRepaymentTypeChange: function(e) {
    this.setData({
      repaymentType: parseInt(e.detail.value)
    })
  },

  /**
   * 计算债务
   */
  calculateDebt: function() {
    const { debtAmount, interestRate, repaymentTerm, repaymentType } = this.data
    
    // 验证输入
    if (!debtAmount || !interestRate || !repaymentTerm) {
      wx.showToast({
        title: '请输入完整的债务信息',
        icon: 'none'
      })
      return
    }
    
    // 计算还款计划
    let monthlyPayment, totalInterest, totalPayment, repaymentPlan
    
    switch (repaymentType) {
      case 0: // 等额本息
        [monthlyPayment, totalInterest, totalPayment, repaymentPlan] = this.calculateEqualPrincipalAndInterest(
          parseFloat(debtAmount), parseFloat(interestRate), parseInt(repaymentTerm)
        )
        break
      case 1: // 等额本金额
        [monthlyPayment, totalInterest, totalPayment, repaymentPlan] = this.calculateEqualPrincipal(
          parseFloat(debtAmount), parseFloat(interestRate), parseInt(repaymentTerm)
        )
        break
      case 2: // 一次性还款
        [monthlyPayment, totalInterest, totalPayment, repaymentPlan] = this.calculateOneTimePayment(
          parseFloat(debtAmount), parseFloat(interestRate), parseInt(repaymentTerm)
        )
        break
    }
    
    this.setData({
      monthlyPayment: monthlyPayment.toFixed(2),
      totalInterest: totalInterest.toFixed(2),
      totalPayment: totalPayment.toFixed(2),
      repaymentPlan: repaymentPlan,
      showResult: true
    })
  },

  /**
   * 等额本息计算
   */
  calculateEqualPrincipalAndInterest: function(debtAmount, interestRate, repaymentTerm) {
    const monthlyRate = interestRate / 100 / 12
    const monthlyPayment = debtAmount * monthlyRate * Math.pow(1 + monthlyRate, repaymentTerm) / (Math.pow(1 + monthlyRate, repaymentTerm) - 1)
    const totalPayment = monthlyPayment * repaymentTerm
    const totalInterest = totalPayment - debtAmount
    
    const repaymentPlan = []
    let remainingPrincipal = debtAmount
    
    for (let i = 1; i <= repaymentTerm; i++) {
      const interest = remainingPrincipal * monthlyRate
      const principal = monthlyPayment - interest
      remainingPrincipal -= principal
      
      repaymentPlan.push({
        period: i,
        payment: monthlyPayment.toFixed(2),
        principal: principal.toFixed(2),
        interest: interest.toFixed(2),
        remaining: Math.max(remainingPrincipal.toFixed(2), 0)
      })
    }
    
    return [monthlyPayment, totalInterest, totalPayment, repaymentPlan]
  },

  /**
   * 等额本金额计算
   */
  calculateEqualPrincipal: function(debtAmount, interestRate, repaymentTerm) {
    const monthlyPrincipal = debtAmount / repaymentTerm
    const monthlyRate = interestRate / 100 / 12
    
    const repaymentPlan = []
    let remainingPrincipal = debtAmount
    let totalPayment = 0
    let totalInterest = 0
    
    for (let i = 1; i <= repaymentTerm; i++) {
      const interest = remainingPrincipal * monthlyRate
      const payment = monthlyPrincipal + interest
      remainingPrincipal -= monthlyPrincipal
      
      totalPayment += payment
      totalInterest += interest
      
      repaymentPlan.push({
        period: i,
        payment: payment.toFixed(2),
        principal: monthlyPrincipal.toFixed(2),
        interest: interest.toFixed(2),
        remaining: Math.max(remainingPrincipal.toFixed(2), 0)
      })
    }
    
    const monthlyPayment = repaymentPlan[0].payment // 首月还款?    
    return [parseFloat(monthlyPayment), totalInterest, totalPayment, repaymentPlan]
  },

  /**
   * 一次性还款款计?   */
  calculateOneTimePayment: function(debtAmount, interestRate, repaymentTerm) {
    const totalInterest = debtAmount * (interestRate / 100) * (repaymentTerm / 12)
    const totalPayment = debtAmount + totalInterest
    
    const repaymentPlan = [
      {
        period: 1,
        payment: totalPayment.toFixed(2),
        principal: debtAmount.toFixed(2),
        interest: totalInterest.toFixed(2),
        remaining: '0'
      }
    ]
    
    return [totalPayment, totalInterest, totalPayment, repaymentPlan]
  },

  /**
   * 重置表单
   */
  resetForm: function() {
    this.setData({
      debtAmount: '',
      interestRate: '',
      repaymentTerm: '',
      repaymentType: 0,
      showResult: false,
      monthlyPayment: '',
      totalInterest: '',
      totalPayment: '',
      repaymentPlan: []
    })
  },

  /**
   * 分享结果
   */
  shareResult: function() {
    const { monthlyPayment, totalInterest, totalPayment, repaymentTerm } = this.data
    
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    })
  },

  /**
   * 页面分享
   */
  onShareAppMessage: function() {
    const { monthlyPayment, totalInterest, totalPayment, repaymentTerm } = this.data
    
    return {
      title: `我的债务计算结果`,
      desc: `每月还款${monthlyPayment}元，总利息${totalInterest}元，${repaymentTerm}期`,
      path: '/pages/debt-calculator/debt-calculator'
    }
  },

  /**
   * 分享到朋友圈
   */
  onShareTimeline: function() {
    const { monthlyPayment, totalInterest, totalPayment, repaymentTerm } = this.data
    
    return {
      title: `我的债务计算结果`,
      query: '',
      imageUrl: ''
    }
  }
})




