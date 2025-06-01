// pages/index/index.js
Page({
  data: {
    currentTimeSlot: null,
    timeSlots: [
      { id: 1, start: '14:40', end: '15:00' },
      { id: 2, start: '15:00', end: '15:20' },
      { id: 3, start: '15:20', end: '15:40' },
    ]
  },

  onLoad(options) {
    // 初始化
  },

  selectTimeSlot(e) {
    const selectedId = e.currentTarget.dataset.id;
    this.setData({
      currentTimeSlot: selectedId
    });
    this.updateRecommendations(selectedId);
  },

  updateRecommendations(timeSlotId) {
    console.log('更新推荐商家，时间段ID:', timeSlotId);
    // 可根据时间段请求新数据
  },

  goToSearch() {
    wx.navigateTo({
      url: '/pages/restaurant_search/restaurant_search',
    });
  },

  goToWorkDetail() {
    wx.navigateTo({
      url: '/pages/work_status_detail/work_status_detail'
    });    
  }
});
