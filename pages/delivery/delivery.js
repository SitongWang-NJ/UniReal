// pages/delivery/delivery.js
Page({
  data: {
    trendData: [
      { date: '5-25', value: 10 },
      { date: '5-26', value: 14 },
      { date: '5-27', value: 18 },
      { date: '5-28', value: 13 },
      { date: '5-29', value: 17 },
      { date: '5-30', value: 22 },
      { date: '5-31', value: 20 }
    ],
    insight: {
      topRestaurant: '星巴克中山路店',
      topDestination: '人民广场',
      orderCount: 18,
      rating: 98
    },
    traffic: {
      roadName: '中山大道',
      status: '车流：缓',
      advice: '宜：安全配送，忌：疲劳驾驶'
    }
  }
});
