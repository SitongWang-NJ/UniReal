// pages/restaurant_detail/restaurant_detail.js
// pages/restaurant_detail/restaurant_detail.js
Page({
  data: {
    restaurant: {
      name: '莲·现代日式料理',
      rating: 4.6,
      comments: 1299,
      avgPrice: 229,
      scores: {
        taste: 4.5,
        env: 4.7,
        service: 4.6,
        ingredient: 4.6
      },
      type: '日本料理',
      area: '长隆/南村',
      rank: '番禺区日料热门榜 第6名',
      visits: '近30天101人打卡',
      status: '休息中',
      hours: '11:30–14:00, 17:30–22:00',
      address: '番禺区四海城东区 LG2层 23-25号',
      tips: '日式禅意氛围 · 木质装潢 · 板前师傅详解菜品',
      images: [
        '/assets/restaurant1.jpg',
        '/assets/restaurant2.jpg',
        '/assets/restaurant3.jpg'
      ]
    }
  },

  goBack() {
    wx.navigateBack();
  },

  onFavorite() {
    wx.showToast({ title: '收藏功能未实现', icon: 'none' });
  },

  onShare() {
    wx.showToast({ title: '分享功能未实现', icon: 'none' });
  },

  onMap() {
    wx.openLocation({
      latitude: 23.1291,
      longitude: 113.2644,
      name: '莲·现代日式料理',
      address: '番禺区四海城东区 LG2层 23-25号'
    });
  },

  onCall() {
    wx.makePhoneCall({
      phoneNumber: '020-88888888'
    });
  }
});
