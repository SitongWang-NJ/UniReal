// components/content-card/content-card.js
Component({
  properties: {
    item: {
      type: Object,
      value: {}
    }
  },
  methods: {
    onCardTap() {
      this.triggerEvent('cardClick', { id: this.data.item.id });
    }
  }
});
