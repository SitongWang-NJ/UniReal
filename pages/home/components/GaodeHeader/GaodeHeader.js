Component({
  properties: {
    type: {
      type: String,
      value: ''
    },
    NavigationOrNot: {
      type: Boolean,
      value: false
    }
  },
  data: {
    gaodeType: 'car'
  },
  lifetimes: {
    attached: function() {
      // 在组件实例进入页面节点树时执行
    },
    ready: function() {
      // 在组件布局完成后执行
      this.initialize()
    },
    detached: function() {
      // 在组件实例被从页面节点树移除时执行
    }
  },
  watch: {
    'properties.NavigationOrNot'(val) {
      console.log('type变化', val)
    }
  },
  methods: {
    initialize: function() {
      // 自定义的初始化方法
      console.log('initialize', this.properties)
      this.setData({
        gaodeType: this.properties.type
      })
      // 例如设置一些初始状态
    },
    setType: function(type) {
      this.setData({
        gaodeType: type
      })
      this.triggerEvent('changeType', {
        gaode_type: type
      });
    },
    goToCar: function() {
      // 处理驾车逻辑
      console.log('驾车')
      this.setType('car')
    },
    goToWalk: function() {
      // 处理步行逻辑
      console.log('步行')
      this.setType('walk')
    },
    goToBus: function() {
      // 处理公交逻辑
      console.log('公交')
      this.setType('bus')
    },
    goToRide: function() {
      // 处理骑行逻辑
      console.log('骑行')
      this.setType('riding')
    }
  }
})
