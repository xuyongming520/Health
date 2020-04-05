<template>
  <div class="mine">
    <header>
      <div class="head">
        <img src="@/assets/user.png">
      </div>
      <div class="content">
        <h3 style="font-size:24px">name</h3>
        <span class="font">手机号码：phone</span>
        <span class="font">邮箱：email</span>
        <span class="font">地址：address</span>
        <span class="font">余额：balance</span>
      </div>
    </header>
    <main>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="我的订单" name="first">
          <el-collapse accordion>
            <el-collapse-item title="一致性 Consistency">
              <template slot="title">
                一致性 Consistency<span style="margin-left:50px">合计：￥50</span>
              </template>
              <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
              <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
            </el-collapse-item>
            <el-collapse-item title="反馈 Feedback">
              <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
              <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
            </el-collapse-item>
            <el-collapse-item title="效率 Efficiency">
              <div>简化流程：设计简洁直观的操作流程；</div>
              <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
              <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
            </el-collapse-item>
            <el-collapse-item title="可控 Controllability">
              <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
              <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
            </el-collapse-item>
          </el-collapse>
        </el-tab-pane>
        <el-tab-pane label="我的健康" name="second">
          <el-calendar>
  <!-- 这里使用的是 2.5 slot 语法，对于新项目请使用 2.6 slot 语法-->
            <template
              slot="dateCell"
              slot-scope="{date, data}">
              <p :class="data.isSelected ? 'is-selected' : ''">
                {{ data.day.split('-').slice(1).join('-') }} {{ data.isSelected ? '✔️' : ''}}
              </p>
            </template>
          </el-calendar>
        </el-tab-pane>
        <el-tab-pane label="余额充值" name="third" style="margin-top:50px">
          <el-form :model="numberValidateForm"
            ref="numberValidateForm"
            label-width="100px">
            <el-form-item label="充值金额" prop="balance">
              <el-input type="balance"
                v-model.number="numberValidateForm.balance"
                autocomplete="off"
                style="width:200px"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('numberValidateForm')">支付</el-button>
              <el-button @click="resetForm('numberValidateForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </main>
  </div>
</template>

<script>

export default {
  name: 'car',
  data() {
    return {
      activeName: 'first',
      numberValidateForm: {
        age: '',
      },
    };
  },
  methods: {
    submitForm(formName) {
      console.log(formName);
      // this.$refs[formName].validate((valid) => {
      //   if (valid) {
      //     this.$message.warring('submit');
      //   } else {
      //     console.log('error submit!!');
      //     return false;
      //   }
      // });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
  created() {
  },
};
</script>

<style lang='scss' scoped>
.mine{
  height: 100%;
  padding-top:20px;
  header{
    height: 12.5em;
    width: $detailWidth;
    background-color: white;
    margin: 0 auto;
    display: flex;
    justify-content: row;
    margin-bottom:20px;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    .head{
      height: 100%;
      padding:32px ;
      img{
        height: 144px;
        width: 144px;
      }
    }
    .content{
      display: flex;
      flex-direction:column;
      .font{
        font-size:14px;
        margin-bottom: 12px;
      }
    }
  }
  main{
    width: $detailWidth;
    background-color: white;
    margin: 0 auto;
    padding:20px 20px;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  }
}
</style>
