// components/trend-chart/trend-chart.js
Component({
  properties: {
    data: {
      type: Array,
      value: []
    },
    mode: {
      type: String,
      value: 'smooth' // smooth | stack
    },
    color: {
      type: String,
      value: '#4A90E2'
    }
  },
  lifetimes: {
    ready() {
      this.drawChart();
    }
  },
  methods: {
    drawChart() {
      const query = wx.createSelectorQuery().in(this);
      query.select('#trendCanvas')
        .fields({ node: true, size: true })
        .exec((res) => {
          const canvas = res[0].node;
          const ctx = canvas.getContext('2d');

          let dpr = 1;
          try {
            if (wx.getWindowInfo) {
              dpr = wx.getWindowInfo().pixelRatio;
            } else {
              dpr = wx.getSystemInfoSync().pixelRatio;
            }
          } catch (e) {
            dpr = 1;
          }

          const width = res[0].width;
          const height = res[0].height;

          canvas.width = width * dpr;
          canvas.height = height * dpr;
          ctx.scale(dpr, dpr);

          this.renderChart(ctx, width, height);
        });
    },

    renderChart(ctx, width, height) {
      const data = this.data.data;
      const mode = this.data.mode;
      const color = this.data.color;

      if (!data || data.length < 2) return;

      const padding = 20;
      const maxVal = Math.max(...data.map(p => p.value));
      const stepX = (width - 2 * padding) / (data.length - 1);

      const points = data.map((point, i) => {
        const x = padding + i * stepX;
        const y = height - padding - (point.value / maxVal) * (height - 2 * padding);
        return { x, y };
      });

      ctx.clearRect(0, 0, width, height);

      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      for (let i = 1; i < points.length; i++) {
        const midX = (points[i - 1].x + points[i].x) / 2;
        const midY = (points[i - 1].y + points[i].y) / 2;
        ctx.quadraticCurveTo(points[i - 1].x, points[i - 1].y, midX, midY);
      }
      ctx.lineTo(points[points.length - 1].x, points[points.length - 1].y);
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.stroke();

      if (mode === 'stack') {
        ctx.lineTo(points[points.length - 1].x, height - padding);
        ctx.lineTo(points[0].x, height - padding);
        ctx.closePath();
        ctx.fillStyle = this.hexToRgba(color, 0.2);
        ctx.fill();
      }
    },

    hexToRgba(hex, alpha) {
      const rgb = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      if (!rgb) return `rgba(74,144,226,${alpha})`;
      const r = parseInt(rgb[1], 16);
      const g = parseInt(rgb[2], 16);
      const b = parseInt(rgb[3], 16);
      return `rgba(${r},${g},${b},${alpha})`;
    }
  }
});