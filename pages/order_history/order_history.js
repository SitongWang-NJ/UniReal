// pages/order_history/order_history.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderList: [],
    loading: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.loadOrderHistory();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    // 页面显示时刷新数据
    this.loadOrderHistory();
  },

  /**
   * 加载订单历史
   */
  loadOrderHistory() {
    // 显示加载中
    wx.showLoading({
      title: '加载中',
    });

    // 设置加载状态
    this.setData({
      loading: true
    });

    // 从云数据库加载数据
    // 使用模拟数据进行演示
    setTimeout(() => {
      const mockOrderList = [
        {
          id: 'ORDER20250601001',
          date: '2025-06-01',
          time: '12:30',
          status: '已完成',
          amount: '25.50',
          restaurant: '好味快餐',
          address: '创新大厦3栋101室',
          customer: '张先生',
          phone: '138****1234',
          distance: '2.5km',
          images: ['/images/delivery.png', '/images/personal.png'],
          video: 'https://example.com/video1.mp4'
        },
        {
          id: 'ORDER20250531002',
          date: '2025-05-31',
          time: '18:45',
          status: '已完成',
          amount: '42.80',
          restaurant: '川味小馆',
          address: '科技园B区5栋2单元303室',
          customer: '李女士',
          phone: '139****5678',
          distance: '3.2km',
          images: ['/images/delivery.png', '/images/personal.png'],
          video: 'https://example.com/video2.mp4'
        },
        {
          id: 'ORDER20250530003',
          date: '2025-05-30',
          time: '20:15',
          status: '已完成',
          amount: '56.00',
          restaurant: '米兰西餐厅',
          address: '文化路189号时代广场4楼',
          customer: '王先生',
          phone: '137****9012',
          distance: '4.8km',
          images: ['/images/delivery.png', '/images/personal.png'],
          video: 'https://example.com/video3.mp4'
        }
      ];

      this.setData({
        orderList: mockOrderList,
        loading: false
      });

      wx.hideLoading();
    }, 1500);
  },  /**
   * 返回上一个界面
   */
  goBack() {
    // 检查页面栈，如果有上一页则返回，否则跳转到个人中心
    const pages = getCurrentPages();
    if (pages.length > 1) {
      wx.navigateBack({
        delta: 1,  // 返回上一页
        success: () => {
          console.log('成功返回上一页');
        },
        fail: (err) => {
          console.error('返回失败:', err);
          // 如果返回失败，尝试跳转到个人中心
          wx.switchTab({
            url: '/pages/personal/personal',
          });
        }
      });
    } else {
      wx.switchTab({
        url: '/pages/personal/personal',
      });
    }
  },

  /**
   * 查看订单详情
   */
  viewOrderDetail(e) {
    const orderId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/order_detail/order_detail?id=${orderId}`,
    });
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
    this.loadOrderHistory();
    wx.stopPullDownRefresh();
  }
})
