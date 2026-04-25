Page({
  /**
   * 页面的初始数?   */
  data: {
    questions: [
      {
        question: '您是否了解校园贷的风险？',
        options: [
          '非常了解',
          '比较了解',
          '不太了解',
          '完全不了解'
        ],
        scores: [0, 2, 5, 10]
      },
      {
        question: '您是否曾经使用过校园贷？',
        options: [
          '从来没有',
          '曾经使用过，但已经还清',
          '正在使用',
          '多次使用'
        ],
        scores: [0, 3, 8, 15]
      },
      {
        question: '您是否收到过校园贷的广告',
        options: [
          '从来没有',
          '偶尔收到',
          '经常收到',
          '每天都收到'
        ],
        scores: [0, 2, 5, 10]
      },
      {
        question: '您是否了解校园贷的利率？',
        options: [
          '非常了解',
          '比较了解',
          '不太了解',
          '完全不了解'
        ],
        scores: [0, 2, 5, 10]
      },
      {
        question: '您是否能够承受校园贷的还款压力？',
        options: [
          '完全可以承受',
          '基本可以承受',
          '不太可以承受',
          '完全无法承受'
        ],
        scores: [0, 3, 8, 15]
      }
    ],
    currentQuestion: 0,
    selectedOption: null,
    totalScore: 0,
    progress: 0,
    showResult: false,
    riskScore: 0,
    riskLevelText: '',
    riskDescription: '',
    riskSuggestions: []
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
    
    // 计算分数
    const questionScore = questions[currentQuestion].scores[selectedOption]
    this.setData({
      totalScore: this.data.totalScore + questionScore
    })
    
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
      // 显示评估结果
      this.showAssessmentResult()
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
      // 显示评估结果
      this.showAssessmentResult()
    }
  },

  /**
   * 显示评估结果
   */
  showAssessmentResult: function() {
    const { totalScore } = this.data
    let riskScore = totalScore
    let riskLevelText = ''
    let riskDescription = ''
    let riskSuggestions = []
    
    if (riskScore <= 10) {
      riskLevelText = '低风险'
      riskDescription = '您的校园贷风险较低，但仍需保持警惕，避免接触非法校园贷'
      riskSuggestions = [
        '继续保持对校园贷风险的认识',
        '避免接触非法校园贷',
        '如果需要贷款，优先选择正规金融机构',
        '定期检查自己的财务状况'
      ]
    } else if (riskScore <= 25) {
      riskLevelText = '中风险'
      riskDescription = '您的校园贷风险中等，需要加强对校园贷风险的认识，避免接触非法校园贷'
      riskSuggestions = [
        '加强对校园贷风险的学习',
        '避免接触非法校园贷',
        '如果需要贷款，优先选择正规金融机构',
        '制定合理的消费计划',
        '定期检查自己的财务状况'
      ]
    } else {
      riskLevelText = '高风险'
      riskDescription = '您的校园贷风险较高，需要立即采取措施，避免接触非法校园贷'
      riskSuggestions = [
        '立即停止接触非法校园贷',
        '加强对校园贷风险的学习',
        '如果需要贷款，优先选择正规金融机构',
        '制定严格的消费计划',
        '定期检查自己的财务状况',
        '如果有困难，及时向家人或老师寻求帮助'
      ]
    }
    
    this.setData({
      showResult: true,
      riskScore: riskScore,
      riskLevelText: riskLevelText,
      riskDescription: riskDescription,
      riskSuggestions: riskSuggestions
    })
  },

  /**
   * 查看结果
   */
  viewResult: function() {
    this.showAssessmentResult()
  },

  /**
   * 重新评估
   */
  restartAssessment: function() {
    this.setData({
      currentQuestion: 0,
      selectedOption: null,
      totalScore: 0,
      progress: (1 / this.data.questions.length) * 100,
      showResult: false,
      riskScore: 0,
      riskLevelText: '',
      riskDescription: '',
      riskSuggestions: []
    })
  },

  /**
   * 分享结果
   */
  shareResult: function() {
    const { riskScore, riskLevelText } = this.data
    
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    })
  },

  /**
   * 页面分享
   */
  onShareAppMessage: function() {
    const { riskScore, riskLevelText } = this.data
    
    return {
      title: `我在校园贷风险评估中获得${riskScore}分，风险等级${riskLevelText}！`,
      desc: '校园贷风险评估，保护自己免受非法校园贷侵害',
      path: '/pages/assessment/assessment'
    }
  },

  /**
   * 分享到朋友圈
   */
  onShareTimeline: function() {
    const { riskScore, riskLevelText } = this.data
    
    return {
      title: `我在校园贷风险评估中获得${riskScore}分，风险等级${riskLevelText}！`,
      query: '',
      imageUrl: ''
    }
  }
})

