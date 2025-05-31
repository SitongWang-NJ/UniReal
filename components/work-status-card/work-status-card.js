// components/work-status-card/work-status-card.js
Component({
  properties: {
    workProgress: {
      type: Number,
      value: 45 // 工作时长进度 0-100%
    },
    distance: {
      type: Number,
      value: 20
    },
    income: {
      type: Number,
      value: 87.5
    },
    rideDurationPercent: {
      type: Number,
      value: 60
    },
    incomeTargetPercent: {
      type: Number,
      value: 80
    }
  },
  methods: {
    onDetailTap() {
      this.triggerEvent('detailClick');
    }
  }
});
