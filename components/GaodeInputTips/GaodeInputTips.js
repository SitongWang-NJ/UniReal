// components/GaodeInputTips/GaodeInputTips.js
var amapFile = require('../../libs/amap-wx.js');
var config = require('../../libs/config.js');
var lonlat;
var city;
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    city: {
      type: String,
      value: ''
    },
    longitude: {
      type: String,
      value: ''
    },
    latitude: {
      type: String,
      value: ''
    },
    inputType: {
      type: String,
      value: ''
    },
    defaultValue: {
      type: String,
      value: '请输入'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    tips: {},
    tipsShow: false
  },
  lifetimes: {
    attached: function() {
      // 在组件实例进入页面节点树时执行
    },
    ready: function(e) {
      // 在组件布局完成后执行
      console.log('搜索框', e)
    },
    detached: function() {
      // 在组件实例被从页面节点树移除时执行
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    bindInput: function(e){
      console.log('输入内容', e)
      var that = this;
      var keywords = e.detail.value; 
      if (keywords === '') {
        that.setData({
          tips: []
        });
        return false
      }
      
      // 获取当前城市
      var currentCity = wx.getStorageSync('currentCity') || city || '广州';
      var currentLocation = this.properties.longitude + ',' + this.properties.latitude;
      
      var key = config.Config.key;
      var myAmapFun = new amapFile.AMapWX({key: key});
      myAmapFun.getInputtips({
        keywords: keywords,
        location: currentLocation,
        city: currentCity,
        citylimit: true, // 限制在当前城市
        success: function(data){
          if(data && data.tips){
            // 过滤掉没有详细地址和位置的结果
            var filteredTips = data.tips.filter(function(item) {
              return item.address && item.location && item.district;
            });
            that.setData({
              tips: filteredTips
            });
          }
        }
      })
    },
    bindSearch: function(e){
      console.log('点击搜索', e.target.dataset.info)
      console.log('点击搜索', e.target.dataset)
      this.triggerEvent('customEvent', {
        info: e.target.dataset.info,
        inputType: this.properties.inputType
      });
    },
    handleFocus: function(e) {
      this.setData({
        tipsShow: true
      });
    },
    handleBlur: function(e) {
      this.setData({
        tipsShow: false
      });
    }
  }
})