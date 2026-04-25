Page({
  /**
   * 页面的初始数据
   */
  data: {
    reportDate: '',
    creditScore: 0,
    scoreDescription: '',
    scoreSuggestion: '',
    totalIncome: 0,
    totalExpense: 0,
    balance: 0,
    expenseRatio: 0,
    monthlyBudget: 0,
    usedBudget: 0,
    remainingBudget: 0,
    budgetUsage: 0,
    monthlyTrend: 0,
    weeklyTrend: 0,
    dailyAverage: 0,
    hasRisks: false,
    risks: [],
    moneySavingTips: [],
    habitSuggestions: [],
    topExpenseCategories: [],
    monthlySummary: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    
    // 初始化报告数?    this.initReportData()
  },

  /**
   * 初始化报告数?   */
  initReportData: function() {
    // 设置报告日期（当前月份）
    var now = new Date()
    var year = now.getFullYear()
    var month = now.getMonth() + 1
    var reportDate = `${year}年${month}月财务报告`
    
    // 计算财务数据（模拟数据）
    const totalIncome = 2000
    const totalExpense = 1500
    const balance = totalIncome - totalExpense
    const expenseRatio = Math.round((totalExpense / totalIncome) * 100)
    
    // 预算数据
    const monthlyBudget = 1800
    const usedBudget = 1500
    const remainingBudget = monthlyBudget - usedBudget
    const budgetUsage = Math.round((usedBudget / monthlyBudget) * 100)
    
    // 消费趋势数据
    const monthlyTrend = -5 // 环比上月下降5%
    const weeklyTrend = 2 // 环比上周上升2%
    const dailyAverage = Math.round(totalExpense / (now.getDate()))
    
    // 借贷健康度评?    const creditScore = 85
    let scoreDescription = ''
    let scoreSuggestion = ''
    
    if (creditScore >= 90) {
      scoreDescription = '您的借贷健康度非常优秀！继续保持良好的财务习惯'
      scoreSuggestion = '建议：继续保持理性消费，合理规划财务，定期检查信用卡卡记录'
    } else if (creditScore >= 80) {
      scoreDescription = '您的借贷健康度良好！财务状况态况稳定，但仍有提升空间'
      scoreSuggestion = '建议：适当控制消费，增加储蓄，建立紧急备用金额'
    } else if (creditScore >= 70) {
      scoreDescription = '您的借贷健康度一般！需要关注财务状况态况，避免风险'
      scoreSuggestion = '建议：制定详细的预算计划，控制不必要的消费，避免借贷'
    } else {
      scoreDescription = '您的借贷健康度较差！财务状况态况存在较高风险险'
      scoreSuggestion = '建议：立即评估财务状况态况，制定还款计划，避免进一步陷入债务'
    }
    
    // 风险识别
    const hasRisks = false
    const risks = [
      '您的消费超出预算20%，需要控制支出',
      '本月多次超支消费，建议优化消费习惯',
      '您的储蓄率低于0%，需要增加储蓄'
    ]
    
    // 省钱建议
    const moneySavingTips = [
      '减少外卖次数，尝试自己做',
      '购物前制定清单，避免冲动消费',
      '取消不需要的订阅服务',
      '使用优惠券和促销活动',
      '合理规划交通通通费'
    ]
    
    // 消费习惯改善建议
    const habitSuggestions = [
      '每天记录消费，及时发现问',
      '每周复盘消费情况，调整预',
      '设置消费提醒，避免超',
      '学习理财知识，提高财务素',
      '建立储蓄目标，定期储'
    ]
    
    // 消费分类分析
    const topExpenseCategories = [
      { category: '餐饮', percentage: 35 },
      { category: '交通通', percentage: 15 },
      { category: '购物', percentage: 20 },
      { category: '娱乐', percentage: 10 },
      { category: '其他', percentage: 20 }
    ]
    
    // 生成本月总结
    const monthlySummary = this.generateMonthlySummary(creditScore, totalIncome, totalExpense, balance, budgetUsage)
    
    this.setData({
      reportDate,
      creditScore,
      scoreDescription,
      scoreSuggestion,
      totalIncome,
      totalExpense,
      balance,
      expenseRatio,
      monthlyBudget,
      usedBudget,
      remainingBudget,
      budgetUsage,
      monthlyTrend,
      weeklyTrend,
      dailyAverage,
      hasRisks,
      risks,
      moneySavingTips,
      habitSuggestions,
      topExpenseCategories,
      monthlySummary
    })
  },

  /**
   * 查看评分详情
   */
  viewScoreDetails: function() {
    wx.showModal({
      title: '评分详情',
      content: '借贷健康度评分根据您的消费行为、还款记录、预算执行情况等多维度数据计算得出',
      showCancel: false
    })
  },

  /**
   * 查看风险详情
   */
  viewRiskDetails: function() {
    wx.showModal({
      title: '风险详情',
      content: '风险识别功能正在开发发中，敬请期待！',
      showCancel: false
    })
  },

  /**
   * 分享到微信朋友
   */
  shareToWechat: function() {
    this.onShareAppMessage()
  },

  /**
   * 分享到微信朋友圈
   */
  shareToWeibo: function() {
    this.onShareTimeline()
  },

  /**
   * 保存到相册
   */
  saveToAlbum: function() {
    // 截图当前页面并保存到相册
    wx.showToast({
      title: '正在生成报告图片...',
      icon: 'loading',
      duration: 1000
    })
    
    // 模拟生成图片
    setTimeout(() => {
      wx.saveImageToPhotosAlbum({
        filePath: '', // 需要先获取截图的临时路径
        success: function() {
          wx.showToast({
            title: '保存成功',
            icon: 'success'
          })
        },
        fail: function() {
          wx.showModal({
            title: '保存失败',
            content: '无法获取当前页面截图',
            showCancel: false
          })
        }
      })
    }, 1000)
  },

  /**
   * 导出PDF
   */
  exportPDF: function() {
    // 将报告内容转换为PDF格式
    var reportContent = this.generateReportContent()
    
    // 模拟生成PDF文件
    wx.showModal({
      title: '导出PDF',
      content: 'PDF导出功能正在开发中，敬请期待！\n\n当前报告内容已生成，可以截图保存',
      showCancel: false
    })
  },

  /**
   * 导出Excel
   */
  exportExcel: function() {
    // 将财务数据转换为Excel格式
    var reportData = this.generateReportData()
    
    // 模拟生成Excel文件
    wx.showModal({
      title: '导出Excel',
      content: 'Excel导出功能正在开发中，敬请期待！\n\n当前财务数据已准备好，可以截图保存',
      showCancel: false
    })
  },

  /**
   * 导出图片
   */
  exportImage: function() {
    this.saveToAlbum()
  },

  /**
   * 生成报告内容
   */
  generateReportContent: function() {
    return `
${this.data.reportDate}

借贷健康度评分：${this.data.creditScore}分
${this.data.scoreDescription}
${this.data.scoreSuggestion}

=== 财务概览 ===
总收入：${this.data.totalIncome}元
总支出：${this.data.totalExpense}元
结余：${this.data.balance}元
支出比率：${this.data.expenseRatio}%

=== 预算执行 ===
月度预算：${this.data.monthlyBudget}元
已用预算：${this.data.usedBudget}元
剩余预算：${this.data.remainingBudget}元
预算使用率：${this.data.budgetUsage}%

=== 消费趋势 ===
月度趋势：${this.data.monthlyTrend > 0 ? '上升' : '下降'}${Math.abs(this.data.monthlyTrend)}%
周度趋势：${this.data.weeklyTrend > 0 ? '上升' : '下降'}${Math.abs(this.data.weeklyTrend)}%
日均消费：${this.data.dailyAverage}元

=== 风险识别 ===
${this.data.hasRisks ? this.data.risks.join('\n') : '无风险'}

=== 消费分类 ===
${this.data.topExpenseCategories.map(item => `${item.category}：${item.percentage}%`).join('\n')}

=== 省钱建议 ===
${this.data.moneySavingTips.join('\n')}

=== 习惯改善 ===
${this.data.habitSuggestions.join('\n')}
    `.trim()
  },

  /**
   * 生成本月总结
   */
  generateMonthlySummary: function(creditScore, totalIncome, totalExpense, balance, budgetUsage) {
    let summary = '本月您的财务状况'
    
    if (creditScore >= 90) {
      summary += '非常优秀！'
    } else if (creditScore >= 80) {
      summary += '良好！'
    } else if (creditScore >= 70) {
      summary += '一般，需要关注！'
    } else {
      summary += '较差，需要立即改善！'
    }
    
    summary += `您本月收入${totalIncome}元，支出${totalExpense}元，`
    
    if (balance > 0) {
      summary += `结余${balance}元，`
    } else {
      summary += `赤字${Math.abs(balance)}元，`
    }
    
    summary += `预算使用率${budgetUsage}%。`
    
    if (budgetUsage > 100) {
      summary += '您的支出已经超出预算，需要控制消费。'
    } else if (budgetUsage >= 90) {
      summary += '您的预算已经接近用完，需要注意控制消费。'
    } else if (budgetUsage <= 50) {
      summary += '您的预算使用控制得很好，可以考虑适当增加储蓄。'
    }
    
    return summary
  },

  /**
   * 生成报告数据
   */
  generateReportData: function() {
    return {
      报告日期: this.data.reportDate,
      借贷健康度评分: this.data.creditScore,
      评分描述: this.data.scoreDescription,
      评分建议: this.data.scoreSuggestion,
      总收入: this.data.totalIncome,
      总支出: this.data.totalExpense,
      结余: this.data.balance,
      支出比率: this.data.expenseRatio,
      月度预算: this.data.monthlyBudget,
      已用预算: this.data.usedBudget,
      剩余预算: this.data.remainingBudget,
      预算使用率: this.data.budgetUsage,
      月度趋势: this.data.monthlyTrend,
      周度趋势: this.data.weeklyTrend,
      日均消费: this.data.dailyAverage,
      风险识别: this.data.risks,
      消费分类: this.data.topExpenseCategories,
      省钱建议: this.data.moneySavingTips,
      习惯改善: this.data.habitSuggestions
    }
  },

  /**
   * 查看历史报告
   */
  viewHistory: function() {
    wx.showModal({
      title: '历史报告',
      content: '历史报告功能正在开发发中，敬请期待！',
      showCancel: false
    })
  },

  /**
   * 完成功阅读
   */
  finishReading: function() {
    wx.showToast({
      title: '阅读完成功',
      icon: 'success',
      duration: 1000
    })
    
    // 延迟返回首页
    setTimeout(() => {
      wx.navigateBack()
    }, 1000)
  },

  /**
   * 页面分享
   */
  onShareAppMessage: function() {
    const { creditScore, totalIncome, totalExpense, balance, budgetUsage } = this.data
    
    return {
      title: `我的月度财务报告 - 借贷健康度${creditScore}分`,
      desc: `收入${totalIncome}元，支出${totalExpense}元，结余${balance}元，预算使用率${budgetUsage}%`,
      path: '/pages/monthly-report/monthly-report'
    }
  },

  /**
   * 分享到朋友圈
   */
  onShareTimeline: function() {
    const { creditScore, totalIncome, totalExpense, balance, budgetUsage } = this.data
    
    return {
      title: `我的月度财务报告 - 借贷健康度${creditScore}分`,
      query: '',
      imageUrl: ''
    }
  },

  /**
   * 显示分享菜单
   */
  showShareMenu: function() {
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    })
  }
})




