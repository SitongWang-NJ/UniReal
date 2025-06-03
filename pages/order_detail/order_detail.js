// pages/order_detail/order_detail.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    orderId: '',
    orderDetail: null,
    loading: true,
    videoContext: null,
    currentImageIndex: 0,
    showFullScreenImage: false,
    showFullScreenVideo: false,
    currentMediaType: '', // 'image' 或 'video'
    returnOption: { id: 'history', name: '返回', icon: 'history' }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    if (options.id) {
      this.setData({
        orderId: options.id
      });
      this.loadOrderDetail(options.id);
    } else {
      wx.showToast({
        title: '订单ID不存在',
        icon: 'error'
      });
      setTimeout(() => {
        wx.navigateBack();
      }, 1500);
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    this.setData({
      videoContext: wx.createVideoContext('deliveryVideo')
    });
  },

  /**
   * 加载订单详情
   */
  loadOrderDetail(orderId) {
    wx.showLoading({
      title: '加载中',
    });

    this.setData({
      loading: true
    });

    // 模拟从服务器获取订单详情
    setTimeout(() => {
      // 模拟数据
      const mockOrder = {
        id: orderId,
        date: orderId === 'ORDER20250601001' ? '2025-06-01' : 
              orderId === 'ORDER20250531002' ? '2025-05-31' : '2025-05-30',
        time: orderId === 'ORDER20250601001' ? '12:30' : 
              orderId === 'ORDER20250531002' ? '18:45' : '20:15',
        status: '已完成',
        amount: orderId === 'ORDER20250601001' ? '25.50' : 
                orderId === 'ORDER20250531002' ? '42.80' : '56.00',
        restaurant: orderId === 'ORDER20250601001' ? '好味快餐' : 
                    orderId === 'ORDER20250531002' ? '川味小馆' : '米兰西餐厅',
        restaurantAddress: orderId === 'ORDER20250601001' ? '科技园A区2栋1层' : 
                           orderId === 'ORDER20250531002' ? '大学城南路12号' : '文化路189号时代广场2楼',
        address: orderId === 'ORDER20250601001' ? '创新大厦3栋101室' : 
                 orderId === 'ORDER20250531002' ? '科技园B区5栋2单元303室' : '文化路189号时代广场4楼',
        customer: orderId === 'ORDER20250601001' ? '张先生' : 
                  orderId === 'ORDER20250531002' ? '李女士' : '王先生',
        phone: orderId === 'ORDER20250601001' ? '138****1234' : 
               orderId === 'ORDER20250531002' ? '139****5678' : '137****9012',
        distance: orderId === 'ORDER20250601001' ? '2.5km' : 
                  orderId === 'ORDER20250531002' ? '3.2km' : '4.8km',
        deliveryTime: orderId === 'ORDER20250601001' ? '28分钟' : 
                      orderId === 'ORDER20250531002' ? '35分钟' : '42分钟',
        remark: orderId === 'ORDER20250601001' ? '不要辣，多加点醋' : 
                orderId === 'ORDER20250531002' ? '请放在门口，不用敲门' : '汤和主食分开包装',
        products: [
          {
            name: orderId === 'ORDER20250601001' ? '宫保鸡丁套餐' : 
                  orderId === 'ORDER20250531002' ? '麻婆豆腐套餐' : '牛排套餐',
            price: orderId === 'ORDER20250601001' ? '22.00' : 
                   orderId === 'ORDER20250531002' ? '35.00' : '48.00',
            count: 1
          },
          {
            name: orderId === 'ORDER20250601001' ? '可乐' : 
                  orderId === 'ORDER20250531002' ? '米饭' : '沙拉',
            price: orderId === 'ORDER20250601001' ? '3.50' : 
                   orderId === 'ORDER20250531002' ? '2.00' : '8.00',
            count: orderId === 'ORDER20250601001' ? 1 : 
                   orderId === 'ORDER20250531002' ? 3 : 1
          }
        ],
        timeline: [
          {
            time: orderId === 'ORDER20250601001' ? '12:05' : 
                  orderId === 'ORDER20250531002' ? '18:15' : '19:45',
            status: '订单接收'
          },
          {
            time: orderId === 'ORDER20250601001' ? '12:10' : 
                  orderId === 'ORDER20250531002' ? '18:25' : '19:55',
            status: '商家备餐中'
          },
          {
            time: orderId === 'ORDER20250601001' ? '12:15' : 
                  orderId === 'ORDER20250531002' ? '18:30' : '20:00',
            status: '骑手取餐'
          },
          {
            time: orderId === 'ORDER20250601001' ? '12:30' : 
                  orderId === 'ORDER20250531002' ? '18:45' : '20:15',
            status: '订单送达'
          }
        ],
        images: [
          '/images/delivery.png', 
          '/images/personal.png',
          '/images/home.png'
        ],
        video: 'https://example.com/video1.mp4'  // 这里应该是一个实际的视频链接
      };

      this.setData({
        orderDetail: mockOrder,
        loading: false
      });

      wx.hideLoading();
    }, 1500);
  },  /**
   * 返回上一页
   */
  goBack() {
    // 检查页面栈，如果有上一页则返回，否则跳转到历史订单页面
    const pages = getCurrentPages();
    if (pages.length > 1) {
      wx.navigateBack({
        delta: 1
      });
    } else {
      wx.navigateTo({
        url: '/pages/order_history/order_history',
      });
    }
  },
  /**
   * 预览图片
   */
  previewImage(e) {
    const index = e.currentTarget.dataset.index;
    const urls = this.data.orderDetail.images;
    
    this.setData({
      currentImageIndex: index,
      showFullScreenImage: true,
      currentMediaType: 'image'
    });
  },

  /**
   * 关闭图片预览
   */
  closeImagePreview() {
    this.setData({
      showFullScreenImage: false
    });
  },
  
  /**
   * 预览视频
   */
  previewVideo() {
    this.setData({
      showFullScreenVideo: true,
      currentMediaType: 'video'
    });
    
    // 延迟一下再播放视频，确保DOM已更新
    setTimeout(() => {
      const fullscreenVideoContext = wx.createVideoContext('fullscreenVideo');
      fullscreenVideoContext.play();
    }, 300);
  },
  
  /**
   * 关闭视频预览
   */
  closeVideoPreview() {
    this.setData({
      showFullScreenVideo: false
    });
  },
  
  /**
   * 返回媒体预览
   */
  backFromMediaPreview() {
    if (this.data.currentMediaType === 'image') {
      this.closeImagePreview();
    } else if (this.data.currentMediaType === 'video') {
      this.closeVideoPreview();
    }
  },

  /**
   * 播放视频
   */
  playVideo() {
    this.data.videoContext.play();
  },
  /**
   * 视频播放错误
   */
  videoError(e) {
    console.error('视频播放错误:', e.detail.errMsg);
    wx.showToast({
      title: '视频加载失败',
      icon: 'none'
    });
  },
  
  /**
   * 滑动切换图片
   */
  swiperChange(e) {
    this.setData({
      currentImageIndex: e.detail.current
    });
  }
})
