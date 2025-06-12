// components/category-tabs/category-tabs.js
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
      this.triggerEvent('tabChange', { id });
    }
  }
});
