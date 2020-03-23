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
            <el-form-item label="账号" prop="uniqueId" style="width:400px">
              <el-input v-model="registerForm.uniqueId" placeholder="请输入账号"></el-input>
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
            <el-form-item label="类别" prop="classId" style="width:400px">
              <el-select v-model="registerForm.classId" placeholder="请选择角色类别">
                <el-option label="老师" value=1></el-option>
                <el-option label="学生" value=2></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="姓名" prop="name" style="width:400px">
              <el-input v-model="registerForm.name" placeholder="请输入姓名"></el-input>
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
        uniqueId: '',
        password: '',
        checkPass: '',
        name: '',
        classId: '',
      },
      rules: {
        uniqueId: [
          { required: true, message: '请输入账号', trigger: 'blur' },
        ],
        passw1: [
          { required: true, message: '请输入密码', trigger: 'blur' },
        ],
        checkPass: [
          { validator: validatePass },
          { required: true, message: '两次密码不一致', trigger: 'blur' },
        ],
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
        ],
        classId: [
          { required: true, message: '请选择类别 ', trigger: 'blur' },
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
              this.$message.error('注册失败');
              break;
            case 1:
              this.$message.success('注册成功');
              this.$router.push({ name: 'login' });
              break;
            default:
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
