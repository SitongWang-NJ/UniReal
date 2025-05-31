// components/tab-card-switch/tab-card-switch.js
Component({
  data: {
    currentTab: 'restaurant' // 初始为餐厅休息
  },
  methods: {
    switchTab(e) {
      const tab = e.currentTarget.dataset.tab;
      this.setData({ currentTab: tab });
    },
    handleClick() {
      const current = this.data.currentTab;
      if (current === 'restaurant') {
        wx.navigateTo({
          url: '/pages/restaurant_search/restaurant_search'
        });
      } else if (current === 'scenery') {
        wx.navigateTo({
          url: '/pages/restaurant_search/restaurant_search'
        });
      }
    }
  }
});


