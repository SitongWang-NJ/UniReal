// pages/restaurant_search/restaurant_search.js
Page({
  data: {
    searchInput: '',
    searchResults: [],
    recommendations: [],
    page: 1,
    pageSize: 3,
    hasMore: true
  },

  onLoad() {
    this.loadMockData(); // 初始加载推荐数据
    this.loadPageData(); // 加载第一页
  },

  onReady() {},

  onShow() {},

  onHide() {},

  onUnload() {},

  onPullDownRefresh() {
    this.setData({
      page: 1,
      searchResults: [],
      hasMore: true
    });
    this.loadPageData(() => {
      wx.stopPullDownRefresh();
    });
  },

  onReachBottom() {
    if (this.data.hasMore) {
      this.loadPageData();
    } else {
      wx.showToast({ title: '没有更多了', icon: 'none' });
    }
  },

  onShareAppMessage() {
    return {
      title: '附近餐厅推荐',
      path: '/pages/restaurant_search/restaurant_search'
    };
  },

  onSearchInput(e) {
    const value = e.detail.value;
    this.setData({ searchInput: value });

    const filtered = this.data.recommendations.filter(item =>
      item.name.includes(value)
    );
    this.setData({ searchResults: filtered });
  },

  sortBy() {
    wx.showToast({ title: '点击了智能排序', icon: 'none' });
  },

  filterByLocation() {
    wx.showToast({ title: '点击了位置筛选', icon: 'none' });
  },

  filterByTime() {
    wx.showToast({ title: '点击了时间段筛选', icon: 'none' });
  },

  onBack() {
    wx.navigateBack();
  },

  goHome() {
    wx.reLaunch({ url: '/pages/index/index' });
  },

  goToDetail(e) {
    wx.showToast({ title: '跳转商家详情', icon: 'none' });
  },

  loadMockData() {
    const mock = [
      {
        id: 1,
        name: '星巴克中山路店',
        address: '中山路88号',
        openTime: '08:00 - 22:00',
        image: '/assets/starbucks.png'
      },
      {
        id: 2,
        name: '麦当劳人民广场',
        address: '人民广场东侧',
        openTime: '07:00 - 23:00',
        image: '/assets/mcdonalds.png'
      },
      {
        id: 3,
        name: '海底捞火锅',
        address: '万达广场三楼',
        openTime: '10:00 - 02:00',
        image: '/assets/haidilao.png'
      },
      {
        id: 4,
        name: '肯德基龙阳路店',
        address: '龙阳路地铁口',
        openTime: '06:30 - 22:30',
        image: '/assets/kfc.png'
      },
      {
        id: 5,
        name: '必胜客人民广场',
        address: '人民广场西南角',
        openTime: '09:00 - 22:00',
        image: '/assets/pizza.png'
      },
      {
        id: 6,
        name: '五芳斋粽子店',
        address: '南京东路100号',
        openTime: '07:00 - 20:00',
        image: '/assets/wufangzhai.png'
      }
    ];
    this.setData({ recommendations: mock });
  },

  loadPageData(callback) {
    const { page, pageSize, recommendations, searchResults } = this.data;

    const start = (page - 1) * pageSize;
    const end = start + pageSize;

    const newItems = recommendations.slice(start, end);
    const hasMore = end < recommendations.length;

    this.setData({
      searchResults: searchResults.concat(newItems),
      page: page + 1,
      hasMore
    }, () => {
      if (callback) callback();
    });
  }
});
