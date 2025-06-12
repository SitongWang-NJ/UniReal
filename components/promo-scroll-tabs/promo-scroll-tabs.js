// components/promo-scroll-tabs/promo-scroll-tabs.js
Component({
  properties: {
    tabs: {
      type: Array,
      value: []
    },
    activeId: {
      type: String,
      value: ''
    }
  },
  methods: {
    onTabClick(e) {
      const id = e.currentTarget.dataset.id;
      this.triggerEvent('tabClick', { id });
    }
  }
});
