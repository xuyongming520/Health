<template>
  <div id="user">
    <main>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-card class="cardLeft">
            <img src="@/assets/head.png" class="image">
            <div style="padding: 14px;">
              <h2>{{info.name}}</h2>
              <span>{{info.uniqueId}}</span>
              <el-button type="primary" class="button" @click="dialogVisible = true">
                余额:{{info.balance}}
              </el-button>
              <el-dialog
                title="充值"
                :visible.sync="dialogVisible"
                width="20%"
                style="text-align:left">
                <span>您的余额：{{info.balance}}</span>
                <el-input placeholder="请输入金额" v-model="input" style="width:300px;margin-top:20px;">
                  <template slot="prepend">充值金额</template>
                </el-input>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="dialogVisible = false">取 消</el-button>
                  <el-button type="primary" @click="Recharge">充值</el-button>
                </span>
              </el-dialog>
            </div>
          </el-card>
        </el-col>
        <el-col :span="18">
          <el-card>
            <div slot="header">
              <span>欢迎回来:{{info.name}}</span>
            </div>
            <div>
              <line-chart />
            </div>
          </el-card>
        </el-col>
      </el-row>
    </main>
  </div>
</template>

<script>
import * as user from '@/api/users';
import LineChart from './components/LineChart.vue';

export default {
  name: 'user',
  data() {
    return {
      info: [],
      input: 0,
      dialogVisible: false,
    };
  },
  components: {
    LineChart,
  },
  methods: {
    getInfo() {
      user.info()
        .then((result) => {
          switch (result.data.code) {
            case 0:
              this.$message.error('加载失败');
              this.info = [];
              break;
            case 1:
              this.info = result.data.data;
              break;
            default:
              break;
          }
        });
    },
    Recharge() {
      user.recharge(this.input)
        .then((result) => {
          switch (result.data.code) {
            case 0:
              this.$message.error('充值失败');
              this.input = 0;
              break;
            case 1:
              this.$message.success('充值成功');
              this.dialogVisible = false;
              this.getInfo();
              break;
            default:
              break;
          }
        });
    },
  },
  created() {
    this.getInfo();
  },
};
</script>

<style lang='scss' scoped>
#user{
  height: 100%;
  main{
    width: $detailWidth;
    margin: 0 auto;
    height: 100%;
    padding-top:40px;
    .cardLeft{
      text-align: center;
      .image {
        width: 100%;
        display: block;
      }
      span{
        color: #666;
        font-size: 18px;
        font-style: normal;
        font-weight: 300;
        line-height: 24px;
        display: block;
      }
      .button{
        margin-top:20px;
        width: 100%;
      }
    }

  }
}
</style>
