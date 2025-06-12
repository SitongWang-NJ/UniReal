// pages/login/login.js
Page({
  data: {
    // 页面的初始数据
  },
  onLoad: function (options) {
    // 页面加载时执行的函数
  },  // 微信登录
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
              
              // 将用户信息和登录凭证(code)保存到云数据库
              this.saveUserInfoToCloud(res.userInfo, loginRes.code)
              
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
  },  // 手机号登录
  handlePhoneLogin: function() {
    wx.navigateTo({
      url: '/pages/phoneLogin/phoneLogin',
    })
  },
  
  // 保存用户信息到云数据库
  saveUserInfoToCloud: function(userInfo, code) {
    // 确保云环境已初始化
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
      return
    }
    
    // 获取当前时间
    const now = new Date()
    
    // 准备要保存的用户数据
    const userData = {
      userInfo: userInfo,
      code: code,
      loginTime: now,
      lastLoginTime: now,
      createTime: now,
      updateTime: now
    }
    
    // 调用云函数登录，获取openid
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('云函数调用成功:', res)
        
        // 获取到openid
        const openid = res.result.openid
        
        // 添加openid到用户数据
        userData.openid = openid
        
        // 检查用户是否已存在
        const db = wx.cloud.database()
        db.collection('users').where({
          openid: openid
        }).get().then(res => {
          if (res.data.length > 0) {
            // 用户已存在，更新用户信息
            const userId = res.data[0]._id
            db.collection('users').doc(userId).update({
              data: {
                userInfo: userInfo,
                lastLoginTime: now,
                updateTime: now
              }
            }).then(() => {
              console.log('用户信息更新成功')
            }).catch(err => {
              console.error('更新用户信息失败:', err)
            })
          } else {
            // 用户不存在，创建新用户
            db.collection('users').add({
              data: userData
            }).then(() => {
              console.log('用户信息保存成功')
            }).catch(err => {
              console.error('保存用户信息失败:', err)
            })
          }
        }).catch(err => {
          console.error('查询用户失败:', err)
        })
      },
      fail: err => {
        console.error('云函数调用失败:', err)
      }
    })
  }
})
