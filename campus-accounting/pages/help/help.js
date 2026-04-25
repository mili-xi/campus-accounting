const app = getApp()

Page({
  data: {
    counselorPhone: '', // 辅导员电'    securityPhone: '', // 保卫处电'    mentalHealthPhone: '' // 心理健康中心电话
  },

  onLoad: function (options) {
    
    this.loadSavedPhoneNumbers() // 加载已保存的电话号码
  },

  onShow: function () {
    // 页面显示时可以添加一些逻辑
  },

  // 加载已保存的电话号码
  loadSavedPhoneNumbers: function () {
    try {
      var counselorPhone = wx.getStorageSync('counselorPhone') || ''
      var securityPhone = wx.getStorageSync('securityPhone') || ''
      var mentalHealthPhone = wx.getStorageSync('mentalHealthPhone') || ''
      
      this.setData({
        counselorPhone: counselorPhone,
        securityPhone: securityPhone,
        mentalHealthPhone: mentalHealthPhone
      })
      
      
    } catch (error) {
      console.error('加载电话号码失败:', error)
    }
  },

  // 保存电话号码到本地存储
  savePhoneNumbers: function () {
    try {
      wx.setStorageSync('counselorPhone', this.data.counselorPhone)
      wx.setStorageSync('securityPhone', this.data.securityPhone)
      wx.setStorageSync('mentalHealthPhone', this.data.mentalHealthPhone)
      
    } catch (error) {
      console.error('保存电话号码失败:', error)
    }
  },

  // 辅导员电话输入事件
  onCounselorPhoneInput: function (e) {
    const value = e.detail.value
    this.setData({
      counselorPhone: value
    })
    this.savePhoneNumbers() // 实时保存
  },

  // 保卫处电话输入事件
  onSecurityPhoneInput: function (e) {
    const value = e.detail.value
    this.setData({
      securityPhone: value
    })
    this.savePhoneNumbers() // 实时保存
  },

  // 心理健康中心电话输入事件
  onMentalHealthPhoneInput: function (e) {
    const value = e.detail.value
    this.setData({
      mentalHealthPhone: value
    })
    this.savePhoneNumbers() // 实时保存
  },

  // 拨打报警电话
  callPolice: function () {
    wx.makePhoneCall({
      phoneNumber: '96110',
      success: function () {
        
      },
      fail: function () {
        
        wx.showToast({
          title: '拨打失败',
          icon: 'none'
        })
      }
    })
  },

  // 拨打法律援助电话
  callLegalAid: function () {
    wx.makePhoneCall({
      phoneNumber: '12348',
      success: function () {
        
      },
      fail: function () {
        
        wx.showToast({
          title: '拨打失败',
          icon: 'none'
        })
      }
    })
  },

  // 拨打辅导员电话
  callCounselor: function () {
    var phoneNumber = this.data.counselorPhone
    if (this.validatePhoneNumber(phoneNumber)) {
      wx.makePhoneCall({
        phoneNumber: phoneNumber,
        success: function () {
          
        },
        fail: function () {
          
          wx.showToast({
            title: '拨打失败',
            icon: 'none'
          })
        }
      })
    } else {
      wx.showToast({
        title: '请先输入有效的电话号',
        icon: 'none'
      })
    }
  },

  // 拨打保卫处电话
  callSecurity: function () {
    var phoneNumber = this.data.securityPhone
    if (this.validatePhoneNumber(phoneNumber)) {
      wx.makePhoneCall({
        phoneNumber: phoneNumber,
        success: function () {
          
        },
        fail: function () {
          
          wx.showToast({
            title: '拨打失败',
            icon: 'none'
          })
        }
      })
    } else {
      wx.showToast({
        title: '请先输入有效的电话号',
        icon: 'none'
      })
    }
  },

  // 拨打心理健康中心电话
  callMentalHealth: function () {
    var phoneNumber = this.data.mentalHealthPhone
    if (this.validatePhoneNumber(phoneNumber)) {
      wx.makePhoneCall({
        phoneNumber: phoneNumber,
        success: function () {
          
        },
        fail: function () {
          
          wx.showToast({
            title: '拨打失败',
            icon: 'none'
          })
        }
      })
    } else {
      wx.showToast({
        title: '请先输入有效的电话号',
        icon: 'none'
      })
    }
  },

  // 验证电话号码格式
  validatePhoneNumber: function (phoneNumber) {
    if (!phoneNumber || phoneNumber.trim() === '') {
      return false
    }

    // 简单的电话号码格式验证
    const phonePattern = /^1[3-9]\d{9}$/ // 手机?    const phonePattern2 = /^\d{3,4}-\d{7,8}$/ // 固定电话
    const phonePattern3 = /^\d{7,8}$/ // 无区号固定电?    
    return phonePattern.test(phoneNumber) || phonePattern2.test(phoneNumber) || phonePattern3.test(phoneNumber)
  },

  // 分享页面
  onShareAppMessage: function () {
    return {
      title: '校园金额融安全指南南',
      path: '/pages/help/help',
      imageUrl: '/images/safety-share.png'
    }
  },

  // 分享到朋友圈
  onShareTimeline: function () {
    return {
      title: '校园金额融安全指南南 - 远离非法校园',
      query: '',
      imageUrl: '/images/safety-share.png'
    }
  },

  // 复制电话
  copyPhoneNumber: function (e) {
    const phoneNumber = e.currentTarget.dataset.phone
    wx.setClipboardData({
      data: phoneNumber,
      success: function () {
        wx.showToast({
          title: '已复',
          icon: 'success'
        })
      }
    })
  },

  // 显示安全提示
  showSafetyTips: function () {
    wx.showModal({
      title: '安全提示',
      content: '遇到可疑情况，请立即与辅导员或学校保卫处联系',
      showCancel: false,
      confirmText: '知道'
    })
  },

  // 跳转相关页面
  navigateToPage: function (e) {
    const page = e.currentTarget.dataset.page
    if (page === 'index') {
      wx.switchTab({
        url: '/pages/index/index'
      })
    } else if (page === 'records') {
      wx.switchTab({
        url: '/pages/records/records'
      })
    } else if (page === 'analysis') {
      wx.switchTab({
        url: '/pages/analysis/analysis'
      })
    } else if (page === 'add-record') {
      wx.switchTab({
        url: '/pages/add-record/add-record'
      })
    }
  }
})



