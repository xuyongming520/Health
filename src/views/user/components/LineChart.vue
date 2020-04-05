<template>
  <div :class="className" :style="{height:'400px',width:'100%'}" ref="lineCard" />
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
      this.chart = echarts.init(this.$refs.lineCard);
      this.chart.setOption({
        color: ['#F0FFF0', 'green'],
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)',
          show: false,
        },
        series: [
          {
            type: 'pie',
            radius: ['50%', '70%'],
            hoverAnimation: false,
            avoidLabelOverlap: false,
            legend: { selectedMode: false },
            label: {
              show: false,
              position: 'center',
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '30',
                fontWeight: 'bold',
              },
            },
            labelLine: {
              show: false,
            },
            data: [
              { value: 90 },
              { value: 10 },
            ],
          },
        ],
      });
    },
  },
  mounted() {
    this.initChart();
  },
};
</script>
