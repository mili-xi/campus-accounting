Page({
  /**
   * 页面的初始数据
   */
  data: {
    showQuestions: false,
    showResults: false,
    currentQuestion: 1,
    totalQuestions: 5,
    currentQuestionData: {},
    answers: [],
    riskScore: 0,
    riskLevel: '',
    riskLevelText: '',
    riskDescription: '',
    riskSuggestions: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.initQuestions()
  },

  /**
   * 初始化测试题
   */
  initQuestions() {
    this.questions = [
      {
        question: '您是否经常使用信用卡或借贷服务？',
        options: ['从不使用', '偶尔使用', '经常使用', '频繁使用'],
        scores: [0, 1, 3, 5]
      },
      {
        question: '您的月收入是否能够覆盖当月所有支出？',
        options: ['完全能够覆盖', '基本能够覆盖', '勉强能够覆盖', '无法覆盖'],
        scores: [0, 1, 3, 5]
      },
      {
        question: '您是否有紧急备用金？',
        options: ['有，足够覆盖3个月以上支出', '有，但不够覆盖3个月支出', '很少有', '没有'],
        scores: [0, 1, 3, 5]
      },
      {
        question: '您是否有明确的财务目标和预算计划？',
        options: ['有详细的目标和计划', '有大致的目标和计划', '只有模糊的想法', '没有'],
        scores: [0, 1, 3, 5]
      },
      {
        question: '您是否了解校园贷的风险？',
        options: ['非常了解', '比较了解', '了解一些', '不了解'],
        scores: [0, 1, 3, 5]
      }
    ]
    
    this.setData({
      totalQuestions: this.questions.length,
      answers: new Array(this.questions.length).fill(null)
    })
  },

  /**
   * 开始测试
   */
  startTest() {
    this.setData({
      showQuestions: true,
      currentQuestion: 1,
      answers: new Array(this.questions.length).fill(null),
      showResults: false
    })
    this.loadCurrentQuestion()
  },

  /**
   * 加载当前问题
   */
  loadCurrentQuestion() {
    const question = this.questions[this.data.currentQuestion - 1]
    this.setData({
      currentQuestionData: question
    })
  },

  /**
   * 选择选项
   */
  selectOption(e) {
    const index = e.currentTarget.dataset.index
    const answers = [...this.data.answers]
    answers[this.data.currentQuestion - 1] = index
    this.setData({
      answers: answers
    })
  },

  /**
   * 上一题
   */
  prevQuestion() {
    if (this.data.currentQuestion > 1) {
      this.setData({
        currentQuestion: this.data.currentQuestion - 1
      })
      this.loadCurrentQuestion()
    }
  },

  /**
   * 下一题
   */
  nextQuestion() {
    if (this.data.currentQuestion < this.data.totalQuestions) {
      this.setData({
        currentQuestion: this.data.currentQuestion + 1
      })
      this.loadCurrentQuestion()
    }
  },

  /**
   * 提交测试
   */
  submitTest() {
    // 检查是否所有问题都已回答
    const allAnswered = this.data.answers.every(answer => answer !== null)
    if (!allAnswered) {
      wx.showModal({
        title: '提示',
        content: '请回答所有问题后再提交',
        showCancel: false
      })
      return
    }

    // 计算风险得分
    let totalScore = 0
    this.questions.forEach((question, index) => {
      var selectedIndex = this.data.answers[index]
      totalScore += question.scores[selectedIndex]
    })

    // 确定风险等级
    let riskLevel = 'low'
    let riskLevelText = '低风险'
    let riskDescription = '您的财务风险较低，但仍需注意合理规划财务'
    let riskSuggestions = [
      '继续保持良好的财务习惯',
      '定期检查和调整预算计划',
      '确保紧急备用金的充足性'
    ]

    if (totalScore > 15) {
      riskLevel = 'high'
      riskLevelText = '高风险'
      riskDescription = '您的财务风险较高，需要立即采取措施改善财务状况'
      riskSuggestions = [
        '立即评估和调整财务状况',
        '减少不必要的消费支出',
        '寻求专业的财务咨询帮助',
        '制定详细的还款计划',
        '避免高风险的借贷行为'
      ]
    } else if (totalScore > 8) {
      riskLevel = 'medium'
      riskLevelText = '中风险'
      riskDescription = '您的财务风险中等，需要注意财务规划和风险控制'
      riskSuggestions = [
        '加强财务规划和预算管理',
        '增加紧急备用金储备',
        '谨慎使用借贷服务',
        '定期检查财务状况'
      ]
    }

    this.setData({
      showQuestions: false,
      showResults: true,
      riskScore: totalScore,
      riskLevel: riskLevel,
      riskLevelText: riskLevelText,
      riskDescription: riskDescription,
      riskSuggestions: riskSuggestions
    })
  },

  /**
   * 重新测试
   */
  retryTest() {
    this.setData({
      showQuestions: false,
      showResults: false,
      currentQuestion: 1,
      answers: new Array(this.questions.length).fill(null),
      riskScore: 0,
      riskLevel: '',
      riskLevelText: '',
      riskDescription: '',
      riskSuggestions: []
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
      title: '风险测试',
      desc: '了解自己的财务风险状况',
      path: '/pages/risk-test/risk-test'
    }
  }
})