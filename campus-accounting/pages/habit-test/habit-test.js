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
    habitScore: 0,
    habitType: '',
    habitDescription: '',
    habitSuggestions: []
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
        question: '您购物时是否会提前列清单？',
        options: ['每次都会列清单', '经常会列清单', '偶尔会列清单', '从不列清单'],
        scores: [0, 1, 3, 5]
      },
      {
        question: '您是否会为了折扣而购买不需要的东西？',
        options: ['从不这样做', '很少这样做', '有时会这样做', '经常这样做'],
        scores: [0, 1, 3, 5]
      },
      {
        question: '您是否有明确的消费预算？',
        options: ['有详细的预算', '有大致的预算', '只有模糊的想法', '没有预算'],
        scores: [0, 1, 3, 5]
      },
      {
        question: '您是否会比较价格后再购买？',
        options: ['每次都会比较', '经常会比较', '偶尔会比较', '从不比较'],
        scores: [0, 1, 3, 5]
      },
      {
        question: '您是否会因为情绪而购物？',
        options: ['从不这样做', '很少这样做', '有时会这样做', '经常这样做'],
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

    // 计算习惯得分
    let totalScore = 0
    this.questions.forEach((question, index) => {
      var selectedIndex = this.data.answers[index]
      totalScore += question.scores[selectedIndex]
    })

    // 确定习惯类型
    let habitType = ''
    let habitTypeClass = ''
    let habitDescription = ''
    let habitSuggestions = []

    if (totalScore <= 5) {
      habitType = '理性型'
      habitTypeClass = 'rational'
      habitDescription = '您的消费习惯非常理性，能够理性规划和控制消费，是很好的理财习惯。'
      habitSuggestions = [
        '继续保持理性消费的习惯',
        '可以考虑适当增加一些享受型消费',
        '定期回顾消费习惯，保持良好的理财状态'
      ]
    } else if (totalScore <= 12) {
      habitType = '冲动型'
      habitTypeClass = 'impulsive'
      habitDescription = '您的消费习惯有些冲动，偶尔会因为情绪或折扣而购买不需要的东西，需要注意控制。'
      habitSuggestions = [
        '购物前先列清单，避免冲动消费',
        '遇到折扣时先考虑是否真正需要',
        '设定消费预算，严格控制开支'
      ]
    } else {
      habitType = '奢侈型'
      habitTypeClass = 'extravagant'
      habitDescription = '您的消费习惯较为奢侈，经常会为了享受而购买超出预算的东西，需要加强控制。'
      habitSuggestions = [
        '制定详细的消费预算',
        '购物时多比较价格，避免浪费',
        '培养储蓄习惯，为未来做打算',
        '定期反思消费行为，找出可优化的地方'
      ]
    }

    this.setData({
      showQuestions: false,
      showResults: true,
      habitScore: totalScore,
      habitType: habitType,
      habitTypeClass: habitTypeClass,
      habitDescription: habitDescription,
      habitSuggestions: habitSuggestions
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
      habitScore: 0,
      habitType: '',
      habitTypeClass: '',
      habitDescription: '',
      habitSuggestions: []
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
      title: '消费习惯测试',
      desc: '了解自己的消费习惯，培养健康的消费观',
      path: '/pages/habit-test/habit-test'
    }
  }
})