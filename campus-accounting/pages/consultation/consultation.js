// pages/consultation/consultation.js
Page({
  /**
   * 页面的初始数?   */
  data: {
    consultationMethods: [
      {
        name: '在线客服',
        icon: '☎️',
        description: '通过在线客服与我们的法律专家进行实时沟通',
        action: 'onlineService'
      },
      {
        name: '电话咨询',
        icon: '📞',
        description: '拨打我们的咨询热线，获得专业的法律咨',
        action: 'phoneConsultation'
      },
      {
        name: '线下预约',
        icon: '🏢',
        description: '预约线下法律咨询，与专业律师面对面交通通',
        action: 'offlineAppointment'
      },
      {
        name: '法律知识',
        icon: '📚',
        description: '查看常见问题和法律知识库',
        action: 'legalKnowledge'
      }
    ],
    legalQuestions: [
      {
        question: '什么是校园贷？',
        answer: '校园贷是指南面向大学生的各种借贷服务，但部分校园贷产品可能存在高利率、暴力催收入等非法行为'
      },
      {
        question: '校园贷有哪些风险',
        answer: '校园贷的风险包括高利率、暴力催收入、合同陷阱、个人信息泄露等，严重时可能影响个人信用卡卡和法律责任'
      },
      {
        question: '如何识别非法校园贷？',
        answer: '非法校园贷通常具有无资质经营、高利率、虚假宣传、暴力催收入等特征，大学生应谨慎识别'
      },
      {
        question: '遇到非法校园贷怎么办？',
        answer: '遇到非法校园贷应保持冷静，收入集证据，及时与家人、老师沟通，并向公安机关报案'
      }
    ],
    consultationForm: {
      name: '',
      phone: '',
      email: '',
      question: '',
      urgency: '一'
    },
    showForm: false,
    formSubmitted: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    
  },

  /**
   * 选择咨询方式
   */
  selectConsultationMethod: function(e) {
    const action = e.currentTarget.dataset.action
    
    switch(action) {
      case 'onlineService':
        this.onlineService()
        break
      case 'phoneConsultation':
        this.phoneConsultation()
        break
      case 'offlineAppointment':
        this.offlineAppointment()
        break
      case 'legalKnowledge':
        this.legalKnowledge()
        break
    }
  },

  /**
   * 在线客服
   */
  onlineService: function() {
    wx.showModal({
      title: '在线客服',
      content: '我们的在线客服服务时间为每天 9:00-21:00。您可以通过以下方式联系我们：\n\n1. 微信小程序在线客服\n2. 官方QQ群：123456789\n3. 官方邮箱：contact@campus-accounting.com',
      showCancel: false
    })
  },

  /**
   * 电话咨询
   */
  phoneConsultation: function() {
    wx.makePhoneCall({
      phoneNumber: '400-123-4567',
      success: function() {
        
      },
      fail: function() {
        
      }
    })
  },

  /**
   * 线下预约
   */
  offlineAppointment: function() {
    this.setData({
      showForm: true
    })
  },

  /**
   * 法律知识?   */
  legalKnowledge: function() {
    wx.navigateTo({
      url: '/pages/knowledge-center/knowledge-center'
    })
  },

  /**
   * 表单输入
   */
  formInput: function(e) {
    const field = e.currentTarget.dataset.field
    const value = e.detail.value
    
    this.setData({
      [`consultationForm.${field}`]: value
    })
  },

  /**
   * 提交通表单
   */
  submitForm: function() {
    var form = this.data.consultationForm
    
    // 验证表单
    if (!form.name || !form.phone || !form.question) {
      wx.showModal({
        title: '提示',
        content: '请填写完整的咨询信息',
        showCancel: false
      })
      return
    }
    
    // 简单的表单验证
    const phoneReg = /^1[3-9]\d{9}$/
    if (!phoneReg.test(form.phone)) {
      wx.showModal({
        title: '提示',
        content: '请输入正确的手机号码',
        showCancel: false
      })
      return
    }
    
    if (form.email) {
      const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailReg.test(form.email)) {
        wx.showModal({
          title: '提示',
          content: '请输入正确的邮箱地址',
          showCancel: false
        })
        return
      }
    }
    
    // 提交通表单（模拟）
    wx.showLoading({
      title: '提交'
    })
    
    setTimeout(() => {
      wx.hideLoading()
      this.setData({
        formSubmitted: true
      })
      
      wx.showToast({
        title: '预约成功',
        icon: 'success',
        duration: 2000
      })
      
      // 重置表单
      setTimeout(() => {
        this.setData({
          consultationForm: {
            name: '',
            phone: '',
            email: '',
            question: '',
            urgency: '一'
          },
          showForm: false,
          formSubmitted: false
        })
      }, 2000)
    }, 1500)
  },

  /**
   * 取消预约
   */
  cancelAppointment: function() {
    this.setData({
      showForm: false
    })
  },

  /**
   * 查看常见问题
   */
  viewFAQ: function() {
    wx.showModal({
      title: '常见问题',
      content: '我们为您准备了常见问题解答，您可以通过法律知识库查看详细内容',
      showCancel: false,
      confirmText: '去查',
      success: function(res) {
        if (res.confirm) {
          wx.navigateTo({
            url: '/pages/knowledge-center/knowledge-center'
          })
        }
      }
    })
  },

  /**
   * 分享页面
   */
  onShareAppMessage: function() {
    return {
      title: '法律咨询服务',
      desc: '专业的校园贷法律咨询服务，帮助您解决法律问题',
      path: '/pages/consultation/consultation'
    }
  },

  /**
   * 分享到朋友圈
   */
  onShareTimeline: function() {
    return {
      title: '法律咨询服务',
      query: '',
      imageUrl: ''
    }
  }
})



