<template>
  <div :class="className" style="height:100px;width:100xpx" ref="DoughnutChart" />
</template>

<script>
import echarts from 'echarts';

export default {
  data() {
    return {
    };
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$refs.DoughnutChart);
      this.chart.setOption({
        series: [
          {
            name: '均衡饮食',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center',
            },
            labelLine: {
              show: false,
            },
            data: [
              { value: 335, name: '摄入总量' },
              { value: 10, name: '已摄入量' },
            ],
          },
        ],
      });
    },
  },
  // mounted() {
  //   this.initChart();
  // },
  created() {
    this.initChart();
  },
};
</script>
