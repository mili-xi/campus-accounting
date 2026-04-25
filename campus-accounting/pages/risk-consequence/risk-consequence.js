Page({
  /**
   * ں--ҳ
   */
  onLoad: function(options) {
    console.log('risk-consequence ҳ')
  },

  /**
   * 页面的初始数?   */
  data: {
    currentSection: '',
    laws: [],
    illegalConsequences: [],
    borrowerResponsibilities: [],
    lenderResponsibilities: [],
    protections: [],
    actions: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    // 初始化页面数据
    this.initPageData()
  },
  
  /**
   * 初始化页面数据
   */
  initPageData: function() {
    // 相关法律法规
    var laws = [
      '《中华人民共和国民法典》（合同编、担保编等）',
      '《中华人民共和国刑法》（涉及诈骗、非法经营、催收非法债务等罪名）',
      '《关于规范民间借贷行为 维护经济金融秩序有关事项的通知》（银保监等部门联合发文）',
      '《关于进一步加强校园贷规范管理工作的通知》（银保监、教育部、公安部联合发布）',
      '《最高人民法院关于审理民间借贷案件适用法律若干问题的规定》',
      '《商业银行互联网贷款管理暂行办法》',
      '各地关于打击非法金融活动的地方性法规'
    ]
    
    // 非法校园贷的法律后果
    var illegalConsequences = [
      '借贷合同可能被认定为全部或部分无效，不受法律保护',
      '超过法定利率上限（LPR的4倍）的利息、违约金等不受支持',
      '构成非法经营罪、诈骗罪、催收非法债务罪等刑事犯罪的，依法追究刑事责任',
      '违法所得予以追缴或责令退赔',
      '对借款人实施暴力、威胁、骚扰等非法催收行为的，依法予以治安处罚或刑事处罚',
      '相关平台或个人可能被列入金融、征信黑名单，受到联合惩戒'
    ]
    
    // 借款人的法律责任
    var borrowerResponsibilities = [
      '对所签署的借款合同内容承担相应民事责任，包括偿还合法本金及合法利息',
      '提供虚假信息或冒用他人身份借款，可能承担民事赔偿甚至刑事责任',
      '明知对方从事非法金融活动仍配合借款，可能被认定为过错方，承担部分不利后果',
      '恶意逃废合法债务，可能被列入失信被执行人名单，影响征信、出行、就业等',
      '若参与发展下线、介绍他人参与非法校园贷，可能被认定为共同违法或共同犯罪'
    ]
    
    // 贷款人的法律责任
    var lenderResponsibilities = [
      '未经批准向在校学生发放贷款，可能面临行政处罚（罚款、吊销资质等）',
      '违法发放高利贷、暴力催收、泄露个人信息等行为，依法承担民事、行政甚至刑事责任',
      '以“培训贷”“回租贷”“创业贷”等名义变相开展非法校园贷，同样承担法律责任',
      '出借资金来源于非法集资或违法犯罪所得，将被追究相应法律责任',
      '通过虚假宣传、隐瞒真实利率诱导学生借款，构成欺诈，需退还违法所得并承担惩罚性赔偿'
    ]
    
    // 大学生的法律保护
    var protections = [
      '未经监管部门批准的机构不得向在校大学生开展贷款业务',
      '法定利率保护：超出LPR四倍的部分，借款人有权拒绝支付',
      '禁止暴力、恐吓、骚扰、胁迫、曝光隐私等非法催收行为',
      '个人信息受法律保护，贷款人不得非法收集、使用或公开学生信息',
      '因受欺骗或胁迫订立的借款合同，可依法请求法院或仲裁机构撤销',
      '在校学生作为限制或完全民事行为能力人，其重大消费借贷行为可主张格式条款审查与公平性保护',
      '教育部门、高校、公安机关有责任为学生提供法律咨询与维权协助'
    ]
    
    // 遇到问题如何维权
    var actions = [
      '立即停止还款争议部分：对超出合法利率或不明费用，暂不支付，保留证据',
      '收集并保存证据：包括借款合同、转账记录、聊天记录、通话录音、催收短信、威胁信息等',
      '及时求助学校：联系辅导员、学生处或保卫处，学校可提供协助并报告公安机关',
      '报警处理：遭遇暴力、威胁、骚扰、非法拘禁等违法行为，立即拨打110或前往派出所报案',
      '向监管部门投诉：可向银保监、地方金融监管局、市场监管局投诉非法放贷行为',
      '寻求法律援助：通过高校法律援助中心、12348法律援助热线或聘请律师，获取专业法律意见',
      '保留征信异议权：如因非法校园贷被错误上报征信，可向征信机构或人民银行提出异议',
      '与家长沟通：不要独自承受，及时告知父母或信任的成年人，共同应对'
    ]
    
    this.setData({
      laws,
      illegalConsequences,
      borrowerResponsibilities,
      lenderResponsibilities,
      protections,
      actions
    })
  },

  /**
   * 滚动到指定章节
   */
  scrollToSection: function(e) {
    const section = e.currentTarget.dataset.section
    this.setData({
      currentSection: section
    })
    
    // 滚动到指定章节
    const query = wx.createSelectorQuery()
    query.select(`#${section}`).boundingClientRect()
    query.exec(function(res) {
      if (res && res.length > 0 && res[0]) {
        wx.pageScrollTo({
          scrollTop: res[0].top - 20,
          duration: 300
        })
      }
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
    return {
      title: '法律后果科普',
      desc: '了解校园贷的法律后果，保护自己的合法权益',
      path: '/pages/risk-consequence/risk-consequence'
    }
  },

  /**
   * 分享到朋友圈
   */
  onShareTimeline: function() {
    return {
      title: '法律后果科普',
      query: '',
      imageUrl: ''
    }
  },

  /**
   * 页面打印
   */
  onPrint: function() {
    wx.showModal({
      title: '打印功能',
      content: '您可以使用手机的截图功能保存页面内容，或转发给其他同学共同学习',
      showCancel: false
    })
  },

  /**
   * 页面收入藏
   */
  onCollect: function() {
    wx.setStorageSync('riskConsequenceCollected', true)
    wx.showToast({
      title: '收入藏成功',
      icon: 'success'
    })
  },

  /**
   * 页面转发给好?   */
  onForward: function() {
    this.onShareAppMessage()
  },

  /**
   * 页面反馈
   */
  onFeedback: function() {
    wx.showModal({
      title: '意见反馈',
      content: '如果您对本页面有任何建议或意见，请通过微信小程序客服功能与我们联系',
      showCancel: false
    })
  },

  /**
   * 页面加载更多内容
   */
  loadMoreContent: function() {
    wx.showToast({
      title: '已加载全部内',
      icon: 'none'
    })
  },

  /**
   * 页面重新加载
   */
  reloadPage: function() {
    wx.reLaunch({
      url: '/pages/risk-consequence/risk-consequence'
    })
  },

  /**
   * 页面截图
   */
  takeScreenshot: function() {
    wx.showModal({
      title: '截图功能',
      content: '您可以使用手机的截图功能保存页面内容，或转发给其他同学共同学习',
      showCancel: false
    })
  },

  /**
   * 页面添加到桌?   */
  addToDesktop: function() {
    wx.showModal({
      title: '添加到桌',
      content: '您可以将本页面添加到手机桌面，方便随时查看和学习',
      showCancel: false
    })
  },

  /**
   * 页面搜索功能
   */
  onSearch: function(e) {
    const keyword = e.detail.value
    if (!keyword) return
    
    // 简单的搜索实现
    const sections = ['laws', 'illegal', 'borrower', 'lender', 'protections', 'actions']
    let found = false
    
    sections.forEach(section => {
      // 微信小程序中获取DOM元素的方式需要使用wx.createSelectorQuery
      var query = wx.createSelectorQuery()
      query.select(`#${section}`).boundingClientRect()
      query.exec((res) => {
        if (res && res.length > 0 && res[0]) {
          // 这里简化实现，实际上需要根据内容判断是否包含关键词
          // 由于微信小程序不支持直接获取DOM文本内容，这里简化处理
          var sectionTitle = section
          if (sectionTitle && sectionTitle.includes(keyword)) {
            this.scrollToSection({
              currentTarget: {
                dataset: {
                  section: section
                }
              }
            })
            found = true
          }
        }
      })
    })
    
    if (!found) {
      wx.showModal({
        title: '搜索结果',
        content: '未找到相关内容',
        showCancel: false
      })
    }
  }
})



