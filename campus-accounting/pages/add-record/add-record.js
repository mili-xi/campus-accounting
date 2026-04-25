const app = getApp()

console.log('add-record ҳ')

Page({
  data: {
    date: '',
    typeIndex: 0,
    types: ['支出', '收入'],
    amount: '',
    categoryIndex: 0,
    categories: [],
    remark: '',
    hasLoanKeyword: false,
    isEditing: false,
    editRecordId: ''
  },

  onLoad: function (options) {
    console.log('add-record 页面加载:', options)
    
    // 检查是否是编辑模式
    if (options.edit) {
      this.setData({
        isEditing: true,
        editRecordId: options.edit
      })
      this.loadEditData(options.edit)
    } else {
      // 初始化日期
      const now = new Date()
      const date = app.formatDate(now)
      this.setData({
        date: date,
        isEditing: false
      })

      // 初始化分类列表
      this.updateCategories()
    }
  },

  // 加载编辑数据
  loadEditData: function (recordId) {
    try {
      console.log('加载编辑数据:', recordId)
      const allRecords = JSON.parse(wx.getStorageSync('records') || '[]')
      console.log('所有记录:', allRecords)
      
      const record = allRecords.find(item => item._id === recordId)
      
      if (record) {
        const typeIndex = record.type === 'expense' ? 0 : 1
        
        this.setData({
          date: record.date,
          typeIndex: typeIndex,
          amount: record.amount.toString(),
          remark: record.remark
        })

        // 初始化分类列表，保留原索引
        this.updateCategories(true)
        
        // 设置当前分类
        const categoryIndex = this.data.categories.indexOf(record.category)
        if (categoryIndex !== -1) {
          this.setData({
            categoryIndex: categoryIndex
          })
        } else {
          console.warn('分类未找到:', record.category)
        }

        console.log('加载编辑数据成功:', record)
      } else {
        console.error('未找到要编辑的记录:', recordId)
        wx.showToast({
          title: '未找到记录',
          icon: 'none'
        })
        wx.navigateBack()
      }
    } catch (error) {
      console.error('加载编辑数据失败:', error)
      wx.showToast({
        title: '加载失败',
        icon: 'none'
      })
      wx.navigateBack()
    }
  },

  // 更新分类列表
  updateCategories: function (keepIndex = false) {
    const type = this.data.typeIndex === 0 ? 'expense' : 'income'
    const categories = type === 'expense' ?
      app.globalData.categories.expense : app.globalData.categories.income
    
    if (keepIndex) {
      this.setData({
        categories: categories
      })
    } else {
      this.setData({
        categories: categories,
        categoryIndex: 0
      })
    }
  },

  // 日期选择
  onDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },

  // 类型选择
  onTypeChange: function (e) {
    const typeIndex = parseInt(e.detail.value)
    this.setData({
      typeIndex: typeIndex
    })
    this.updateCategories()
  },

  // 金额输入
  onAmountInput: function (e) {
    this.setData({
      amount: e.detail.value
    })
  },

  // 分类选择
  onCategoryChange: function (e) {
    this.setData({
      categoryIndex: parseInt(e.detail.value)
    })
  },

  // 备注输入
  onRemarkInput: function (e) {
    const remark = e.detail.value
    this.setData({
      remark: remark
    })
    
    // 检查备注中是否包含贷款相关关键?    this.checkLoanKeywords(remark)
  },

  // 检查备注中的贷款关键词
  checkLoanKeywords: function (remark) {
    const loanKeywords = [
      '校园贷', '分期贷', '秒批', '无抵押', '低息贷款', '花呗套现',
      '网贷', '贷款', '借款', '分期', '套现', '低息', '免息', '信用卡卡',
      '小额贷贷', '快速贷', '无需抵押', '当天放款', '大学生贷款款'
    ]
    
    // 检查是否包含任何贷款关键词
    const hasLoanKeyword = loanKeywords.some(keyword => 
      remark.toLowerCase().includes(keyword.toLowerCase())
    )
    
    this.setData({
      hasLoanKeyword: hasLoanKeyword
    })
    
    if (hasLoanKeyword) {
      wx.showModal({
        title: '⚠️ 贷款风险预警',
        content: '您的备注中包含贷款相关词汇，可能存在校园贷风险。请仔细核实交易内容，避免陷入非法校园贷陷阱',
        showCancel: false,
        confirmText: '我知道了'
      })
    }
  },

  // 提交记录
  submitRecord: function () {
    console.log('提交记录:', this.data)
    
    // 验证数据
    if (!this.data.amount) {
      wx.showToast({
        title: '请输入金额',
        icon: 'none'
      })
      return
    }

    const amount = parseFloat(this.data.amount)
    if (amount <= 0) {
      wx.showToast({
        title: '金额必须大于0',
        icon: 'none'
      })
      return
    }

    // 检查备注中的贷款关键词
    const loanKeywords = [
      '校园贷', '分期贷', '秒批', '无抵押', '低息贷款', '花呗套现',
      '网贷', '贷款', '借款', '分期', '套现', '低息', '免息', '信用卡卡',
      '小额贷贷', '快速贷', '无需抵押', '当天放款', '大学生贷款款'
    ]
    
    const hasLoanKeyword = loanKeywords.some(keyword => 
      this.data.remark.toLowerCase().includes(keyword.toLowerCase())
    )
    
    if (hasLoanKeyword) {
      wx.showModal({
        title: '⚠️ 贷款风险预警',
        content: '您的备注中包含贷款相关词汇，可能存在校园贷风险。继续操作将记录该笔交易，建议您重新考虑',
        confirmText: '继续操作',
        cancelText: '取消',
        success: res => {
          if (res.confirm) {
            this.processSubmit()
          }
        }
      })
      return
    }

    // 检查大额支出
    if (amount > 500 && this.data.typeIndex === 0) {
      wx.showModal({
        title: '大额支出预警',
        content: '单笔支出超过500元，可能存在风险，请谨慎操作',
        success: res => {
          if (res.confirm) {
            this.processSubmit()
          }
        }
      })
      return
    }

    // 直接提交
    this.processSubmit()
  },

  // 处理提交通逻辑
  processSubmit: function () {
    // 检查大额支出
    var amount = parseFloat(this.data.amount)
    if (amount > 500 && this.data.typeIndex === 0) {
      wx.showModal({
        title: '大额支出预警',
        content: '单笔支出超过500元，可能存在风险，请谨慎操作',
        success: res => {
          if (res.confirm) {
            this.doSubmit()
          }
        }
      })
      return
    }

    // 直接提交通
    this.doSubmit()
  },

  // 执行提交操作
  doSubmit: function () {
    try {
      console.log('开始执行提交操作')
      
      // 准备记录数据
      let record
      if (this.data.isEditing) {
        record = {
          _id: this.data.editRecordId,
          date: this.data.date,
          type: this.data.typeIndex === 0 ? 'expense' : 'income',
          amount: parseFloat(this.data.amount),
          category: this.data.categories[this.data.categoryIndex],
          remark: this.data.remark,
          createTime: new Date().toISOString()
        }
      } else {
        record = {
          _id: Date.now().toString(), // 使用时间戳作为唯一ID
          date: this.data.date,
          type: this.data.typeIndex === 0 ? 'expense' : 'income',
          amount: parseFloat(this.data.amount),
          category: this.data.categories[this.data.categoryIndex],
          remark: this.data.remark,
          createTime: new Date().toISOString()
        }
      }

      console.log('准备保存的记录:', record)

      // 使用本地存储替代云数据库
      let existingRecords = []
      try {
        existingRecords = JSON.parse(wx.getStorageSync('records') || '[]')
        console.log('已存在的记录:', existingRecords)
      } catch (error) {
        console.error('解析存储记录失败:', error)
        existingRecords = []
      }

      if (this.data.isEditing) {
        // 编辑模式：更新记录
        const index = existingRecords.findIndex(item => item._id === this.data.editRecordId)
        if (index !== -1) {
          existingRecords[index] = record
        }
      } else {
        // 添加模式：添加新记录
        existingRecords.push(record)
      }

      // 保存到本地存储
      wx.setStorageSync('records', JSON.stringify(existingRecords))
      
      // 验证保存是否成功
      const savedRecords = JSON.parse(wx.getStorageSync('records') || '[]')
      console.log('保存后的记录:', savedRecords)
      
      console.log('记录保存成功')

      wx.showToast({
        title: this.data.isEditing ? '修改成功' : '添加成功',
        icon: 'success',
        duration: 1500
      })

      // 检查是否需要预警
      this.checkWarning(record)

      // 编辑模式下，保存修改后直接返回前画面，不重置表单
      if (this.data.isEditing) {
        setTimeout(() => {
          wx.navigateBack()
        }, 1500)
      } else {
        // 添加模式下，重置表单并返回上一页
        this.resetForm()
        setTimeout(() => {
          wx.navigateBack()
        }, 1500)
      }

    } catch (err) {
      console.error(this.data.isEditing ? '修改记录失败' : '添加记录失败:', err)
      wx.showToast({
        title: (this.data.isEditing ? '修改失败' : '添加失败') + ': ' + (err.errMsg || '未知错误'),
        icon: 'none'
      })
    }
  },

  // 检查是否需要预警
  checkWarning: function (record) {
    // 大额支出预警
    if (record.type === 'expense' && record.amount > 500) {
      app.showWarning('大额支出预警', '单笔支出超过500元，请确认是否需要调整预算')
    }

    // 每日支出预警
    this.checkDailyExpense()
  },

  // 检查每日支出
  checkDailyExpense: function () {
    try {
      var records = JSON.parse(wx.getStorageSync('records') || '[]')
      var dailyRecords = records.filter(record => 
        record.type === 'expense' && record.date === this.data.date
      )
      
      let dailyTotal = 0
      dailyRecords.forEach(item => {
        dailyTotal += item.amount
      })

      if (dailyTotal > 300) {
        app.showWarning('每日支出预警', '今日支出已超过300元，请合理安排消费')
      }
    } catch (error) {
      console.error('检查每日支出失败:', error)
    }
  },

  // 重置表单
  resetForm: function () {
    var now = new Date()
    var date = app.formatDate(now)
    this.setData({
      date: date,
      typeIndex: 0,
      amount: '',
      categoryIndex: 0,
      remark: ''
    })
    this.updateCategories()
  }
})

