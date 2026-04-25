Page({
  /**
   * ں--ҳ
   */
  onLoad: function(options) {
    console.log('quiz ҳ')
  },

  /**
   * 页面的初始数?   */
  data: {
    questions: [
      {
        question: '什么是校园贷？',
        options: [
          '专门面向在校大学生的贷款业务',
          '校园内的小卖部贷',
          '学校提供的助学贷',
          '大学生之间的借款'
        ],
        correctAnswer: 0
      },
      {
        question: '校园贷的常见风险有哪些？',
        options: [
          '高利息、暴力催',
          '低利息、无风险',
          '快速放款、手续简',
          '免息、无担保'
        ],
        correctAnswer: 0
      },
      {
        question: '如何识别非法校园贷？',
        options: [
          '无需任何担保，仅凭身份证就能贷款',
          '需要提供学生证和家长担',
          '利率符合国家规定',
          '有正规金额融机构资'
        ],
        correctAnswer: 0
      },
      {
        question: '遇到校园贷问题应该怎么办？',
        options: [
          '及时与家人、老师沟',
          '隐瞒事实，自行处',
          '继续借款偿还',
          '逃避责任，不接电'
        ],
        correctAnswer: 0
      },
      {
        question: '大学生应该如何保护自己？',
        options: [
          '树立正确的消费观，拒绝非法贷',
          '盲目攀比，追求高消',
          '随意泄露个人信息',
          '参与校园贷活'
        ],
        correctAnswer: 0
      }
    ],
    currentQuestion: 0,
    selectedOption: null,
    score: 0,
    progress: 0,
    showResult: false,
    resultDescription: '',
    wrongQuestions: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    
    // 计算初始进度
    const progress = (1 / this.data.questions.length) * 100
    this.setData({
      progress: progress
    })
  },

  /**
   * 选择选项
   */
  selectOption: function(e) {
    const index = e.currentTarget.dataset.index
    this.setData({
      selectedOption: index
    })
  },

  /**
   * 提交通答案
   */
  submitAnswer: function() {
    const { questions, currentQuestion, selectedOption } = this.data
    
    // 检查答案是否正?    const isCorrect = selectedOption === questions[currentQuestion].correctAnswer
    if (isCorrect) {
      this.setData({
        score: this.data.score + 20
      })
    } else {
      // 记录错题
      const wrongQuestions = [...this.data.wrongQuestions]
      wrongQuestions.push({
        question: questions[currentQuestion].question,
        selectedAnswer: questions[currentQuestion].options[selectedOption],
        correctAnswer: questions[currentQuestion].options[questions[currentQuestion].correctAnswer]
      })
      this.setData({
        wrongQuestions: wrongQuestions
      })
    }
    
    // 进入下一题
    if (currentQuestion < questions.length - 1) {
      const nextQuestion = currentQuestion + 1
      const progress = ((nextQuestion + 1) / questions.length) * 100
      this.setData({
        currentQuestion: nextQuestion,
        selectedOption: null,
        progress: progress
      })
    } else {
      // 显示测验结果
      this.showQuizResult()
    }
  },

  /**
   * 跳过此题
   */
  skipQuestion: function() {
    const { questions, currentQuestion } = this.data
    
    if (currentQuestion < questions.length - 1) {
      const nextQuestion = currentQuestion + 1
      const progress = ((nextQuestion + 1) / questions.length) * 100
      this.setData({
        currentQuestion: nextQuestion,
        selectedOption: null,
        progress: progress
      })
    } else {
      // 显示测验结果
      this.showQuizResult()
    }
  },

  /**
   * 显示测验结果
   */
  showQuizResult: function() {
    const { score } = this.data
    let resultDescription = ''
    
    if (score >= 80) {
      resultDescription = '您对校园贷风险的了解程度很高，能够正确识别和应对校园贷风险'
    } else if (score >= 60) {
      resultDescription = '您对校园贷风险有一定的了解，但仍需要进一步学习和提高'
    } else {
      resultDescription = '您对校园贷风险的了解程度较低，需要加强学习，提高风险险防范意识'
    }
    
    this.setData({
      showResult: true,
      resultDescription: resultDescription
    })
  },

  /**
   * 查看结果
   */
  viewResult: function() {
    this.showQuizResult()
  },

  /**
   * 重新测验
   */
  restartQuiz: function() {
    this.setData({
      currentQuestion: 0,
      selectedOption: null,
      score: 0,
      progress: (1 / this.data.questions.length) * 100,
      showResult: false,
      resultDescription: '',
      wrongQuestions: []
    })
  },

  /**
   * 查看错题
   */
  viewWrongQuestions: function() {
    if (this.data.wrongQuestions.length === 0) {
      wx.showToast({
        title: '您答对了所有题目！',
        icon: 'success',
        duration: 2000
      })
      return
    }
    
    const wrongQuestions = this.data.wrongQuestions.map((item, index) => {
      return `${index + 1}. ${item.question}\n您选择了：${item.selectedAnswer}\n正确答案：${item.correctAnswer}`
    }).join('\n\n')
    
    wx.showModal({
      title: '错题回顾',
      content: wrongQuestions,
      showCancel: false,
      confirmText: '知道'
    })
  },

  /**
   * 分享结果
   */
  shareResult: function() {
    const { score, questions } = this.data
    const correctCount = score / 20
    const accuracy = Math.round((correctCount / questions.length) * 100)
    
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    })
  },

  /**
   * 页面分享
   */
  onShareAppMessage: function() {
    const { score, questions } = this.data
    const correctCount = score / 20
    const accuracy = Math.round((correctCount / questions.length) * 100)
    
    return {
      title: `我在校园贷风险防范知识测验中得了${score}分！`,
      desc: `${questions.length}题，答对${correctCount}题，正确率${accuracy}%`,
      path: '/pages/quiz/quiz'
    }
  },

  /**
   * 分享到朋友圈
   */
  onShareTimeline: function() {
    const { score, questions } = this.data
    const correctCount = score / 20
    const accuracy = Math.round((correctCount / questions.length) * 100)
    
    return {
      title: `我在校园贷风险防范知识测验中得了${score}分！`,
      query: '',
      imageUrl: ''
    }
  }
})




