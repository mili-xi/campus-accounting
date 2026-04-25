Page({
  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 拨打电话
   */
  makePhoneCall: function() {
    wx.makePhoneCall({
      phoneNumber: '400-123-4567',
      success: function() {
        console.log('拨打电话成功')
      },
      fail: function() {
        console.log('拨打电话失败')
      }
    })
  },

  /**
   * 发送邮件
   */
  sendEmail: function() {
    wx.showModal({
      title: '发送邮件',
      content: '您可以发送邮件到 contact@campus-accounting.com 与我们联系',
      showCancel: false
    })
  },

  /**
   * 打开官方网站
   */
  openWebsite: function() {
    wx.navigateTo({
      url: '/pages/web-view/web-view?url=https://www.campus-accounting.com'
    })
  },

  /**
   * 提交反馈表单
   */
  submitFeedback: function(e) {
    const formData = e.detail.value
    console.log('提交反馈表单:', formData)
    
    // 验证表单数据
    if (!formData.name || !formData.contact || !formData.content) {
      wx.showModal({
        title: '提示',
        content: '请填写完整的反馈信息',
        showCancel: false
      })
      return
    }
    
    // 模拟提交成功
    wx.showLoading({
      title: '提交中'
    })
    
    setTimeout(() => {
      wx.hideLoading()
      wx.showToast({
        title: '反馈提交成功',
        icon: 'success'
      })
      
      // 重置表单
      this.resetForm()
    }, 1500)
  },

  /**
   * 重置表单
   */
  resetForm: function() {
    this.setData({
      formData: {
        name: '',
        contact: '',
        content: ''
      }
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
      title: '联系方式',
      desc: '校园记记账小程序联系方式',
      path: '/pages/contact/contact'
    }
  }
})