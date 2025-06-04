// pages/settings/settings.js
Page({
  /**
   * 页面的初始数据
   */  data: {
    userInfo: null,
    hasUserInfo: false,
    settingGroups: [
      {
        title: '',
        items: [
          { id: 'personal', name: '返回', icon: 'personal' }
        ]
      },
      {
        title: '账号设置',
        items: [
          { id: 'profile', name: '个人资料', icon: 'profile' },
          { id: 'security', name: '账号安全', icon: 'security' },
          { id: 'verification', name: '实名认证', icon: 'verification' }
        ]
      },
      {
        title: '通用设置',
        items: [
          { id: 'notification', name: '消息通知', icon: 'notification' },
          { id: 'privacy', name: '隐私设置', icon: 'privacy' },
          { id: 'language', name: '语言设置', icon: 'language' },
          { id: 'camera', name: '摄像头画面', icon: 'camera' },
          { id: 'clear', name: '清除缓存', icon: 'clear' }
        ]
      },      {
        title: '其他',
        items: [
          { id: 'about', name: '关于我们', icon: 'about' },
          { id: 'feedback', name: '意见反馈', icon: 'feedback' },
          { id: 'help', name: '使用帮助', icon: 'help' },
          { id: 'logout', name: '退出登录', icon: 'logout' }
        ]
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },
  /**
   * 返回上一页
   */
  goBack() {
    // 如果有上一页历史，则返回上一页；否则跳转到个人中心页面
    const pages = getCurrentPages();
    if (pages.length > 1) {
      wx.navigateBack();
    } else {
      this.goToPersonal();
    }
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.getUserInfo();
  },
  
  /**
   * 获取用户信息
   */
  getUserInfo() {
    const userInfo = wx.getStorageSync('userInfo');
    if (userInfo) {
      this.setData({
        userInfo,
        hasUserInfo: true
      });
    }
  },
  /**
   * 设置项点击事件
   */
  handleSettingTap(e) {
    const { groupIndex, itemIndex } = e.currentTarget.dataset;
    const setting = this.data.settingGroups[groupIndex].items[itemIndex];
    
    // 根据不同的设置ID处理不同的功能
    switch(setting.id) {
      case 'logout':
        this.handleLogout();
        break;
      
      case 'clear':
        this.handleClearCache();
        break;
      
      case 'personal':
        this.goToPersonal();
        break;

      case 'camera':
        this.goToWebCamera();
        break;
      
      default:
        wx.showToast({
          title: `${setting.name}功能开发中`,
          icon: 'none',
          duration: 2000
        });
        break;
    }
  },
  
  /**
   * 处理退出登录
   */
  handleLogout() {
    wx.showModal({
      title: '退出登录',
      content: '确定要退出登录吗？',
      success: (res) => {
        if (res.confirm) {
          // 清除用户信息
          wx.removeStorageSync('userInfo');
          
          // 返回到登录页
          wx.reLaunch({
            url: '/pages/login/login',
          });
        }
      }
    });
  },
    /**
   * 处理清除缓存
   */
  handleClearCache() {
    wx.showLoading({
      title: '正在清除缓存',
    });
    
    setTimeout(() => {
      wx.hideLoading();
      wx.showToast({
        title: '缓存清除成功',
        icon: 'success',
        duration: 2000
      });
    }, 1500);
  },
  
  /**
   * 跳转到个人中心页面
   */
  goToPersonal() {
    wx.switchTab({
      url: '/pages/personal/personal',
    })
  },

  /**
   * 跳转到摄像头画面页面
   */
  goToWebCamera() {
    wx.navigateTo({
      url: '/pages/webcamera/webcamera',
    })
  }
})
