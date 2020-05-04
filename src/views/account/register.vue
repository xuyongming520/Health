<template>
  <div id="register">
    <main>
      <el-card class="register">
        <header>
          <svg-icon icon-class="book" class-name="icon" class="registerIcon"/>
          <div class="logo" >注册</div>
        </header>
        <section>
          <el-form
            :model="registerForm"
            status-icon
            :rules="rules"
            ref="registerForm"
            label-width="100px"
            class="demo-ruleForm">
            <el-form-item label="电话号码" prop="phone" style="width:400px">
              <el-input v-model="registerForm.phone" placeholder="请输入账号"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password" style="width:400px">
              <el-input
                type="password"
                v-model="registerForm.password"
                placeholder="请输入密码">
              </el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPass" style="width:400px">
              <el-input
                type="password"
                v-model="registerForm.checkPass"
                placeholder="请再次输入密码">
              </el-input>
            </el-form-item>
            <el-form-item label="姓名" prop="name" style="width:400px">
              <el-input v-model="registerForm.name" placeholder="请输入姓名"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email" style="width:400px">
              <el-input v-model="registerForm.email" placeholder="请输入邮箱"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                @click="register"
                type="primary"
                style="width:270px;margin-top:15px">注册</el-button>
            </el-form-item>
          </el-form>
        </section>
      </el-card>
    </main>
  </div>
</template>

<script>
import * as user from '../../api/users';

export default {
  name: 'register',
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.registerForm.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      registerForm: {
        phone: '',
        password: '',
        checkPass: '',
        name: '',
        email: '',
      },
      rules: {
        phone: [
          {
            pattern: /^[1][3,4,5,7,8,9][0-9]{9}$/,
            required: true,
            message: '输入的电话有误',
            trigger: 'blur',
          },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
        ],
        checkPass: [
          { validator: validatePass },
          { required: true, message: '两次密码不一致', trigger: 'blur' },
        ],
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
        ],
        email: [
          {
            // eslint-disable-next-line no-useless-escape
            pattern: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
            required: true,
            message: '输入的邮箱有误',
            trigger: 'blur',
          },
        ],
      },
    };
  },
  methods: {
    register() {
      user.register(this.registerForm)
        .then((result) => {
          switch (result.data.code) {
            case 0:
              this.$message.success('注册成功');
              this.$router.push({ name: 'login' });
              break;
            case 1:
              this.$message.warning('该账号已注册');
              break;
            case 2:
              this.$message.error('注册失败');
              break;
            default:
              this.$message.error('注册失败');
              break;
          }
        });
    },
  },
};
</script>

<style lang='scss' scoped>
#register{
  height: 100%;
  main{
    width: $detailWidth;
    margin: 0 auto;
    height:100%;
    display:flex;
    justify-content: center;
    align-items: center;
    .register{
      width: 500px;
      height: 550px;
      border-radius: 5px 5px 5px 5px;
      margin-top:30px;
      header{
        height:30%;
        display:flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: center;
        .registerIcon{
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
