// pages/value-calendar-test/value-calendar-test.js
Page({
  data: {
    // 示例数据：为当前年月的若干天设置强度值
    calendarValues: {
      "2025-06-01": 0.1,
      "2025-06-03": 0.4,
      "2025-06-05": 0.8,
      "2025-06-10": 0.6,
      "2025-06-15": 1.0,
      "2025-06-20": 0.3,
      "2025-06-25": 0.5,
      "2025-06-30": 0.9
    }
  },

  onLoad() {
    // 如果需要动态计算当前年月，可在这里修改
  },

  // 监听组件的 select 事件
  onDateSelect(e) {
    const date = e.detail.date;
    wx.showToast({
      title: `你点击了 ${date}`,
      icon: 'none'
    });
  }
});


