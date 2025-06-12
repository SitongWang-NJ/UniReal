// pages/hotzone/hotzone.js
Page({
  data: {
    latitude: 2.54309,
    longitude: 11.3242,
    markers: [
      { id: 1, latitude: 2.54309, longitude: 11.3242, name: '热区1' },
      { id: 2, latitude: 2.5254, longitude: 11.33678, name: '热区2' },
      { id: 3, latitude: 2.5754, longitude: 11.31234, name: '热区3' },
    ],
    heatmapData: [
      { latitude: 2.54309, longitude: 11.3242, weight: 10 },
      { latitude: 2.5254, longitude: 11.33678, weight: 80 },
      { latitude: 2.5754, longitude: 11.31234, weight: 120 },
    ]
  },
  onLoad: function (options) {
    // 页面加载时执行的函数
  }
})
