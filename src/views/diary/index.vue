<template>
  <div class="diary">
    <header>
      <div class="left">
        <span>摄入</span>
        <h1>0</h1>
      </div>
      <div class="middle">
        <doughnut-chart />
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
            @click="drawer = true">
          </el-button>
          <el-drawer
            title="我是标题"
            :visible.sync="drawer"
            :with-header="false">
            <span>我来啦!</span>
          </el-drawer>

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
import DoughnutChart from './components/DoughnutChart.vue';

export default {
  name: 'diary',
  data() {
    return {
      drawer: false,
    };
  },
  components: {
    DoughnutChart,
  },
  methods: {

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
    height: 12.5em;
    width: $detailWidth;
    background-color: white;
    margin: 0 auto;
    display: flex;
    margin-bottom:20px;
    justify-content:center;
     align-items:center;
    .left{
      flex:1 1;
      text-align: center;
    }
    .middle{
      flex:1 2;
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
