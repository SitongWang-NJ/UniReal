// components/traffic-card/traffic-card.js
Component({
  properties: {
    roadName: {
      type: String,
      value: '中山大道'
    },
    status: {
      type: String,
      value: '车流：缓'
    },
    advice: {
      type: String,
      value: '宜：安全配送，忌：疲劳驾驶'
    }
  }
});
