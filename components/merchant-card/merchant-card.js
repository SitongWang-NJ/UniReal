// components/merchant-card/merchant-card.js
Component({
  properties: {
    image: String,
    name: String,
    address: String,
    openTime: String
  },
  methods: {
    onTap() {
      this.triggerEvent('click'); // 可用于页面跳转等操作
    }
  }
});
