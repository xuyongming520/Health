<template>
  <div id="top">
    <div class="loginUser">
      <main>
        <section class="loginStatus">
          <div class="login" v-if="!phone">
            <span @click="handleToLogin()">登录</span>
            <span @click="handleToRegister()">注册</span>
          </div>
          <div class="user" v-else>
              {{this.phone}}
            <span @click="handleToLogout()">退出登陆</span>
          </div>
        </section>
      </main>
    </div>
    <div class="navigation">
      <main>
        <section class="navigationStatus">
          <svg-icon icon-class="health" class-name="icon" @click="handleToHomepage()" />
          <div class="logo" @click="handleToHomepage()">Health</div>
          <nav>
            <a @click="files">健康档案</a>
            <a @click="diary">饮食日记</a>
            <a @click="mall">健康商城</a>
            <a @click="car">购物车</a>
            <a @click="mine">我的</a>
          </nav>
        </section>
      </main>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'top',
  computed: {
    ...mapGetters([
      'phone',
    ]),
  },
  methods: {
    handleToHomepage() {
      this.$router.push({ name: 'homepage' });
    },
    handleToLogin() {
      this.$router.push({ name: 'login' });
    },
    handleToLogout() {
      this.$store.dispatch('logout');
      this.handleToHomepage();
    },
    handleToRegister() {
      this.$router.push({ name: 'register' });
    },
    handleToUserInfo() {
      this.$router.push({ name: 'mine' });
    },
    mall() {
      this.$router.push({ name: 'mall' });
    },
    car() {
      if (this.phone) {
        this.$router.push({ name: 'car' });
      } else {
        this.$message.error('请先登陆');
        this.$router.push({ name: 'login' });
      }
    },
    mine() {
      if (this.phone) {
        this.$router.push({ name: 'mine' });
      } else {
        this.$message.error('请先登陆');
        this.$router.push({ name: 'login' });
      }
    },
    diary() {
      if (this.phone) {
        this.$router.push({ name: 'diary' });
      } else {
        this.$message.error('请先登陆');
        this.$router.push({ name: 'login' });
      }
    },
    files() {
      if (this.phone) {
        this.$router.push({ name: 'files' });
      } else {
        this.$message.error('请先登陆');
        this.$router.push({ name: 'login' });
      }
    },
  },
};
</script>


<style lang="scss" scoped>
#top{
  width: 100%;
  height: 170px;
  display: flex;
  flex-direction: column;
  z-index: 1;
  .loginUser{
    background: $top;
    line-height: 40px;
    height:40px;
    color:$topFont;
    main{
      width: $detailWidth;
      margin: 0 auto;
      position: relative;
      display: flex;
      justify-content: flex-end;
      .loginStatus{
        width: 200px;
        .login,.user{
          display: flex;
          justify-content: space-between;
          span{
            transition: all .3s;
            &:hover{
              color: $topFontActive;
            }
          }
        }
      }
    }
  }
  .navigation{
    font-size: 1.2em;
    height: 130px;
    color:$navigation;
    font-weight: 600;
    box-shadow: 0 3px 0 #d2d2d2;
    font-family: "Poiret One", cursive;
    main{
      width: $detailWidth;
      margin: 0 auto;
      position: relative;
      height: 100%;
      .navigationStatus{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        height: 100%;
        .icon{
            width: 50px;
            height:40px;
            margin-right:10px;
          }
        .logo{
          flex:4;
          font-size:2em;
          font-weight: bold;
          color:$topFontActive;
          text-align: left;
          align-items: center;
          cursor: pointer;
        }
        nav{
          flex:3;
          display: flex;
          justify-content: space-between;
          a{
            transition: all .3s;
            &:hover{
              color: $topFontActive;
            }
          }
        }
      }
    }
  }
}
</style>
