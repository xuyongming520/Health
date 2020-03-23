<template>
  <div id="login">
    <main>
      <el-card class="login">
        <header>
          <svg-icon icon-class="book" class-name="icon" class="loginIcon"/>
          <div class="logo" >Library</div>
        </header>
        <section>
          <el-form
            :model="loginForm"
            status-icon
            :rules="rules"
            ref="loginForm"
            label-width="100px"
            class="demo-ruleForm">
            <el-form-item label="账号" prop="uniqueId" placeholder="请输入账号" style="width:400px">
              <el-input v-model="loginForm.uniqueId"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password" placeholder="请输入密码" style="width:400px">
              <el-input type="password" v-model="loginForm.password"></el-input>
            </el-form-item>
            <el-form-item >
              <el-button type="primary" @click="submit" style="margin-top:15px">登陆</el-button>
              <el-button @click="register" style="float:right;margin:15px 70px">注册</el-button>
            </el-form-item>
          </el-form>
        </section>
      </el-card>
    </main>
  </div>
</template>

<script>
// import * as users from '../../api/users';

export default {
  name: 'login',
  data() {
    return {
      loginForm: {
        uniqueId: '',
        password: '',
      },
      rules: {
        uniqueId: [
          { required: true, message: '请输入账号', trigger: 'blur' },
        ],
        passw1: [
          { required: true, message: '请输入密码', trigger: 'blur' },
        ],
      },
    };
  },
  methods: {
    async submit() {
      // console.log(this.loginForm);
      await this.$store.dispatch('login', this.loginForm);
      if (this.$store.getters.isLogin) {
        this.$router.push({ name: 'homepage' });
        this.$message.success('登陆成功');
      } else {
        this.$message.error('账号密码错误');
      }
      this.$store.dispatch('getUniqueId', this.loginForm);
    },
    register() {
      this.$router.push({ name: 'register' });
    },
  },
};
</script>

<style lang='scss' scoped>
#login{
  height: 100%;
  main{
    width: $detailWidth;
    margin: 0 auto;
    height:100%;
    display:flex;
    justify-content: center;
    align-items: center;
    .login{
      width: 500px;
      height: 350px;
      border-radius: 5px 5px 5px 5px;
      margin-top:120px;
      header{
        height:30%;
        display:flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: center;
        .loginIcon{
          height: 60px;
          width: 80px;
        }
        .logo{
          font-size: 1.8em;
        }
      }
    }
    section{
      margin-top: 20px;
    }
  }
}
</style>
