<template>
  <div class="mine">
    <main>
          <el-calendar>
            <template
              slot="dateCell"
              slot-scope="{date, data}" >
              <p :class="data.isSelected ? 'is-selected' : ''" @click="choiceDate(data.day)">
                {{ data.day.split('-').slice(1).join('-') }} {{ data.isSelected ? '✔️' : ''}}
              </p>
            </template>
          </el-calendar>
            <template>
              <el-dialog
                title="当日身体情况"
                :visible.sync="dialogVisibleA"
                width="25%"
                :lock-scroll="false"
                >
                <el-form
                  :model="healthForm"
                  status-icon
                  :rules="rules"
                  ref="healthForm"
                  label-width="100px"
                  style="width:0 auto">
                  <el-form-item label="身高" prop="height" style="width:400px">
                    <el-input v-model="healthForm.height" placeholder="请输入身高"></el-input>
                  </el-form-item>
                  <el-form-item label="体重" prop="weight" style="width:400px">
                    <el-input v-model="healthForm.weight" placeholder="请输入体重"></el-input>
                  </el-form-item>
                  <el-form-item label="腰围" prop="waistline" style="width:400px">
                    <el-input v-model="healthForm.waistline" placeholder="请输入腰围"></el-input>
                  </el-form-item>
                  <el-form-item label="臀围" prop="hipline" style="width:400px">
                    <el-input v-model="healthForm.hipline" placeholder="请输入臀围"></el-input>
                  </el-form-item>
                  <el-form-item label="胸围" prop="chest" style="width:400px">
                    <el-input v-model="healthForm.chest" placeholder="请输入胸围"></el-input>
                  </el-form-item>
                  <el-form-item label="摄水量" prop="water" style="width:400px">
                    <el-input v-model="healthForm.water" placeholder="请输入摄水量"></el-input>
                  </el-form-item>
                  <el-form-item label="睡眠时间" prop="sleep" style="width:400px">
                    <el-input v-model="healthForm.sleep" placeholder="请输入睡眠时间"></el-input>
                  </el-form-item>
                  <el-form-item label="排便次数" prop="defecation" style="width:400px">
                    <el-input v-model="healthForm.defecation" placeholder="请输入排便次数"></el-input>
                  </el-form-item>
                  <el-form-item >
                    <el-button @click="dialogVisibleA = false">取 消</el-button>
                    <el-button
                      @click="subHealth(),dialogVisibleA = false"
                      type="primary"
                      style="margin-top:15px;margin-left:70px">提交</el-button>
                  </el-form-item>
                </el-form>
              </el-dialog>
              <el-dialog
                title="当日身体状态"
                :visible.sync="dialogVisibleB"
                width="25%"
                :lock-scroll="false">
                <el-row>
                  <el-col :span="12"><div class="grid-content">
                    身高：{{health.height}}</div></el-col>
                  <el-col :span="12"><div class="grid-content">
                    体重：{{health.weight}}</div></el-col>
                </el-row>
                <el-row>
                  <el-col :span="12"><div class="grid-content">
                    胸围：{{health.chest}}</div></el-col>
                  <el-col :span="12"><div class="grid-content">
                    腰围：{{health.waistline}}</div></el-col>
                </el-row>
                <el-row>
                  <el-col :span="12"><div class="grid-content">
                    臀围：{{health.hipline}}</div></el-col>
                  <el-col :span="12"><div class="grid-content">
                    摄入量：{{health.water}}</div></el-col>
                </el-row>
                <el-row>
                  <el-col :span="12"><div class="grid-content">睡眠时间：{{health.sleep}}</div></el-col>
                  <el-col :span="12"><div class="grid-content">
                    排便次数：{{health.defecation}}</div></el-col>
                </el-row>
                <el-row>
                  <el-col :span="24"><div class="grid-content">
                    BMI指数：{{health.bmi}}
                  </div></el-col>
                </el-row>
                <el-row>
                  <el-col :span="24"><div class="grid-content">
                    体脂率：{{health.fatRate}}
                  </div></el-col>
                </el-row>
              </el-dialog>
            </template>
    </main>
    <footer>
      <header>
        <div style="padding-right:20px">
          <strong>今日指标：</strong>
          BMI：{{bmi}}</div>
        <div>体脂率：{{fatRate}}</div>
      </header>
      <div class="proList">
        <div class="content" v-show="bmi === '无'">
          亲，还未填写今日健康档案哦~
        </div>
        <div class="advise" v-show="bmi">
          <p>{{status}}</p>
          <p>{{fatStatus}}</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import * as health from '@/api/health';
