// pages/personal/personal.js
Page({

  /**
   * 页面的初始数据
   */  data: {
    userInfo: null,
    hasUserInfo: false,
    workerId: 'W20250602', // 示例工号
    isTabPage: true, // 默认当作tabBar页面处理
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getUserInfo();
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
    this.getUserInfo();
    
    // 检查当前页面是否是通过tabBar打开的还是通过页面跳转打开的
    const pages = getCurrentPages();
    // 如果页面栈只有一个页面，说明是从tabBar进入的
    const isTabPage = pages.length <= 1;
    
    this.setData({
      isTabPage: isTabPage
    });
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
   * 跳转到首页或返回上一页
   */
  goToHome() {
    // 检查页面栈，如果是通过跳转进入的，则返回上一页；否则跳转到首页
    const pages = getCurrentPages();
    // 如果当前页面不是通过tabBar进入的，且存在前一页，则返回
    if (pages.length > 1) {
      wx.navigateBack({
        delta: 1
      });
    } else {
      // 否则跳转到首页
      wx.switchTab({
        url: '/pages/home/home',
      });
    }
  },
    /**
   * 跳转到历史订单页面
   */
  goToHistory() {
    wx.navigateTo({
      url: '/pages/order_history/order_history'
    });
  },
  
  /**
   * 跳转到设置页面
   */
  goToSettings() {
    wx.navigateTo({
      url: '/pages/settings/settings',
    });
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

  }
})