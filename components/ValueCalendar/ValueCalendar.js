// components/ValueCalendar/ValueCalendar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 传入的数据字典，格式：{"2025-06-01": 0.2, ...}
    values: {
      type: Object,
      value: {},
    },
    // 可选地外部传入初始年月，格式：{ year: 2025, month: 6 }
    initialYear: {
      type: Number,
      value: new Date().getFullYear(),
    },
    initialMonth: {
      type: Number,
      value: new Date().getMonth() + 1,
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    currentYear: null,
    currentMonth: null,
    title: '',
    weekDays: ['一','二','三','四','五','六','日'],
    calendar: []  // 二维数组，每行代表一周，每个单元 { date: number|null, style: string, key: string }
  },

  /**
   * 生命周期函数：组件实例进入页面节点树时
   */
  attached() {
    const y = this.properties.initialYear;
    const m = this.properties.initialMonth;
    this.setData({
      currentYear: y,
      currentMonth: m
    }, () => {
      this._renderCalendar();
    });
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 渲染日历
    _renderCalendar() {
      const { currentYear: y, currentMonth: m } = this.data;
      const firstDay = new Date(y, m - 1, 1);
      const startWeekday = (firstDay.getDay() + 6) % 7; // 周一=0 ... 周日=6
      const daysInMonth = new Date(y, m, 0).getDate();

      // 生成所有格子
      const cells = [];
      const total = Math.ceil((startWeekday + daysInMonth) / 7) * 7;
      for (let i = 0; i < total; i++) {
        const idx = i - startWeekday + 1;
        if (i < startWeekday || idx > daysInMonth) {
          cells.push({ date: null, style: '', key: `empty-${i}` });
        } else {
          const dateStr = `${y}-${String(m).padStart(2,'0')}-${String(idx).padStart(2,'0')}`;
          const val = this.properties.values[dateStr] ?? 0;
          const alpha = Math.min(Math.max(val, 0), 1);
          const style = alpha > 0
            ? `background-color:rgba(0,128,0,${alpha});`
            : '';
          cells.push({
            date: idx,
            style,
            key: dateStr
          });
        }
      }

      // 按行切分
      const weeks = [];
      for (let i = 0; i < cells.length; i += 7) {
        weeks.push(cells.slice(i, i + 7));
      }

      // 设置状态
      this.setData({
        calendar: weeks,
        title: `${y}年${m}月`
      });
    },

    // 上一月
    prevMonth() {
      let { currentYear: y, currentMonth: m } = this.data;
      m -= 1;
      if (m < 1) {
        y -= 1; m = 12;
      }
      this.setData({ currentYear: y, currentMonth: m }, this._renderCalendar);
    },

    // 下一月
    nextMonth() {
      let { currentYear: y, currentMonth: m } = this.data;
      m += 1;
      if (m > 12) {
        y += 1; m = 1;
      }
      this.setData({ currentYear: y, currentMonth: m }, this._renderCalendar);
    },

    // 单元格点击事件，抛出日期
    onCellTap(e) {
      const { key } = e.currentTarget.dataset;
      if (!key.startsWith('empty')) {
        this.triggerEvent('select', { date: key });
      }
    }
  }
});
