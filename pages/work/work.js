// pages/work/work.js
Page({
  data: {
    tasks: [
      { id: 1, orderId: 'OD123456', address: '广州市天河区珠江新城', distance: '3.2km' },
      { id: 2, orderId: 'OD2345678', address: '广州市越秀区中山二路', distance: '1.8km' },
      { id: 3, orderId: 'OD34567890', address: '广州市黄埔区开发大道', distance: '5.6km' },
    ],
    currentTaskIndex: 0
  },
  onLoad: function (options) {
    // 页面加载时执行的函数
  },
  // 开始下一个任务
  startNextTask: function() {
    let nextIndex = this.data.currentTaskIndex + 1;
    if (nextIndex >= this.data.tasks.length) {
      wx.showModal({
        title: '提示',
        content: '所有任务已完成！',
        showCancel: false,
        success: (res) => {
          if (res.confirm) {
            wx.navigateBack();
          }
        }
      });
    } else {
      this.setData({
        currentTaskIndex: nextIndex
      });
    }
  },
  // 完成当前任务
  completeTask: function() {
    let tasks = this.data.tasks;
    tasks.splice(this.data.currentTaskIndex, 1);
    this.setData({
      tasks: tasks,
      currentTaskIndex: Math.min(this.data.currentTaskIndex, tasks.length - 1)
    });
    if (tasks.length === 0) {
      wx.showModal({
        title: '提示',
        content: '所有任务已完成！',
        showCancel: false,
        success: (res) => {
          if (res.confirm) {
            wx.navigateBack();
          }
        }
      });
    }
  }
})
