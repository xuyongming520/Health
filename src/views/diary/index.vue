<template>
  <div class="diary">
    <header>
      <div class="left">
        <span>摄入</span>
        <h1>{{intake}}</h1>
      </div>
      <div class="middle">
          <div
          :style="{height:'160px',width:'200px',margin:'0 auto'}"
          ref="lineCard" />
          <p>推荐预算均衡</p>
      </div>
      <div class="right">
        <span>运动</span>
        <h1>{{motion}}</h1>
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
            @click="dialogVisibleB = true;getFoodList()">
          </el-button>
          <el-dialog
            title="食物列表"
            :visible.sync="dialogVisibleB"
            width="60%"
            :lock-scroll="false">
            <el-input placeholder="关键字搜索"
              v-model="foodname"
              style="width:450px;">
              <el-button slot="append"
              icon="el-icon-search"
              @click="getFoodList(foodname)"></el-button>
            </el-input>
            <el-table
              :data="foodList"
              style="width: 98%">
              <el-table-column
                prop="name"
                label="食物名称"
                >
                <template slot-scope="scope">{{ scope.row.name }}</template>
              </el-table-column>
              <el-table-column
                prop="name"
                label="卡路里"
                width="180">
                <template slot-scope="scope">{{ scope.row.calorie }}</template>
              </el-table-column>
              <el-table-column
                prop="num"
                label="数量"
                width="180">
                <el-input-number v-model="num"
                :min="1" size="mini"></el-input-number>
              </el-table-column>
            </el-table>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="dialogVisible = false">提交</el-button>
            </span>
          </el-dialog>
        </div>
        <div class="list">
          <template>
              <el-table
                :data="bList"
                style="width: 100%">
                <el-table-column
                  prop="name"
                  label="名称"
                  width="100">
                  <template slot-scope="scope">{{ scope.row.name }}</template>
                </el-table-column>
                <el-table-column
                  prop="calorie"
                  label="卡路里(千卡/100克)">
                  <template slot-scope="scope">{{ scope.row.calorie }}</template>
                </el-table-column>
                <el-table-column
                  prop="num"
                  label="数量">
                  <template slot-scope="scope">{{ scope.row.num }}</template>
                </el-table-column>
              </el-table>
            </template>
        </div>
      </div>
      <div class="content">
        <div class="title">
          <span>午餐</span>
          <el-button
          type="primary"
            icon="el-icon-plus"
            size="mini"
            @click="dialogVisibleB = true;getFoodList()"></el-button>
          <el-dialog
            title="食物列表"
            :visible.sync="dialogVisibleB"
            width="60%"
            :lock-scroll="false">
            <el-input placeholder="关键字搜索"
              v-model="foodname"
              style="width:450px;">
              <el-button slot="append"
              icon="el-icon-search"
              @click="getFoodList(foodname)"></el-button>
            </el-input>
            <el-table
              :data="foodList"
              style="width: 98%">
              <el-table-column
                prop="name"
                label="食物名称"
                >
                <template slot-scope="scope">{{ scope.row.name }}</template>
              </el-table-column>
              <el-table-column
                prop="name"
                label="卡路里"
                width="180">
                <template slot-scope="scope">{{ scope.row.calorie }}</template>
              </el-table-column>
              <el-table-column
                prop="num"
                label="数量"
                width="180">
                <el-input-number v-model="num"
                :min="1" size="mini"></el-input-number>
              </el-table-column>
            </el-table>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="dialogVisible = false">提交</el-button>
            </span>
          </el-dialog>
        </div>
        <div class="list">
          <template>
              <el-table
                :data="lList"
                style="width: 100%">
                <el-table-column
                  prop="name"
                  label="名称"
                  width="100">
                  <template slot-scope="scope">{{ scope.row.name }}</template>
                </el-table-column>
                <el-table-column
                  prop="calorie"
                  label="卡路里(千卡/100克)">
                  <template slot-scope="scope">{{ scope.row.calorie }}</template>
                </el-table-column>
                <el-table-column
                  prop="num"
                  label="数量">
                  <template slot-scope="scope">{{ scope.row.num }}</template>
                </el-table-column>
              </el-table>
            </template>
        </div>
      </div>
      <div class="content">
        <div class="title">
          <span>晚餐</span>
          <el-button type="primary"
            icon="el-icon-plus"
            size="mini"
            @click="dialogVisibleB = true;getFoodList()"></el-button>
            <el-dialog
            title="食物列表"
            :visible.sync="dialogVisibleB"
            width="60%"
            :lock-scroll="false">
            <el-input placeholder="关键字搜索"
              v-model="foodname"
              style="width:450px;">
              <el-button slot="append"
              icon="el-icon-search"
              @click="getFoodList(foodname)"></el-button>
            </el-input>
            <el-table
              :data="foodList"
              style="width: 98%">
              <el-table-column
                prop="name"
                label="食物名称"
                >
                <template slot-scope="scope">{{ scope.row.name }}</template>
              </el-table-column>
              <el-table-column
                prop="name"
                label="卡路里"
                width="180">
                <template slot-scope="scope">{{ scope.row.calorie }}</template>
              </el-table-column>
              <el-table-column
                prop="num"
                label="数量"
                width="180">
                <el-input-number v-model="num"
                :min="1" size="mini"></el-input-number>
              </el-table-column>
            </el-table>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="dialogVisible = false">提交</el-button>
            </span>
          </el-dialog>
        </div>
        <div class="list">
          <template>
              <el-table
                :data="dList"
                style="width: 100%">
                <el-table-column
                  prop="name"
                  label="名称"
                  width="100">
                  <template slot-scope="scope">{{ scope.row.name }}</template>
                </el-table-column>
                <el-table-column
                  prop="calorie"
                  label="卡路里(千卡/100克)">
                  <template slot-scope="scope">{{ scope.row.calorie }}</template>
                </el-table-column>
                <el-table-column
                  prop="num"
                  label="数量">
                  <template slot-scope="scope">{{ scope.row.num }}</template>
                </el-table-column>
              </el-table>
            </template>
        </div>
      </div>
      <div class="content">
        <div class="title">
          <span>运动</span>
          <el-button
          type="primary" icon="el-icon-plus"
          size="mini"  @click="dialogVisibleE = true;getExerciseList()"></el-button>
          <el-dialog
            title="运动列表"
            :visible.sync="dialogVisibleE"
            width="60%"
            :lock-scroll="false">
            <el-input placeholder="关键字搜索"
              v-model="exercisename"
              style="width:450px;">
              <el-button slot="append"
              icon="el-icon-search"
               @click="getExerciseList(exercisename)"></el-button>
            </el-input>
            <el-table
              :data="exerciseList"
              style="width: 98%">
              <el-table-column
                prop="name"
                label="食物名称"
                >
                <template slot-scope="scope">{{ scope.row.name }}</template>
              </el-table-column>
              <el-table-column
                prop="name"
                label="卡路里"
                width="180">
                <template slot-scope="scope">{{ scope.row.calorie }}</template>
              </el-table-column>
              <el-table-column
                prop="num"
                label="数量"
                width="180">
                <el-input-number v-model="num"
                :min="1"
                size="mini"></el-input-number>
              </el-table-column>
            </el-table>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="dialogVisible = false">提交</el-button>
            </span>
          </el-dialog>
        </div>
        <div class="list">
          <template>
              <el-table
                :data="eList"
                style="width: 100%">
                <el-table-column
                  prop="name"
                  label="名称"
                  width="100">
                  <template slot-scope="scope">{{ scope.row.name }}</template>
                </el-table-column>
                <el-table-column
                  prop="calorie"
                  label="卡路里(千卡/100克)">
                  <template slot-scope="scope">{{ scope.row.calorie }}</template>
                </el-table-column>
                <el-table-column
                  prop="num"
                  label="数量">
                  <template slot-scope="scope">{{ scope.row.num }}</template>
                </el-table-column>
              </el-table>
            </template>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import echarts from 'echarts';
