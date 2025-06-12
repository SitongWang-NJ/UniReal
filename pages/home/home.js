var amapFile = require('../../libs/amap-wx.130.js');
var gaode_key = require('../../libs/config');
var markersData = [];

Page({
  data: {
    markers: [],
    latitude: '',
    longitude: '',
    city: '',
    city_e: '', // 目的地
    latitude_e: '', // 目的地x
    longitude_e: '', // 目的地y
    textData: {},
    polyline: [],
    includePoints: [],
    mapEndObj: {}, // 目的地信息
    cost: '',
    distance: '',
    daohang: false,
    mapState: true,
    estimatedTime: '' // 预计送达时间
  },
  
  makertap: function (e) {
    var id = e.markerId;
    var that = this;
    that.showMarkerInfo(markersData, id);
    that.changeMarkerColor(markersData, id);
  },

  onLoad: function () {
    var that = this;
    // 先获取位置权限
    wx.getLocation({
      type: 'gcj02',
      success: function(res) {
        console.log('微信获取位置成功', res);
        // 获取当前城市信息
        that.getCurrentCity(res.latitude, res.longitude);
        // 获取POI数据
        that.getPoiData();
        wx.cloud.callContainer({
          config: {
            env: 'prod-2gh5db6i5251e1f8' // 替换成你的环境ID
          },
          path: '/api/count',
          header: {
            'X-WX-SERVICE': 'flask-syxg' // 替换成你的服务名
          },
          method: 'POST',
          data: {
            action: 'inc'
          },
          success(res) {
            console.log('访问量上报成功', res);
          },
          fail(err) {
            console.error('访问量上报失败', err);
          }
        });
      },
      fail: function(err) {
        console.error('微信获取位置失败', err);
        wx.showModal({
          title: '提示',
          content: '需要获取您的位置信息，请在设置中开启位置权限',
          success: function(modalRes) {
            if (modalRes.confirm) {
              wx.openSetting({
                success: function(settingRes) {
                  if (settingRes.authSetting['scope.userLocation']) {
                    // 用户开启了权限，重新加载
                    that.onLoad();
                  }
                }
              });
            }
          }
        });
      }
    });
  },
 
  // 获取当前城市
  getCurrentCity: function(lat, lng) {
    var that = this;
    var myAmapFun = new amapFile.AMapWX({
      key: gaode_key.Config.key
    });
    
    myAmapFun.getRegeo({
      location: lng + ',' + lat,
      success: function(data) {
        if (data && data[0]) {
          var city = data[0].regeocodeData.addressComponent.city || 
                     data[0].regeocodeData.addressComponent.province;
          // 保存当前城市
          wx.setStorageSync('currentCity', city);
          console.log('当前城市：', city);
        }
      }
    });
  },
  
  // 查找附近餐厅
  findNearbyRestaurant: function() {
    this.navigateToNearbySearch('restaurant');
  },

  // 查找加油站
  findGasStation: function() {
    this.navigateToNearbySearch('gas');
  },

  // 查找洗手间
  findToilet: function() {
    this.navigateToNearbySearch('toilet');
  },

  // 查找停车场
  findParking: function() {
    this.navigateToNearbySearch('parking');
  },

  // 跳转到附近搜索页面
  navigateToNearbySearch: function(type) {
    wx.navigateTo({
      url: `/pages/nearbySearch/nearbySearch?type=${type}&latitude=${this.data.latitude}&longitude=${this.data.longitude}&city=${this.data.city}`
    });
  },
  
  handleCustomEvent: function (event) {
    console.log('接收到组件传递的数据：', event.detail);
    const data = event.detail
    this.setData({
      mapEndObj: data.info
    })
    this.getRoute(data.info, data.inputType)
  },
  
  // 配送时间计算函数
  calculateDeliveryTime: function(distance, drivingTime) {
    // 基于距离和驾车时间计算配送时间
    var deliveryTime = 0;
    
    // 基础取餐时间
    var pickupTime = 15; // 15分钟取餐时间
    
    // 根据距离调整配送时间
    if (distance <= 2000) {
      // 2公里内：驾车时间 + 5分钟（考虑外卖员熟悉路况）
      deliveryTime = Math.ceil(drivingTime/60) + 5;
    } else if (distance <= 5000) {
      // 2-5公里：驾车时间 + 8分钟
      deliveryTime = Math.ceil(drivingTime/60) + 8;
    } else {
      // 5公里以上：驾车时间 + 10分钟
      deliveryTime = Math.ceil(drivingTime/60) + 10;
    }
    
    return pickupTime + deliveryTime;
  },
  
  // 配送费用计算函数
  calculateDeliveryFee: function(distance) {
    var baseFee = 3; // 基础配送费3元
    var extraFee = 0; // 额外费用
    
    if (distance > 3000) {
      // 超过3公里，每公里加收1元
      extraFee = Math.ceil((distance - 3000) / 1000);
    }
    
    return baseFee + extraFee;
  },
  
  // 路线搜索 - 简化版，只使用驾车路线
  getRoute: function (info, type) {
    var that = this;
    console.log('搜索目的地及路线', info, type)
    
    if (type === 'start') {
      const markersData = [{
        iconPath: "../../imags/marker_checked.png",
        id: 0,
        latitude: parseFloat(info.location.split(',')[1]),
        longitude: parseFloat(info.location.split(',')[0]),
        width: 23,
        height: 33,
        name: info.name,
        address: info.district || info.address
      }]
      that.setData({
        city: info.name,
        daohang: false,
        city_e: '',
        latitude: parseFloat(info.location.split(',')[1]),
        longitude: parseFloat(info.location.split(',')[0]),
        polyline: [],
        markers: markersData,
        includePoints: [{
          latitude: parseFloat(info.location.split(',')[1]),
          longitude: parseFloat(info.location.split(',')[0])
        }],
        estimatedTime: '',
        cost: '',
        distance: ''
      });
      that.showMarkerInfo(markersData, 0);
      that.getCurrentCity(that.data.latitude, that.data.longitude);
      return
    } else {
      that.setData({
        daohang: true,
        city_e: info.name,
        latitude_e: parseFloat(info.location.split(',')[1]),
        longitude_e: parseFloat(info.location.split(',')[0])
      });
    }

    var key = gaode_key.Config.key;
    var myAmapFun = new amapFile.AMapWX({
      key: key
    });
    
    // 设置加载状态
    that.setData({
      mapState: false
    });
    
    // 驾车路线规划
    myAmapFun.getDrivingRoute({
      origin: `${this.data.longitude},${this.data.latitude}`,
      destination: `${this.data.longitude_e},${this.data.latitude_e}`,
      success: function(data) {
        console.log('驾车路线规划成功', data);
        
        var points = [];
        
        // 处理路线点
        if (data.paths && data.paths[0] && data.paths[0].steps) {
          var steps = data.paths[0].steps;
          console.log('路线步骤数量:', steps.length);
          
          for (var i = 0; i < steps.length; i++) {
            if (steps[i].polyline) {
              var poLen = steps[i].polyline.split(';');
              for (var j = 0; j < poLen.length; j++) {
                if (poLen[j]) {
                  var point = poLen[j].split(',');
                  if (point.length === 2) {
                    points.push({
                      longitude: parseFloat(point[0]),
                      latitude: parseFloat(point[1])
                    });
                  }
                }
              }
            }
          }
        }
        
        console.log('解析出的路线点数：', points.length);
        
        // 设置标记点
        const markersData = [{
          iconPath: "../../images/mapicon_navi_s.png",
          id: 0,
          latitude: that.data.latitude,
          longitude: that.data.longitude,
          width: 23,
          height: 33
        }, {
          iconPath: "../../images/mapicon_navi_e.png",
          id: 1,
          latitude: that.data.latitude_e,
          longitude: that.data.longitude_e,
          width: 24,
          height: 34
        }];
        
        // 设置地图数据
        var updateData = {
          markers: markersData,
          includePoints: [{
            latitude: that.data.latitude,
            longitude: that.data.longitude
          }, {
            latitude: that.data.latitude_e,
            longitude: that.data.longitude_e
          }],
          mapState: true
        };
        
        // 设置polyline
        if (points.length > 0) {
          updateData.polyline = [{
            points: points,
            color: "#00AA00", // 配送路线用绿色
            width: 6,
            arrowLine: true
          }];
          console.log('设置polyline成功，点数:', points.length);
        } else {
          console.warn('没有解析到路线点');
          updateData.polyline = [];
        }
        
        that.setData(updateData);
        that.showMarkerInfo(markersData, 1);
        
        // 处理距离和时间信息
        if (data.paths && data.paths[0]) {
          var path = data.paths[0];
          var distance = path.distance || 0;
          var duration = path.duration || 0;
          
          // 显示距离
          var distanceText = distance > 1000 ? (distance/1000).toFixed(1) + '公里' : distance + '米';
          
          // 计算配送时间和费用
          var deliveryTime = that.calculateDeliveryTime(distance, duration);
          var deliveryFee = that.calculateDeliveryFee(distance);
          
          that.setData({
            distance: distanceText,
            estimatedTime: deliveryTime + '分钟',
            cost: '配送费' + deliveryFee + '元'
          });
          
          console.log('配送信息 - 距离:', distanceText, '时间:', deliveryTime + '分钟', '费用:', deliveryFee + '元');
        }
      },
      fail: function(info) {
        console.error('路线规划失败', info);
        that.setData({
          mapState: true,
          polyline: []
        });
        wx.showToast({
          title: '路线规划失败',
          icon: 'none'
        });
      }
    });
  },
  
  // 计算距离
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
  
  // 地点搜索
  getPoiData: function (keywords, searchType) {
    var that = this;
    let params = {
      iconPathSelected: '../../images/marker_checked.png',
      iconPath: '../../images/marker.png',
      success: function (data) {
        console.log('当前位置', data)
        markersData = data.markers;
        that.setData({
          markers: markersData,
          latitude: markersData[0].latitude,
          longitude: markersData[0].longitude,
          city: markersData[0].name,
        });
        that.showMarkerInfo(markersData, 0);
      },
      fail: function (info) {
        wx.showModal({
          title: '提示',
          content: info.errMsg || '获取位置信息失败',
          showCancel: false
        })
      }
    }
    if (keywords) {
      params.querykeywords = keywords;
    }
    var myAmapFun = new amapFile.AMapWX({
      key: gaode_key.Config.key
    });
    myAmapFun.getPoiAround(params)
  },
  
  showMarkerInfo: function (data, i) {
    var that = this;
    if (data && data[i]) {
      that.setData({
        textData: {
          name: data[i].name || '',
          desc: data[i].address || ''
        }
      });
    }
  },
  
  changeMarkerColor: function (data, i) {
    var that = this;
    var markers = [];
    for (var j = 0; j < data.length; j++) {
      if (j == i) {
        data[j].iconPath = "../../images/marker_checked.png";
      } else {
        data[j].iconPath = "../../images/marker.png";
      }
      markers.push(data[j]);
    }
    that.setData({
      markers: markers
    });
  }
})