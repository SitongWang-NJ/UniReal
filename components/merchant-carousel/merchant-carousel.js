// components/merchant-carousel/merchant-carousel.js
Component({
  properties: {
    merchants: {
      type: Array,
      value: []
    }
  },
  data: {
    defaultMerchants: [
      {
        id: 1,
        name: '星巴克中山路店',
        image: '/assets/starbucks.png',
        tag: '甜品·咖啡'
      },
      {
        id: 2,
        name: '海底捞火锅',
        image: '/assets/haidilao.png',
        tag: '火锅'
      },
      {
        id: 3,
        name: '麦当劳人民广场',
        image: '/assets/mcdonalds.png',
        tag: '快餐·汉堡'
      },
      {
        id: 4,
        name: '肯德基龙阳路店',
        image: '/assets/kfc.png',
        tag: '炸鸡·快餐'
      },
      {
        id: 5,
        name: '必胜客人民广场',
        image: '/assets/pizza.png',
        tag: '西餐·披萨'
      },
      {
        id: 6,
        name: '五芳斋粽子店',
        image: '/assets/wufangzhai.png',
        tag: '中式点心'
      },
      {
        id: 7,
        name: '喜茶南京东路店',
        image: '/assets/xicha.png',
        tag: '奶茶·饮品'
      },
      {
        id: 8,
        name: '黄焖鸡米饭',
        image: '/assets/huangmenji.png',
        tag: '家常菜'
      }
    ]    
  },
  computed: {
    // 模拟合并（使用新版特性时可用）
  },
  methods: {
    onCardTap(e) {
      const id = e.currentTarget.dataset.id;
      this.triggerEvent('cardTap', { id });
    }
  },
  lifetimes: {
    attached() {
      // 如果外部没有传 merchants，就用默认的 mock 数据
      if (!this.properties.merchants || this.properties.merchants.length === 0) {
        this.setData({
          merchants: this.data.defaultMerchants
        });
      }
    }
  }
});