import { mapGetters } from 'vuex';

export default {
  name: 'files',
  data() {
    return {
      status: '',
      fatStatus: '',
      dialogVisibleA: false,
      dialogVisibleB: false,
      healthForm: {
        userId: '',
        createTime: '',
        height: '',
        weight: '',
        waistline: '',
        hipline: '',
        chest: '',
        water: '',
        sleep: '',
        defecation: '',
        bmi: '无',
        fatRate: '无',
      },
      rules: {
        height: [
          { required: true, message: '请输入身高', trigger: 'blur' },
        ],
        weight: [
          { required: true, message: '请输入体重', trigger: 'blur' },
        ],
      },
      health: [],
      bmi: '无',
      fatRate: '无',
      value: '',
    };
  },
  methods: {
    subHealth() {
      health.submitHealth(this.healthForm)
        .then((result) => {
          switch (result.data.code) {
            case 0:
              this.health = result.data.data;
              this.bmi = result.data.data.bmi;
              this.fatRate = result.data.data.fatRate;
              if (this.bmi < 18.5) {
                this.status = '您的身材属于：轻体重';
              } else if (this.bmi <= 24) {
                this.status = '您的身材属于：健康体重';
              } else if (this.bmi <= 28) {
                this.status = '您的身材属于：超体重';
              } else {
                this.status = '您的身材属于：肥胖';
              }
              if (this.fatRate < 0.08) {
                this.fatStatus = '哇哦！您的身材堪比健美运动员~';
              } else if (this.bmi <= 0.14) {
                this.fatStatus = '低头看，您可以看到您的腹肌唷';
              } else if (this.bmi <= 0.19) {
                this.fatStatus = '您需要注意咯，控制自己的饮食，开始运动！你是最棒的';
              } else if (this.bmi <= 0.24) {
                this.fatStatus = '摸摸自己圆滚滚的小肚腩，还不赶快行动起来';
              } else if (this.bmi <= 0.39) {
                this.fatStatus = '别灰心，坚持不懈的努力，提升自己，会拥抱美好的';
              } else {
                this.fatStatus = '只要坚持下去，铁杵磨成针';
              }
              break;
            case 1:
              this.$message.error('提交失败');
              break;
            default:
              break;
          }
        });
    },
    choiceDate(day) {
      this.healthForm.createTime = day;
      if (day === this.value) {
        health.getHealth(this.userId, day)
          .then((result) => {
            switch (result.data.code) {
              case 0:
                this.health = result.data.data;
                this.dialogVisibleB = true;
                break;
              case 1:
                this.dialogVisibleA = true;
                break;
              default:
                this.$message.error('信息失败');
                break;
            }
          });
      } else if (day > this.value) {
        this.$message.warning('未来可期！');
      } else {
        health.getHealth(this.userId, day)
          .then((result) => {
            switch (result.data.code) {
              case 0:
                this.health = result.data.data;
                this.dialogVisibleB = true;
                break;
              case 1:
                this.$message.warning('当日未提交健康信息');
                break;
              default:
                this.$message.error('登陆成功');
                break;
            }
          });
      }
    },
  },
  created() {
    this.healthForm.userId = this.userId.toString();
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
.mine{
  height: 100%;
  padding-top:20px;
  main{
    width: $detailWidth;
    background-color: white;
    margin: 0 auto;
    padding:20px 20px;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    .el-row {
      margin-bottom: 20px;
      &:last-child {
        margin-bottom: 0;
      }
    }
    .el-col {
      border-radius: 4px;
    }
    .grid-content {
      border-radius: 4px;
      min-height: 36px;
    }
  }
  footer{
    height: 13em;
    width: $detailWidth;
    background-color: white;
    margin: 20px auto;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    header{
      padding:18px 20px;
      border-bottom: 1px solid #ebeef5;
      display: flex;
      justify-content: flex-start;
    }
    .proList{
      width: 100%;
      height: 80%;
      display: table;
      .content{
        display: table-cell;
        vertical-align: middle;
        text-align: center;
      }
      .advise{
        margin: 20px;
      }
    }

  }
}
</style>
