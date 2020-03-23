<template>
  <div :class="className" :style="{height:height,width:width}" ref="lineCard" />
</template>

<script>
import echarts from 'echarts';
import * as lend from '@/api/borrow';

export default {
  props: {
    className: {
      type: String,
      default: 'chart',
    },
    width: {
      type: String,
      default: '100%',
    },
    height: {
      type: String,
      default: '400px',
    },
  },
  data() {
    return {
      lentTime: [],
      jan: 0,
      feb: 0,
      mar: 0,
      april: 0,
      may: 0,
      month: [],
      listQuery: {
        limit: 10,
        page: 1,
        userId: null,
      },
    };
  },
  methods: {
    getlist() {
      lend.chart()
        .then((result) => {
          switch (result.data.code) {
            case 0:
              this.$message.error('连接失败');
              break;
            case 1:
              this.lentTime = result.data.data;
              console.log(this.lentTime);
              this.dealDate();
              break;
            default:
              break;
          }
        });
    },
    dealDate() {
      for (let i = 0; i < this.lentTime.length; i += 1) {
        console.log(this.lentTime[i].month);
        switch (this.lentTime[i].month) {
          case '1':
            this.jan = this.lentTime[i].count;
            break;
          case '2':
            this.feb = this.lentTime[i].count;
            break;
          case '3':
            this.mar = this.lentTime[i].count;
            break;
          case '4':
            this.april = this.lentTime[i].count;
            break;
          case '5':
            this.may = this.lentTime[i].count;
            break;
          default:
            break;
        }
      }
      this.initChart();
    },
    initChart() {
      this.chart = echarts.init(this.$refs.lineCard);
      this.chart.setOption({
        title: {
          left: 'center',
          text: '借阅统计图',
        },
        xAxis: {
          type: 'category',
          data: ['2019.1', '2019.2', '2019.3', '2019.4', '2019.5'],
        },
        yAxis: {
          type: 'value',
        },
        series: [{
          data: [this.jan, this.feb, this.mar, this.april, this.may],
          type: 'line',
        }],
      });
    },
  },
  // mounted() {
  //   this.initChart();
  // },
  created() {
    this.getlist();
  },
};
</script>
