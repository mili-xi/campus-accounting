const app = getApp()

Page({
  /**
   * ں--ҳ
   */
  onLoad: function(options) {
    console.log('records ҳ')
  },

  data: {
    startDate: '',
    endDate: '',
    typeIndex: 0,
    types: ['全部', '支出', '收入'],
    categoryIndex: 0,
    categories: ['全部'],
    records: [],
    totalCount: 0,
    totalIncome: 0,
    totalExpense: 0,
    page: 0,
    pageSize: 10,
    hasMore: false
  },

  onLoad: function (options) {
    this.initFilters()
    this.loadCategories()
    
    // 无论 useCloud 是什么值，都直接加载本地存储的记录
    console.log('records页面onLoad')
    this.loadRecords()
  },

  onShow: function () {
    console.log('records页面onShow')
    // 刷新记录数据，显示最新修改后的内容
    this.loadRecords()
  },

  // 初始化筛选条件
  initFilters: function () {
    var now = new Date()
    var endDate = app.formatDate(now)
    // 显示本月的数据，这样能看到整个月的记录
    var startDate = app.formatDate(new Date(now.getFullYear(), now.getMonth(), 1))
    
    this.setData({
      startDate: startDate,
      endDate: endDate
    })
    
    console.log('初始化筛选条件:', { startDate, endDate })
  },

  // 加载分类选项
  loadCategories: function () {
    var allCategories = ['全部']
    var expenseCategories = app.globalData.categories.expense
    var incomeCategories = app.globalData.categories.income
    
    expenseCategories.forEach(category => {
      if (!allCategories.includes(category)) {
        allCategories.push(category)
      }
    })
    
    incomeCategories.forEach(category => {
      if (!allCategories.includes(category)) {
        allCategories.push(category)
      }
    })
    
    this.setData({
      categories: allCategories
    })
  },

  // 加载记录数据（本地存储）
  loadRecords: function () {
    try {
      console.log('开始加载记录数据')
      // 从本地存储获取记录
      let allRecords = app.getAllRecords()
      console.log('从本地存储获取到的记录:', allRecords)
      
      // 打印当前筛选条件
      console.log('当前筛选条件:', {
        startDate: this.data.startDate,
        endDate: this.data.endDate,
        typeIndex: this.data.typeIndex,
        categoryIndex: this.data.categoryIndex,
        category: this.data.categories[this.data.categoryIndex]
      })
      
      // 应用筛选条件
      const filteredRecords = this.filterRecords(allRecords)
      
      console.log('筛选后的记录:', filteredRecords)
      
      // 排序
      filteredRecords.sort((a, b) => {
        // 先按日期降序
        if (a.date > b.date) return -1
        if (a.date < b.date) return 1
        
        // 日期相同按创建时间降序
        return new Date(b.createTime) - new Date(a.createTime)
      })
      
      console.log('排序后的记录:', filteredRecords)
      console.log('总记录数:', filteredRecords.length)
      
      // 检查记录数组是否为空
      if (filteredRecords.length === 0) {
        console.log('没有找到符合条件的记录')
        this.setData({
          records: [],
          hasMore: false,
          totalCount: 0,
          totalIncome: 0,
          totalExpense: 0
        })
        this.calculateStats([])
        return
      }
      
      // 分页
      const startIndex = this.data.page * this.data.pageSize
      const endIndex = startIndex + this.data.pageSize
      const records = filteredRecords.slice(startIndex, endIndex)
      
      console.log('要显示的记录:', records)
      
      const hasMore = endIndex < filteredRecords.length
      
      this.setData({
        records: this.data.page === 0 ? records : [...this.data.records, ...records],
        hasMore: hasMore,
        page: this.data.page + 1
      })
      
      this.calculateStats(filteredRecords) // 使用筛选后的记录计算统计信息
      
    } catch (err) {
      console.error('加载记录失败:', err)
      this.setData({
        records: [],
        hasMore: false
      })
      this.calculateStats()
    }
  },

  // 筛选记录
  filterRecords: function (records) {
    console.log('进入filterRecords函数，原始记录:', records)
    
    const filtered = records.filter(record => {
      // 日期范围筛选
      let dateMatch = true
      if (this.data.startDate && this.data.endDate) {
        dateMatch = record.date >= this.data.startDate && record.date <= this.data.endDate
        if (!dateMatch) {
          console.log('日期不匹配:', record.date, '不在', this.data.startDate, '至', this.data.endDate, '范围内')
        }
      }
      
      // 类型筛选
      let typeMatch = true
      if (this.data.typeIndex === 1 && record.type !== 'expense') {
        typeMatch = false
        console.log('类型不匹配:', record.type, '不是支出')
      }
      if (this.data.typeIndex === 2 && record.type !== 'income') {
        typeMatch = false
        console.log('类型不匹配:', record.type, '不是收入')
      }
      
      // 分类筛选
      let categoryMatch = true
      if (this.data.categoryIndex > 0) {
        const selectedCategory = this.data.categories[this.data.categoryIndex]
        categoryMatch = record.category === selectedCategory
        if (!categoryMatch) {
          console.log('分类不匹配:', record.category, '不是', selectedCategory)
        }
      }
      
      return dateMatch && typeMatch && categoryMatch
    })
    
    console.log('筛选后的记录:', filtered)
    return filtered
  },

  // 加载模拟数据（无云开发发）
  loadMockRecords: function () {
    var records = app.globalData.mockData.records
    this.setData({
      records: records,
      hasMore: false,
      page: 1
    })
    this.calculateStats()
  },

  // 构建查询条件
  buildQuery: function () {
    var db = wx.cloud.database()
    var query = {}
    
    // 日期范围
    if (this.data.startDate && this.data.endDate) {
      query.date = db.command.and(
        db.command.gte(this.data.startDate),
        db.command.lte(this.data.endDate)
      )
    }
    
    // 类型
    if (this.data.typeIndex === 1) {
      query.type = 'expense'
    } else if (this.data.typeIndex === 2) {
      query.type = 'income'
    }
    
    // 分类
    if (this.data.categoryIndex > 0) {
      query.category = this.data.categories[this.data.categoryIndex]
    }
    
    return query
  },

  // 计算统计信息
  calculateStats: function (records = null) {
    // 如果没有传入 records，则从 data 中获取
    const recordsToCalculate = records || this.data.records
    
    let totalCount = 0
    let totalIncome = 0
    let totalExpense = 0
    
    recordsToCalculate.forEach(record => {
      totalCount++
      if (record.type === 'income') {
        totalIncome += record.amount
      } else {
        totalExpense += record.amount
      }
    })
    
    console.log('记录页面计算的总收入:', totalIncome, '总支出:', totalExpense)
    
    this.setData({
      totalCount: totalCount,
      totalIncome: parseFloat(totalIncome.toFixed(2)),
      totalExpense: parseFloat(totalExpense.toFixed(2))
    })
  },

  // 日期筛选
  onStartDateChange: function (e) {
    console.log('开始日期变更:', e.detail.value)
    this.setData({
      startDate: e.detail.value,
      page: 0,
      records: []
    })
    
    this.loadRecords()
  },

  onEndDateChange: function (e) {
    this.setData({
      endDate: e.detail.value,
      page: 0,
      records: []
    })
    
    this.loadRecords()
  },

  // 类型筛选
  onTypeChange: function (e) {
    this.setData({
      typeIndex: parseInt(e.detail.value),
      page: 0,
      records: []
    })
    
    this.loadRecords()
  },

  // 分类筛选
  onCategoryChange: function (e) {
    this.setData({
      categoryIndex: parseInt(e.detail.value),
      page: 0,
      records: []
    })
    
    this.loadRecords()
  },

  // 清空筛选条件
  clearFilters: function () {
    console.log('点击清空筛选按钮')
    // 初始化筛选条件 - 设置为本月第一天到今天
    var now = new Date()
    var startDate = app.formatDate(new Date(now.getFullYear(), now.getMonth(), 1))
    var endDate = app.formatDate(now)
    
    this.setData({
      startDate: startDate,
      endDate: endDate,
      typeIndex: 0,
      categoryIndex: 0,
      page: 0,
      records: []
    })
    
    console.log('清空筛选条件后的日期范围:', { startDate, endDate })
    
    // 重新加载记录
    this.loadRecords()
  },

  // 加载更多
  loadMore: function () {
    if (!this.data.hasMore) {
      return
    }
    
    // 无论是否使用云开发，都直接加载本地存储的记录
    this.loadRecords()
  },

  // 编辑记录
  editRecord: function (e) {
    const recordId = e.currentTarget.dataset.id
    const record = this.data.records.find(item => item._id === recordId)
    if (record) {
      console.log('编辑记录:', record)
      wx.navigateTo({
        url: `/pages/add-record/add-record?edit=${recordId}`
      })
    } else {
      console.error('未找到记录:', recordId)
      wx.showToast({
        title: '未找到记录',
        icon: 'none'
      })
    }
  },

  // 删除记录
  deleteRecord: function (e) {
    const recordId = e.currentTarget.dataset.id
    wx.showModal({
      title: '确认删除',
      content: '确定要删除这条记录吗',
      success: res => {
        if (res.confirm) {
          this.doDeleteRecord(recordId)
        }
      }
    })
  },

  // 执行删除操作
  doDeleteRecord: function (recordId) {
    try {
      console.log('开始删除记录，ID:', recordId)
      // 从本地存储获取记录
      let records = JSON.parse(wx.getStorageSync('records') || '[]')
      console.log('删除前的记录:', records)
      
      // 删除指定记录
      records = records.filter(item => item._id !== recordId)
      
      console.log('删除后的记录:', records)
      
      // 保存到本地存储
      wx.setStorageSync('records', JSON.stringify(records))
      
      this.setData({
        page: 0,
        records: []
      })
      this.loadRecords()
      
      wx.showToast({
        title: '删除成功',
        icon: 'success'
      })
      
      
    } catch (err) {
      console.error('删除记录失败:', err)
      wx.showToast({
        title: '删除失败',
        icon: 'none'
      })
    }
  }
})




