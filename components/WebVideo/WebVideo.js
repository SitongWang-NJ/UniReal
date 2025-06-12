// components/WebVideo/WebVideo.js
Component({

  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    showCameraFeed: true,
    captureInterval: null,
    frameCount: 0,
    isCapturing: true
  },

  /**
   * 组件的方法列表
   */
  methods: {
        // 图像加载完成时调用
        imageLoaded() {
          // 流正常传输时启动捕获
          if (!this.data.isCapturing) {
            this.startFrameCapture();
          }
          
          // // 重置重试计数器
          // this.setData({ 
          //   retryCount: 0,
          //   isCapturing: true
          // });
        },
        
        // 图像加载错误
        imageError(e) {
          console.error('图像加载失败', e.detail);
          this.stopFrameCapture();
        }
  }
})



// // components/tab-card-switch/tab-card-switch.js
// Component({
//   data: {
//     currentTab: 'restaurant',
//     showCameraFeed: true,
//     captureInterval: null,
//     frameCount: 0,
//     isCapturing: true,
//     // retryCount: 0, // 添加重试计数器
//     // maxRetries: 5 // 最大重试次数
//   },
  
//   methods: {
//     switchTab(e) {
//       const tab = e.currentTarget.dataset.tab;
//       this.setData({ 
//         currentTab: tab
//       });
//       // 移除了与帧捕获相关的逻辑
//     },
    
//     handleClick() {
//       const current = this.data.currentTab;
//       if (current === 'restaurant') {
//         wx.navigateTo({
//           url: '/pages/restaurant_search/restaurant_search'
//         });
//       } else if (current === 'scenery') {
//         wx.navigateTo({
//           url: '/pages/restaurant_search/restaurant_search'
//         });
//       }
//     },
    
//     // 图像加载完成时调用
//     imageLoaded() {
//       // 流正常传输时启动捕获
//       if (!this.data.isCapturing) {
//         this.startFrameCapture();
//       }
      
//       // // 重置重试计数器
//       // this.setData({ 
//       //   retryCount: 0,
//       //   isCapturing: true
//       // });
//     },
    
//     // 图像加载错误
//     imageError(e) {
//       console.error('图像加载失败', e.detail);
//       this.stopFrameCapture();
//     },
    
//     // // 处理流错误
//     // handleStreamError() {
//     //   // 停止当前捕获
//     //   this.stopFrameCapture();
      
//     //   // 增加重试计数器
//     //   const newRetryCount = this.data.retryCount + 1;
//     //   this.setData({ 
//     //     retryCount: newRetryCount,
//     //     isCapturing: false
//     //   });
      
//     //   // 检查是否达到最大重试次数
//     //   if (newRetryCount <= this.data.maxRetries) {
//     //     console.log(`流传输异常，尝试重新连接 (${newRetryCount}/${this.data.maxRetries})`);
        
//     //     // 延迟后重试
//     //     setTimeout(() => {
//     //       if (!this.data.isCapturing) {
//     //         this.retryStream();
//     //       }
//     //     }, 2000); // 2秒后重试
//     //   } else {
//     //     console.error('流传输异常，已达到最大重试次数');
//     //     // 可以在这里添加用户提示
//     //   }
//     // },
    
//     // // 重试流连接
//     // retryStream() {
//     //   // 强制刷新图像
//     //   this.setData({ showCameraFeed: false }, () => {
//     //     setTimeout(() => {
//     //       this.setData({ showCameraFeed: true });
//     //     }, 100);
//     //   });
//     // },
    
//     // // 开始帧捕获
//     // startFrameCapture() {
//     //   if (this.data.captureInterval) {
//     //     clearInterval(this.data.captureInterval);
//     //   }
      
//     //   // 每200ms捕获一帧
//     //   const interval = setInterval(() => {
//     //     this.captureFrame();
//     //   }, 200);
      
//     //   this.setData({
//     //     captureInterval: interval,
//     //     isCapturing: true,
//     //     // retryCount: 0 // 重置重试计数器
//     //   });
//     //   console.log('开始帧捕获');
//     // },
    
//     // // 停止帧捕获
//     // stopFrameCapture() {
//     //   if (this.data.captureInterval) {
//     //     clearInterval(this.data.captureInterval);
//     //     this.setData({ 
//     //       captureInterval: null,
//     //       isCapturing: false
//     //     });
//     //     console.log('停止帧捕获');
//     //   }
//     // },
    
//     // // 捕获当前帧
//     // captureFrame() {
//     //   const that = this;
      
//     //   wx.createSelectorQuery().in(this).select('#cameraImage').fields({
//     //     rect: true,
//     //     node: true,
//     //   }).exec((res) => {
//     //     // 打印res以调试
//     //     // console.log('捕获到的图像节点:', res[0].node);
//     //     if (res[0] && res[0].node) {
//     //       const image = res[0].node;
//     //       const ctx = wx.createCanvasContext('frameCanvas', this);
          
//     //       // 在Canvas上绘制当前图像
//     //       ctx.drawImage(image, 0, 0, 320, 240);
//     //       ctx.draw(false, () => {
//     //         // 将Canvas转为临时文件
//     //         wx.canvasToTempFilePath({
//     //           canvasId: 'frameCanvas',
//     //           quality: 0.7, // 压缩质量
//     //           fileType: 'jpg',
//     //           success(res) {
//     //             // 上传压缩后的帧
//     //             that.uploadFrame(res.tempFilePath);
//     //           },
//     //           fail(err) {
//     //             console.error('生成临时文件失败', err);
//     //           }
//     //         });
//     //       });
//     //     } else {
//     //       // console.warn('未找到图像节点，可能流传输中断');
//     //       // this.handleStreamError();
//     //     }
//     //   });
//     // },
    
//     // // 上传帧到服务器
//     // uploadFrame(tempFilePath) {
//     //   const that = this;
      
//     //   wx.uploadFile({
//     //     url: 'https://your-server.com/api/upload-frame', // 替换为你的服务器地址
//     //     filePath: tempFilePath,
//     //     name: 'frame',
//     //     formData: {
//     //       timestamp: Date.now(),
//     //       frameCount: this.data.frameCount
//     //     },
//     //     success: (res) => {
//     //       console.log('帧上传成功', res);
//     //       that.setData({ frameCount: that.data.frameCount + 1 });
          
//     //       // 清理临时文件
//     //       wx.getFileSystemManager().unlink({
//     //         filePath: tempFilePath,
//     //         fail: (err) => console.warn('清理临时文件失败', err)
//     //       });
//     //     },
//     //     fail: (err) => {
//     //       console.error('帧上传失败', err);
//     //       // 上传失败也视为流异常
//     //       // that.handleStreamError();
//     //     }
//     //   });
//     // }
//   },
  
//   // // 组件生命周期
//   // lifetimes: {
//   //   attached() {
//   //     // 组件创建时自动开始捕获
//   //     this.startFrameCapture();
//   //   },
//   //   detached() {
//   //     // 组件销毁时停止捕获
//   //     this.stopFrameCapture();
//   //   }
//   // },
  
//   // // 页面生命周期
//   // pageLifetimes: {
//   //   show() {
//   //     // 页面显示时尝试重新连接
//   //     if (!this.data.isCapturing) {
//   //       this.retryStream();
//   //     }
//   //   },
//   //   hide() {
//   //     // 页面隐藏时停止捕获以节省资源
//   //     this.stopFrameCapture();
//   //   }
//   // }
// });