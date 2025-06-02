// pages/home/home.js
var amapFile = require('../../libs/amap-wx.130.js');
var gaode_key = require('../../libs/config');
var markersData = [];

Page({
  data:{
    latitude:"",
    longitude:"",
    latitude_click:"",
    longitude_click:"",
    markers: [],
    city: '',
    city_e: '', // 目的地
    latitude_e: '', // 目的地x
    longitude_e: '', // 目的地y
    textData: {},
    gaode_type: 'car',
    polyline: [],
    includePoints: [],
    transits: [], // 公交车信息
    mapEndObj: {}, // 目的地信息
    cost: '',
    distance: '',
    daohang: false,
    mapState: true
  },
  /**
   * 地点地图事件
   * @param {*} e
   */
  mapBindtap(e) {
    console.log(e.detail);
    this.setData({
      longitude_click:e.detail.longitude,
      latitude_click:e.detail.latitude
      }
    )
  },
  /**
   * marker事件
   * @param {*} e
   */
  makertap: function (e) {
    var id = e.markerId;
    var that = this;
    that.showMarkerInfo(markersData, id);
    that.changeMarkerColor(markersData, id);
  },
  onLoad: function () {
    this.getPoiData(); // 获取当前位置或指定位置周边 

  // 调用云托管接口上报访问量
  wx.cloud.callContainer({
      config: {
        env: 'prod-2gh5db6i5251e1f8'
      },
      path: '/api/count',
      header: {
        'X-WX-SERVICE': 'flask-syxg'
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
  // 切换方式
  changeGaodeType(event) {
    console.log('切换方式，绘制路线', event.detail);
    this.setData({
      gaode_type: event.detail.gaode_type,
      mapState: false
    })
    if (!this.data.longitude_e) {
      return
    }
    // 绘制路线
    this.getRoute(this.data.mapEndObj, 'end')
  },
  handleCustomEvent: function (event) {
    console.log('接收到组件传递的数据：', event.detail);
    const data = event.detail
    this.setData({
      mapEndObj: data.info
    })
    this.getRoute(data.info, data.inputType)
  },
  // 路线搜索 默认驾车
  getRoute: function (info, type) {
    var that = this;
    console.log('搜索目的地及路线', info, type)
    if (type === 'start') {
      const markersData = [{
        iconPath: "../../images/marker_checked.png",
        id: 0,
        latitude: info.location.split(',')[1],
        longitude: info.location.split(',')[0],
        width: 23,
        height: 33,
        name: info.name,
        address: info.district
      }]
      that.setData({
        city: info.name,
        daohang: false,
        city_e: '',
        latitude: info.location.split(',')[1],
        longitude: info.location.split(',')[0],
        city: info.name,
        polyline: [],
        markers: markersData,
        includePoints: [{
          latitude: info.location.split(',')[1],
          longitude: info.location.split(',')[0]
        }]
      });
      that.showMarkerInfo(markersData, 0);
      return
    } else {
      that.setData({
        daohang: true,
        city_e: info.name,
        latitude_e: info.location.split(',')[1],
        longitude_e: info.location.split(',')[0],
        city_e: info.name
      });
    }

    var key = gaode_key.Config.key;
    var myAmapFun = new amapFile.AMapWX({
      key: key
    });
    const gaodeParams = {
      origin: `${this.data.longitude},${this.data.latitude}`,
      destination: `${this.data.longitude_e},${this.data.latitude_e}`,
      success: function (data) {
        console.log('路线', data)
        var points = [];
        if (data.paths && data.paths[0] && data.paths[0].steps) {
          var steps = data.paths[0].steps;
          for (var i = 0; i < steps.length; i++) {
            var poLen = steps[i].polyline.split(';');
            for (var j = 0; j < poLen.length; j++) {
              points.push({
                longitude: parseFloat(poLen[j].split(',')[0]),
                latitude: parseFloat(poLen[j].split(',')[1])
              })
            }
          }
        }
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
        }]
        that.setData({
          polyline: [{
            points: points,
            color: "#0091ff",
            width: 6
          }],
          markers: markersData,
          includePoints: [{
            latitude: that.data.latitude,
            longitude: that.data.longitude
          }, {
            latitude: that.data.latitude_e,
            longitude: that.data.longitude_e
          }],
          mapState: true
        });
        that.showMarkerInfo(markersData, 1);

        if (that.data.gaode_type === 'car') {
          if(data.paths[0] && data.paths[0].distance){
            that.setData({
              distance: data.paths[0].distance + '米'
            });
          }
          if(data.taxi_cost){
            that.setData({
              cost: '打车约' + parseInt(data.taxi_cost) + '元'
            });
          }
        }  else if (that.data.gaode_type === 'riding') {
          if(data.paths[0] && data.paths[0].distance){
            that.setData({
              distance: data.paths[0].distance + '米'
            });
          }
          if(data.taxi_cost){
            that.setData({
              cost: '打车约' + parseInt(data.taxi_cost) + '元'
            });
          }
        }  else if (that.data.gaode_type === 'walk') {
          if(data.paths[0] && data.paths[0].distance){
            that.setData({
              distance: data.paths[0].distance + '米'
            });
          }
          if(data.paths[0] && data.paths[0].duration){
            that.setData({
              cost: parseInt(data.paths[0].duration/60) + '分钟'
            });
          }
        }  else if (that.data.gaode_type === 'bus') {
          console.log('公交', data)
        }
      },
      fail: function(info){
        console.log('出现问题', info)
      }
    }
    if (this.data.gaode_type === 'car') {
      // 驾车
      myAmapFun.getDrivingRoute(gaodeParams)
    } else if (this.data.gaode_type === 'walk') {
      // 步行
      myAmapFun.getWalkingRoute(gaodeParams)
    } else if (this.data.gaode_type === 'bus') {
      // 公交
      myAmapFun.getTransitRoute({
        origin: `${this.data.longitude},${this.data.latitude}`,
        destination: `${this.data.longitude_e},${this.data.latitude_e}`,
        city: '广州',
        success: function(data){
          console.log('公交信息', data.transits)
          if(data && data.transits){
            var transits = data.transits;
            for(var i = 0; i < transits.length; i++){
              var segments = transits[i].segments;
              transits[i].transport = [];
              for(var j = 0; j < segments.length; j++){
                if(segments[j].bus && segments[j].bus.buslines && segments[j].bus.buslines[0] && segments[j].bus.buslines[0].name){
                  var name = segments[j].bus.buslines[0].name
                  if(j!==0){
                    name = '--' + name;
                  }
                  transits[i].transport.push(name);
                }
              }
            }
          }
          that.setData({
            transits: transits,
            mapState: true
          });
            
        },
        fail: function(info){
          wx.showModal({
            title: info
          })
          console.log('出现问题', info)
        }
      })

    } else if (this.data.gaode_type === 'riding') {
      // 骑行
      myAmapFun.getRidingRoute(gaodeParams)
    }


  },
  // 地点搜索 如果搜索目的地搜索导航
  getPoiData: function (keywords, searchType) {
    var that = this;
    let params = {
      iconPathSelected: '../../imags/marker_checked.png', //如：..­/..­/images/marker_checked.png
      iconPath: '../../imags/marker.png', //如：..­/..­/images/marker.png
      success: function (data) {
        console.log('当前位置', data)
        markersData = data.markers;
        // 搜索当前位置 附近poi
        console.log('搜索当前位置,清除目的地信息')
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
          title: info.errMsg
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
  // bindInput: function (e) {
  //   var that = this;
  //   var url = '../inputtips/input';
  //   if (e.target.dataset.latitude && e.target.dataset.longitude && e.target.dataset.city) {
  //     var dataset = e.target.dataset;
  //     url = url + '?lonlat=' + dataset.longitude + ',' + dataset.latitude + '&city=' + dataset.city;
  //   }
  //   wx.navigateTo({
  //     url: url
  //   })
  //   console.log('跳转搜索页', url)
  // },
  showMarkerInfo: function (data, i) {
    var that = this;
    that.setData({
      textData: {
        name: data[i].name,
        desc: data[i].address
      }
    });
  },
  changeMarkerColor: function (data, i) {
    var that = this;
    var markers = [];
    for (var j = 0; j < data.length; j++) {
      if (j == i) {
        data[j].iconPath = "../../imags/marker_checked.png"; //如：..­/..­/images/marker_checked.png
      } else {
        data[j].iconPath = "../../imags/marker.png"; //如：..­/..­/images/marker.png
      }
      markers.push(data[j]);
    }
    that.setData({
      markers: markers
    });
  }
})
