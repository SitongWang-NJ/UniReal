// components/search-header/search-header.js
Component({
  properties: {
    city: {
      type: String,
      value: '广州'
    },
    placeholder: {
      type: String,
      value: '搜索休息场所...'
    }
  },
  methods: {
    onSelectCity() {
      this.triggerEvent('selectCity');
    },
    onSearch() {
      this.triggerEvent('searchTap');
    },
    onAvatarClick() {
      this.triggerEvent('avatarTap');
    }
  }
});
