// pages/rest/rest.js
Page({
  data: {
    currentCity: '广州',

    iconItems: [
      { id: 'food', text: '美食', icon: '/images/food.png' },
      { id: 'scenic', text: '景点', icon: '/images/scenic.png' },
      { id: 'hotel', text: '酒店', icon: '/images/hotel.png' },
      { id: 'massage', text: '按摩', icon: '/images/massage.png' },
      { id: 'supermarket', text: '超市', icon: '/images/supermarket.png' },
      { id: 'toilet', text: '洗手间', icon: '/images/toilet.png' },
      { id: 'charging', text: '充电站', icon: '/images/charging.png' },
      { id: 'restroom', text: '休息屋', icon: '/images/restroom.png' }
    ],

    promoTabs: [
      { id: 'recommend', text: '为你推荐' },
      { id: 'discount', text: '限时优惠' },
      { id: 'popular', text: '热门打卡' },
      { id: 'quiet', text: '安静休息' },
      { id: 'foodie', text: '吃货专区' }
    ],
    selectedPromo: 'recommend',

    categoryTabs: [
      { id: 'recommend', text: '推荐' },
      { id: 'nearby', text: '附近' },
      { id: 'food', text: '美食' },
      { id: 'coffee', text: '咖啡' },
      { id: 'relax', text: '按摩' },
      { id: 'store', text: '便利店' }
    ],
    selectedCategory: 'recommend',

    contentList: [
      {
        id: 1,
        name: '星巴克中山路店',
        address: '中山路88号',
        openTime: '08:00 - 22:00',
        image: '/images/stores/sb.jpg'
      },
      {
        id: 2,
        name: '麦当劳人民广场',
        address: '人民广场东侧',
        openTime: '07:00 - 23:00',
        image: '/images/stores/M.jpg'
      }
    ]
  },

  handleCitySelect() {
    wx.showToast({ title: '城市选择功能暂未实现', icon: 'none' });
  },

  goToSearchPage() {
    wx.navigateTo({ url: '/pages/restaurant_search/restaurant_search' });
  },

  openProfile() {
    wx.showToast({ title: '打开个人中心', icon: 'none' });
  },

  handleIconClick(e) {
    const id = e.detail.id;
    wx.showToast({ title: `点击了：${id}`, icon: 'none' });
  },

  onPromoTabClick(e) {
    this.setData({ selectedPromo: e.detail.id });
  },

  onCategoryChange(e) {
    this.setData({ selectedCategory: e.detail.id });
  },

  onCardClick(e) {
    const id = e.detail.id;
    wx.navigateTo({
      url: `/pages/restaurant_detail/restaurant_detail?id=${id}`
    });
  }
});
