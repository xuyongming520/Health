<template>
  <div class="diary">
    <header>
      <div class="left">
        <span>摄入</span>
        <h1>0</h1>
      </div>
      <div class="middle">
          <div :class="className"
          :style="{height:'160px',width:'200px',margin:'0 auto'}"
          ref="lineCard" />
          <p>推荐预算均衡</p>
      </div>
      <div class="right">
        <span>运动</span>
        <h1>0</h1>
      </div>
    </header>
    <main>
      <div class="content">
        <div class="title">
          <span>早餐</span>
          <el-button
            type="primary"
            icon="el-icon-plus"
            size="mini"
            @click="dialogVisible = true">
          </el-button>
          <el-dialog
            title="食物列表"
            :visible.sync="dialogVisible"
            width="80%"
            :before-close="handleClose">
            <el-input placeholder="关键字搜索"
              v-model="input"
              style="width:450px;">
              <el-button slot="append" icon="el-icon-search" @click="handletoSearch"></el-button>
            </el-input>
            <el-table
              :data="tableData"
              style="width: 100%">
              <el-table-column
                prop="name"
                label="食物名称"
                >
              </el-table-column>
              <el-table-column
                prop="name"
                label="卡路里"
                width="180">
              </el-table-column>
              <el-table-column
                prop="num"
                label="数量"
                width="180">
                <el-input-number v-model="num" @change="handleChange" :min="1"></el-input-number>
              </el-table-column>
            </el-table>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="dialogVisible = false">提交</el-button>
            </span>
          </el-dialog>
        </div>
      </div>
      <div class="content">
        <div class="title">
          <span>午餐</span>
          <el-button type="primary" icon="el-icon-plus" size="mini"></el-button>
        </div>
      </div>
      <div class="content">
        <div class="title">
          <span>晚餐</span>
          <el-button type="primary" icon="el-icon-plus" size="mini"></el-button>
        </div>
      </div>
      <div class="content">
        <div class="title">
          <span>运动</span>
          <el-button type="primary" icon="el-icon-plus" size="mini"></el-button>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
// import DoughnutChart from './components/DoughnutChart.vue';
import echarts from 'echarts';

export default {
  name: 'diary',
  data() {
    return {
      dialogVisible: false,
      num: 1,
      charts: '',
    };
  },
  components: {
    // DoughnutChart,
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
  created() {
  },
};
</script>

<style lang='scss' scoped>
.diary{
  height: 100%;
  padding-top:10px;
  margin: 0 auto;
  header{
    height: 14em;
    width: $detailWidth;
    background-color: white;
    margin: 0 auto;
    display: flex;
    margin-bottom:20px;
    justify-content:center;
    align-items:center;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    .left{
      flex:1 1;
      text-align: center;
    }
    .middle{
      flex:1 2;
      text-align: center;
    }
    .right{
      flex:1 1;
      text-align: center;
    }
  }
  main{
    width: $detailWidth;
    background-color: white;
    min-height: 45vh;
    height:100%;
    margin: 0 auto;
    display: flex;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    .content{
      flex:1 1;
      padding: 40px;
      .title{
        display: flex;
        justify-content: space-between;
        span{
          font-size:16px;
          font-weight: 700px;
        }
      }
    }
  }
}
</style>
