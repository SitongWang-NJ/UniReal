// components/icon-grid/icon-grid.js
Component({
  properties: {
    items: {
      type: Array,
      value: []
    }
  },
  methods: {
    onIconTap(e) {
      const id = e.currentTarget.dataset.id;
      this.triggerEvent('iconClick', { id });
    }
  }
});
