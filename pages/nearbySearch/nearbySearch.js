var amapFile = require('../../libs/amap-wx.130.js');
var gaode_key = require('../../libs/config');

Page({
  data: {
    searchType: '',
    searchTitle: '',
    nearbyList: [],
    latitude: '',
    longitude: '',
    currentCity: ''
  },

  onLoad: function (options) {
    console.log('nearbySearch页面参数：', options);
    this.setData({
      searchType: options.type || '',
      searchTitle: this.getSearchTitle(options.type),
      latitude: options.latitude || '',
      longitude: options.longitude || '',
      currentCity: options.city || ''
    });
    
    // 确保有位置信息
    if (this.data.latitude && this.data.longitude) {
      this.searchNearby();
    } else {
      wx.showToast({
        title: '无法获取位置信息',
        icon: 'none'
      });
      setTimeout(() => {
        wx.navigateBack();
      }, 1500);
    }
  },

  getSearchTitle: function(type) {
    const titles = {
      'restaurant': '附近餐厅',
      'gas': '附近加油站',
      'toilet': '附近卫生间',
      'parking': '附近停车场'
    };
    return titles[type] || '附近地点';
  },

  getSearchKeywords: function(type) {
    // 根据不同类型返回不同的搜索关键词
    const keywords = {
      'restaurant': '餐厅|饭店|餐馆|食堂|美食',
      'gas': '加油站|中石化|中石油',
      'toilet': '厕所|卫生间|洗手间|公厕',
      'parking': '停车场|停车位|停车'
    };
    return keywords[type] || '商场';
  },

  searchNearby: function() {
    var that = this;
    var key = gaode_key.Config.key;
    var myAmapFun = new amapFile.AMapWX({key: key});
    
    const searchKeywords = this.getSearchKeywords(this.data.searchType);
    console.log('搜索类型：', this.data.searchType);
    console.log('搜索关键词：', searchKeywords);
    console.log('搜索位置：', this.data.longitude + ',' + this.data.latitude);
    
    wx.showLoading({
      title: '搜索中...'
    });
    
    // 使用搜索文本接口
    myAmapFun.getPoiAround({
      querykeywords: searchKeywords, // 使用 querykeywords 而不是 keywords
      location: this.data.longitude + ',' + this.data.latitude,
      success: function(data) {
        wx.hideLoading();
        console.log('高德地图搜索结果：', data);
        
        if (data.markers && data.markers.length > 0) {
          // 使用 markers 数据
          var poisData = data.markers;
          
          // 计算距离并筛选
          var poisWithDistance = poisData.map(function(poi) {
            var distance = that.calculateDistance(
              parseFloat(that.data.latitude),
              parseFloat(that.data.longitude),
              parseFloat(poi.latitude),
              parseFloat(poi.longitude)
            );
            
            return {
              id: poi.id,
              name: poi.name,
              address: poi.address || '暂无详细地址',
              distance: distance,
              distanceText: distance > 1000 ? (distance/1000).toFixed(1) + '公里' : distance + '米',
              location: poi.longitude + ',' + poi.latitude,
              latitude: poi.latitude,
              longitude: poi.longitude,
              tel: poi.tel || ''
            };
          });
          
          // 筛选3公里内的结果
          var nearbyPois = poisWithDistance.filter(function(item) {
            return item.distance <= 3000;
          });
          
          // 根据搜索类型进一步筛选
          if (that.data.searchType === 'restaurant') {
            nearbyPois = nearbyPois.filter(function(item) {
              return item.name.indexOf('餐') !== -1 || 
                     item.name.indexOf('饭') !== -1 || 
                     item.name.indexOf('食') !== -1 ||
                     item.name.indexOf('馆') !== -1 ||
                     item.name.indexOf('店') !== -1;
            });
          } else if (that.data.searchType === 'gas') {
            nearbyPois = nearbyPois.filter(function(item) {
              return item.name.indexOf('加油') !== -1 || 
                     item.name.indexOf('充电') !== -1 ||
                     item.name.indexOf('石化') !== -1 ||
                     item.name.indexOf('石油') !== -1;
            });
          } else if (that.data.searchType === 'toilet') {
            nearbyPois = nearbyPois.filter(function(item) {
              return item.name.indexOf('厕') !== -1 || 
                     item.name.indexOf('卫生间') !== -1 ||
                     item.name.indexOf('洗手间') !== -1;
            });
          } else if (that.data.searchType === 'parking') {
            nearbyPois = nearbyPois.filter(function(item) {
              return item.name.indexOf('停车') !== -1 || 
                     item.name.indexOf('车场') !== -1 ||
                     item.name.indexOf('车位') !== -1;
            });
          }
          
          // 按距离排序
          nearbyPois.sort(function(a, b) {
            return a.distance - b.distance;
          });
          
          // 只取前10个
          var nearbyList = nearbyPois.slice(0, 10);
          
          that.setData({
            nearbyList: nearbyList
          });
          
          if (nearbyList.length === 0) {
            wx.showToast({
              title: '3公里内没有找到' + that.data.searchTitle,
              icon: 'none'
            });
            setTimeout(function() {
              wx.navigateBack();
            }, 1500);
          }
        } else {
          console.log('没有找到数据');
          wx.showToast({
            title: '附近没有找到' + that.data.searchTitle,
            icon: 'none'
          });
          setTimeout(function() {
            wx.navigateBack();
          }, 1500);
        }
      },
      fail: function(error) {
        wx.hideLoading();
        console.error('搜索失败：', error);
        wx.showToast({
          title: '搜索失败，请重试',
          icon: 'none'
        });
        setTimeout(function() {
          wx.navigateBack();
        }, 1500);
      }
    });
  },

  // 计算距离（米）
  calculateDistance: function(lat1, lng1, lat2, lng2) {
    var radLat1 = lat1 * Math.PI / 180.0;
    var radLat2 = lat2 * Math.PI / 180.0;
    var a = radLat1 - radLat2;
    var b = (lng1 - lng2) * Math.PI / 180.0;
    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a/2),2) +
      Math.cos(radLat1)*Math.cos(radLat2)*Math.pow(Math.sin(b/2),2)));
    s = s * 6378137;
    return Math.round(s);
  },

  // 选择地点
  selectLocation: function(e) {
    const index = e.currentTarget.dataset.index;
    const location = this.data.nearbyList[index];
    
    console.log('选择的地点：', location);
    
    // 将选择的地点信息存储
    const locationInfo = {
      name: location.name,
      location: location.location,
      address: location.address
    };
    
    // 返回上一页并传递数据
    const pages = getCurrentPages();
    const prevPage = pages[pages.length - 2];
    
    if (prevPage) {
      // 调用上一页的方法设置目的地
      prevPage.setData({
        mapEndObj: locationInfo
      });
      prevPage.getRoute(locationInfo, 'end');
    }
    
    wx.navigateBack();
  },

  // 拨打电话
  makePhoneCall: function(e) {
    const tel = e.currentTarget.dataset.tel;
    if (tel) {
      wx.makePhoneCall({
        phoneNumber: tel,
        fail: function() {
          wx.showToast({
            title: '拨号失败',
            icon: 'none'
          });
        }
      });
    }
  }
});