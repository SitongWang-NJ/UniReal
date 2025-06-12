// pages/canvas/canvas.js
Page({
  onDetailsTap() {
    wx.showToast({
      title: '查看送单详情',
      icon: 'none'
    });

    // 示例跳转
    wx.navigateTo({
      url: '/pages/delivery-detail/index'
    });
  }
});