import * as food from '@/api/food';
import * as exercise from '@/api/exercise';
import { mapGetters } from 'vuex';
import * as diary from '@/api/diary';

export default {
  name: 'diary',
  data() {
    return {
      dialogVisibleB: false,
      dialogVisibleE: false,
      num: 1,
      charts: '',
      foodList: [],
      exerciseList: [],
      foodname: '',
      exercisename: '',
      value: '',
      type: '',
      bList: [],
      lList: [],
      dList: [],
      eList: [],
      intake: 0,
      motion: 0,
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
              { value: this.intake - this.motion },
              { value: 2000 },
            ],
          },
        ],
      });
    },
    getBreakfastList() {
      this.type = 'breakfast';
      diary.actionList(this.userId, this.value, this.type)
        .then((result) => {
          switch (result.data.code) {
            case null:
              this.bList = result.data.data.foods;
              for (let i = 0; i < this.bList.length; i += 1) {
                const count = this.bList[i].num * this.bList[i].calorie;
                this.intake += count;
              }
              break;
            default:
              this.$message.error('异常');
              break;
          }
        });
    },
    getLunchList() {
      this.type = 'lunch';
      diary.actionList(this.userId, this.value, this.type)
        .then((result) => {
          switch (result.data.code) {
            case null:
              this.lList = result.data.data.foods;
              for (let i = 0; i < this.lList.length; i += 1) {
                const count = this.lList[i].num * this.lList[i].calorie;
                this.intake += count;
              }
              break;
            default:
              this.$message.error('异常');
              break;
          }
        });
    },
    getDinnerList() {
      this.type = 'dinner';
      diary.actionList(this.userId, this.value, this.type)
        .then((result) => {
          switch (result.data.code) {
            case null:
              this.dList = result.data.data.foods;
              for (let i = 0; i < this.dList.length; i += 1) {
                const count = this.dList[i].num * this.dList[i].calorie;
                this.intake += count;
              }
              break;
            default:
              this.$message.error('异常');
              break;
          }
        });
    },
    getEList() {
      this.type = 'exercise';
      diary.actionList(this.userId, this.value, this.type)
        .then((result) => {
          switch (result.data.code) {
            case null:
              this.eList = result.data.data.foods;
              for (let i = 0; i < this.eList.length; i += 1) {
                const count = this.eList[i].num * this.eList[i].calorie;
                this.motion += count;
              }
              break;
            default:
              this.$message.error('异常');
              break;
          }
        });
    },
    getFoodList() {
      food.foodList(this.foodname)
        .then((result) => {
          switch (result.data.code) {
            case 0:
              this.foodList = result.data.data;
              break;
            default:
              break;
          }
        });
    },
    getExerciseList() {
      exercise.exerciseList(this.exercisename)
        .then((result) => {
          switch (result.data.code) {
            case 0:
              this.exerciseList = result.data.data;
              this.calculation();
              break;
            default:
              break;
          }
        });
    },
    calculation() {
    },
  },
  mounted() {
    this.getBreakfastList();
    this.getLunchList();
    this.getDinnerList();
    this.getEList();
    this.initChart();
  },
  created() {
    const data = new Date();
    const year = `20${data.getYear() - 100}`;
    const month = data.getMonth() < 9 ? `0${data.getMonth() + 1}` : data.getMonth() + 1;
    const date = data.getDate() <= 9 ? `0${data.getDate()}` : data.getDate();
    this.value = `${year}-${month}-${date}`;
  },
  computed: {
    ...mapGetters([
      'userId',
      'phone',
    ]),
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
      padding: 20px;
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
