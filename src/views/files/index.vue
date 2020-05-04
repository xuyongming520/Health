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
                :visible.sync="dialogVisible"
                width="25%"
                :lock-scroll="false"
                v-if="day === value">
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
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button
                      @click="subHealth(),dialogVisible = false"
                      type="primary"
                      style="margin-top:15px;margin-left:70px">提交</el-button>
                  </el-form-item>
                </el-form>
              </el-dialog>
              <el-dialog
                title="当日身体情况"
                :visible.sync="dialogVisible"
                width="25%"
                :lock-scroll="false"
                v-if="day !== value">
                <el-row>
                  <el-col :span="6">身高：{}<div class="grid-content bg-purple"></div></el-col>
                  <el-col :span="18"><div class="grid-content bg-purple-light"></div></el-col>
                </el-row>
              </el-dialog>
            </template>
    </main>
    <footer>
      <header>
        身体状况：
      </header>
      <div class="proList">
        <div style="margin:20px">BMI：{{bmi}}</div>
        <div style="margin:20px">体脂率：{{fatRate}}</div>
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
      activeName: 'first',
      dialogVisible: false,
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
        bmi:'无',
        fatRate:'无',
      },
      rules: {
        height: [
          { required: true, message: '请输入身高', trigger: 'blur' },
        ],
        weight: [
          { required: true, message: '请输入体重', trigger: 'blur' },
        ],
      },
      health:[],
      bmi:'无',
      fatRate:'无',
      value:'',
    };
  },
  methods: {
    subHealth() {
      health.submitHealth(this.healthForm)
        .then((result)=>{
          console.log(result)
          switch (result.data.code) {
              case 0:
                this.health=result.data.data
                this.bmi = result.data.data.bmi;
                this.fatRate = result.data.data.fatRate;
                break;
              case 1:
                this.$message.error('提交失败');
                break;
              default:
                break;
          }
        })
    },
    choiceDate(day) {
      this.dialogVisible = true;
      this.healthForm.createTime = day;
      if(day === this.value){
        console.log(value)
      }
      else{
        health.getHealth(this.userId,day)
          .then((result)=>{
          console.log(result)
          switch (result.data.code) {
              case null:
                this.bmi = result.data.data.bmi;
                this.fatRate = result.data.data.fatRate;
                break;
              case 1:
                this.$message.error('提交失败');
                break;
              default:
                break;
          }
        })
      }
    },
  },
  created() {
    this.healthForm.userId = this.userId.toString();
    const data = new Date();
    const year = "20" + (data.getYear() - 100);
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
  }
  footer{
    height: 15em;
    width: $detailWidth;
    background-color: white;
    margin: 20px auto;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    header{
      padding:18px 20px;
      border-bottom: 1px solid #ebeef5;
    }
    .proList{
      display: flex;
      flex-direction:column;
      justify-content: flex-start;
    }
  }
}
</style>
