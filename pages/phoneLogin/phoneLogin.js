// pages/phoneLogin/phoneLogin.js
Page({
  data: {
    phoneNumber: '',
    verifyCode: '',
    cooldown: false,
    countdownTime: 60,
    canLogin: false
  },

  onLoad: function (options) {
    // 页面加载时执行的函数
  },

  // 返回上一页
  goBack: function() {
    wx.navigateBack();
  },
  
  // 获取输入的手机号
  inputPhoneNumber: function(e) {
    const phoneNumber = e.detail.value;
    this.setData({
      phoneNumber,
      canLogin: this.isValidPhone(phoneNumber) && this.data.verifyCode.length === 6
    });
  },
  
  // 获取输入的验证码
  inputVerifyCode: function(e) {
    const verifyCode = e.detail.value;
    this.setData({
      verifyCode,
      canLogin: this.isValidPhone(this.data.phoneNumber) && verifyCode.length === 6
    });
  },
  
  // 验证手机号格式是否正确
  isValidPhone: function(phoneNumber) {
    // 简单的手机号验证规则：11位数字且以1开头
    const phoneReg = /^1\d{10}$/;
    return phoneReg.test(phoneNumber);
  },
  
  // 发送验证码
  sendVerifyCode: function() {
    const phoneNumber = this.data.phoneNumber;
    
    // 检查手机号是否有效
    if (!this.isValidPhone(phoneNumber)) {
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none'
      });
      return;
    }
    
    // 开始倒计时
    this.startCountDown();
    
    // 模拟发送验证码成功
    wx.showToast({
      title: '验证码已发送',
      icon: 'success'
    });
    
    // 真实场景中，这里应该调用发送验证码的API
  },
  
  // 启动倒计时
  startCountDown: function() {
    this.setData({
      cooldown: true,
      countdownTime: 60
    });
    
    this.countdownInterval = setInterval(() => {
      if (this.data.countdownTime <= 1) {
        clearInterval(this.countdownInterval);
        this.setData({
          cooldown: false
        });
        return;
      }
      
      this.setData({
        countdownTime: this.data.countdownTime - 1
      });
    }, 1000);
  },
  
  // 处理登录操作
  handleLogin: function() {
    const { phoneNumber, verifyCode } = this.data;
    
    // 在真实场景中，这里应该调用API验证手机号和验证码是否匹配
    
    // 模拟登录成功
    wx.showToast({
      title: '登录成功',
      icon: 'success',
      duration: 200
    });
    
    // 登录成功后跳转到首页
    setTimeout(() => {
      wx.switchTab({
        url: '/pages/index/index',
      });
    }, 200);
  },
  
  // 页面卸载时清除定时器
  onUnload: function() {
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }
  }
});
