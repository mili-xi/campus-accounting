Page({
  /**
   * 页面的初始数据
   */
  data: {
    learningCategories: [
      { 
        icon: '💰', 
        name: '财务管理', 
        count: 12 
      },
      { 
        icon: '📊', 
        name: '预算规划', 
        count: 8 
      },
      { 
        icon: '📈', 
        name: '投资分析', 
        count: 10 
      },
      { 
        icon: '💳', 
        name: '信用卡管理', 
        count: 6 
      }
    ],
    popularCourses: [
      { 
        thumbnail: '📚', 
        name: '个人财务管理基础', 
        description: '学习个人财务管理的基础知识和技巧', 
        level: '入门', 
        duration: '2小时', 
        students: 5230 
      },
      { 
        thumbnail: '📊', 
        name: '预算规划实战', 
        description: '掌握预算规划的方法和实战技巧', 
        level: '进阶', 
        duration: '3小时', 
        students: 3420 
      },
      { 
        thumbnail: '📈', 
        name: '投资分析基础', 
        description: '了解投资分析的基本概念和方法', 
        level: '入门', 
        duration: '1.5小时', 
        students: 4560 
      }
    ],
    learningPaths: [
      { 
        icon: '🎓', 
        name: '财务管理入门', 
        description: '从基础到进阶的财务管理学习路径', 
        courses: 8 
      },
      { 
        icon: '🚀', 
        name: '预算规划专家', 
        description: '成为预算规划专家的学习路径', 
        courses: 6 
      },
      { 
        icon: '🌟', 
        name: '投资分析大师', 
        description: '掌握投资分析的高级技巧', 
        courses: 10 
      }
    ],
    completedCourses: 5,
    learningDuration: '8小时',
    currentLearning: '个人财务管理基础'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 打开学习分类
   */
  openCategory(e) {
    const index = e.currentTarget.dataset.index
    const category = this.data.learningCategories[index]
    
    wx.showModal({
      title: '打开学习分类',
      content: `正在打开 ${category.name} 分类...`,
      showCancel: false
    })
  },

  /**
   * 打开课程
   */
  openCourse(e) {
    const index = e.currentTarget.dataset.index
    const course = this.data.popularCourses[index]
    
    wx.showModal({
      title: '打开课程',
      content: `正在打开 ${course.name} 课程...`,
      showCancel: false
    })
  },

  /**
   * 打开学习路径
   */
  openPath(e) {
    const index = e.currentTarget.dataset.index
    const path = this.data.learningPaths[index]
    
    wx.showModal({
      title: '打开学习路径',
      content: `正在打开 ${path.name} 学习路径...`,
      showCancel: false
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
      title: '学习中心',
      desc: '提供各种财务学习资源和课程',
      path: '/pages/learning-center/learning-center'
    }
  }
})