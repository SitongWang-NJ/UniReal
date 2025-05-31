// pages/login/login.js
Page({
  data: {
    // 页面的初始数据
  },
  onLoad: function (options) {
    // 页面加载时执行的函数
  },
  // 微信登录
  handleWechatLogin: function() {
    wx.login({
      success: (res) => {
        if (res.code) {
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          // 这里模拟登录成功
          wx.showToast({
            title: '登录成功',
            icon: 'success',
            duration: 200
          })
          // 登录成功后跳转到首页
          wx.switchTab({
            url: '/pages/index/index',
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },
  // 手机号登录
  handlePhoneLogin: function() {
    wx.navigateTo({
      url: '/pages/phoneLogin/phoneLogin',
    })
  }
})
