// 调试脚本 - 用于检查项目配置和本地存储
const app = getApp()

// 检查应用配置
console.log('=== 应用配置 ===')
console.log('AppId:', wx.getAccountInfoSync().miniProgram.appId)
console.log('版本:', wx.getAccountInfoSync().miniProgram.version)
console.log('SDK版本:', wx.getSystemInfoSync().SDKVersion)

// 检查本地存储
function checkLocalStorage() {
  console.log('\n=== 本地存储检查 ===')
  
  try {
    // 检查本地存储是否可用
    wx.setStorageSync('test_key', 'test_value')
    const testValue = wx.getStorageSync('test_key')
    wx.removeStorageSync('test_key')
    
    if (testValue === 'test_value') {
      console.log('本地存储功能正常')
    }
    
  } catch (error) {
    console.error('本地存储功能异常:', error)
  }
}

// 检查网络状态
function checkNetworkStatus() {
  console.log('\n=== 网络状态检查 ===')
  
  wx.getNetworkType({
    success: function(res) {
      console.log('网络类型:', res.networkType)
      
      if (res.networkType === 'none') {
        console.warn('当前无网络连接')
      }
    },
    fail: function(error) {
      console.error('获取网络状态失败:', error)
    }
  })
}

// 主函数
async function main() {
  console.log('=== 微信小程序调试 ===')
  
  // 检查网络状态
  checkNetworkStatus()
  
  // 检查本地存储
  checkLocalStorage()
  
  // 不检查云数据库连接，项目使用本地存储
  console.log('\n=== 云开发检查 ===')
  console.log('项目使用本地存储，不使用云开发')
  
  console.log('=== 调试完成 ===')
}

// 运行主函数
main().catch(error => {
  console.error('调试过程中出现错误:', error)
})
