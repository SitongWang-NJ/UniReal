// pages/data/data.js
Page({
  data: {
    orderCount: 10,
    income: 5600,
    workHours: 12
  },
  onLoad: function (options) {
    // 页面加载时执行的函数
  },
  // 提醒休息
  remindRest: function() {
    wx.showModal({
      title: '提示',
      content: '您已连续工作2小时，请立即休息10分钟。',
      showCancel: false
    })
  }
})
