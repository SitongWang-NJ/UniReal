// components/RiderStats/RiderStats.js
Component({
  data: {
    totalAmount: 1980,
    dailyAmounts: [120, 160, 130, 180, 200, 150, 170, 140, 180, 220, 180, 160, 150, 170, 160, 180, 200, 210, 230, 180, 160, 190, 170, 160, 140, 150, 130, 120, 110, 100],
    favoriteStore: {
      name: "黑川拉面",
      logo: "../../images/compressed_logo.png"
    }
  },

  lifetimes: {
    ready() {
      this.drawChart();
    }
  },

  methods: {
    async drawChart() {
      const query = this.createSelectorQuery();
      query.select('#amountChart').fields({ node: true, size: true }).exec(res => {
        const canvas = res[0].node;
        const ctx = canvas.getContext('2d');
        const dpr = wx.getWindowInfo ? wx.getWindowInfo().pixelRatio : 2; // 默认值为 2


        canvas.width = res[0].width * dpr;
        canvas.height = res[0].height * dpr;
        ctx.scale(dpr, dpr);

        const values = this.data.dailyAmounts;
        const maxVal = Math.max(...values);
        const width = res[0].width;
        const height = res[0].height;
        const stepX = width / (values.length - 1);

        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#FF8A8A';

        values.forEach((val, idx) => {
          const x = idx * stepX;
          const y = height - (val / maxVal * (height - 20));
          if (idx === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        });

        ctx.stroke();
      });
    },

    onDetailsTap() {
      this.triggerEvent('detailsTap');
    }
  }
});
