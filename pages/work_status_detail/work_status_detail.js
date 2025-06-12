// pages/work_status_detail/work_status_detail.js
Page({
  data: {
    summary: {
      orders: 12,
      distance: 22.4,
      income: 89.5,
      status: '工作中',
      incomeProgress: 60
    },
    orders: [
      { id: 1, time: '08:30', restaurant: '肯德基', amount: 15.2, distance: 2.1, status: '已完成' },
      { id: 2, time: '09:00', restaurant: '海底捞', amount: 21.0, distance: 3.3, status: '已完成' },
      { id: 3, time: '10:15', restaurant: '麦当劳', amount: 12.8, distance: 1.9, status: '配送中' }
    ]
  }
})
