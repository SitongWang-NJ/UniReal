// pages/home/home.js
Page({
  data:{
    latitude:"23.013833",
    longitude:"113.404188",
    latitude_click:"",
    longtitude_click:""
  },
  /**
   * 地点地图事件
   * @param {*} e
   */
  mapBindtap(e) {
    console.log(e.detail);
    this.setData(
      longtitude_click=e.longitude,
      latitude_click=e.latitude
    )
  },

});
