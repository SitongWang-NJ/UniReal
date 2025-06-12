// pages/geomap_tst/geomap_tst.js
Page({
  data: {
    // 如果为空，将自动使用组件内的默认占位圈
    myCircles: [
      { latitude: 23.1246, longitude: 113.361, radius: 400 },
      { latitude: 23.125, longitude: 113.360, radius: 600 },
      { latitude: 23.124600, longitude: 113.370796, radius: 200 },
      { latitude: 23.129895, longitude: 113.368925, radius: 100 },
      { latitude: 23.133168, longitude: 113.364027, radius: 30 },
      { latitude: 23.133168, longitude: 113.357973, radius: 20 },
      { latitude: 23.129895, longitude: 113.353075, radius: 30 },
      { latitude: 23.124600, longitude: 113.351204, radius: 20 },
      { latitude: 23.119305, longitude: 113.353075, radius: 60 },
      { latitude: 23.116032, longitude: 113.357973, radius: 90 },
      { latitude: 23.116032, longitude: 113.364027, radius: 70 },
      { latitude: 23.119305, longitude: 113.368925, radius: 40 }
    ]
  },

  handleRegionChange(e) {
    console.log('地图视野或缩放变化：', e);
  },

  handleMarkerTap(e) {
    console.log('点击了标记：', e);
  }
});
