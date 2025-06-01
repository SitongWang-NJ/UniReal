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
    // 获取用户信息前先进行登录
    wx.login({
      success: (loginRes) => {
        if (loginRes.code) {
          // 使用 getUserProfile 获取用户信息
          wx.getUserProfile({
            desc: '用于完善会员资料', // 声明获取用户个人信息后的用途
            success: (res) => {
              console.log('获取用户信息成功:', res.userInfo)
              
              // 保存用户信息到本地存储
              wx.setStorageSync('userInfo', res.userInfo)
              
              // 显示登录成功提示
              wx.showToast({
                title: '登录成功',
                icon: 'success',
                duration: 200
              })
              
              // 登录成功后跳转到首页
              setTimeout(() => {
                wx.switchTab({
                  url: '/pages/home/home',
                })
              }, 200)
            },
            fail: (err) => {
              console.log('获取用户信息失败:', err)
              wx.showToast({
                title: '以游客身份登录',
                icon: 'none',
                duration: 200
              })
              
              // 即使授权失败，也跳转到首页
              setTimeout(() => {
                wx.switchTab({
                  url: '/pages/home/home',
                })
              }, 200)
            }
          })        } else {
          console.log('登录失败！' + loginRes.errMsg)
          wx.showToast({
            title: '登录失败',
            icon: 'none',
            duration: 200
          })
          
          // 即使微信登录失败，也跳转到首页
          setTimeout(() => {
            wx.switchTab({
              url: '/pages/home/home',
            })
          }, 200)
        }
      },
      fail: (err) => {
        console.log('微信登录接口调用失败:', err)
        wx.showToast({
          title: '登录失败，请重试',
          icon: 'none',
          duration: 200
        })
        
        // 即使微信登录接口调用失败，也跳转到首页
        setTimeout(() => {
          wx.switchTab({
            url: '/pages/home/home',
          })
        }, 200)
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
