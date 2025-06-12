// components/geo-circle-map/geo-circle-map.js
Component({
  properties: {
    // 外部传入的圆数据列表
    circleData: {
      type: Array,
      value: []
    },
    // 描边和填充颜色（可带透明度）
    strokeColor: {
      type: String,
      value: '#1890FFAA'
    },
    fillColor: {
      type: String,
      value: '#1890FF33'
    },
    // 默认半径（米）
    defaultRadius: {
      type: Number,
      value: 500
    },
    // 地图缩放级别
    scale: {
      type: Number,
      value: 15
    }
  },
  data: {
    latitude: 23.129163,   // 默认广州中心
    longitude: 113.264435, // 默认广州中心
    circles: []
  },
  lifetimes: {
    attached() {
      this.initMap();
    }
  },
  methods: {
    // 初始化：定位 + 划圈
    initMap() {
      console.log('GeoCircleMap attached')
      wx.getLocation({
        type: 'gcj02',
        success: res => {
          this.setData({
            latitude: res.latitude,
            longitude: res.longitude
          });
          this.prepareCircles();
          console.log('定位成功', res)
        },
        fail: () => {
          console.warn('定位失败，使用默认中心点');
          this.prepareCircles();
        }
      });
    },
    // 根据属性 circleData 或 占位数据 生成 circles
    prepareCircles() {
      const raw = this.properties.circleData.length
        ? this.properties.circleData
        : [{
            latitude: this.data.latitude,
            longitude: this.data.longitude,
            radius: this.properties.defaultRadius
          }];
      const circles = raw.map(item => ({
        latitude: item.latitude,
        longitude: item.longitude,
        radius: item.radius,
        color: this.properties.strokeColor,
        fillColor: this.properties.fillColor,
        strokeWidth: 2
      }));
      this.setData({ circles });
    },
    // 外部可调用：新增一个圈
    addCircle(item) {
      const raw = [...this.properties.circleData, item];
      this.triggerEvent('updateCircleData', raw);
      // 如需立即生效，可 this.prepareCircles();
    },
    // 地图事件示例
    onRegionChange(e) {
      this.triggerEvent('regionChange', e);
    },
    onMarkerTap(e) {
      this.triggerEvent('markerTap', e);
    }
  }
});
