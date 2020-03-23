<template>
  <div id="top">
    <div class="loginUser">
      <main>
        <section class="loginStatus">
          <div class="login" v-if="!isLogin">
            <span @click="handleToLogin()">登录</span>
            <span @click="handleToRegister()">注册</span>
          </div>
          <div class="user" v-else>
            <span @click="handleToUserInfo()">
              {{this.uniqueId}}
            </span>
            <span @click="handleToLogout()">退出登陆</span>
          </div>
        </section>
      </main>
    </div>
    <div class="navigation">
      <main>
        <section class="navigationStatus">
          <svg-icon icon-class="book" class-name="icon" @click="handleToHomepage()" />
          <div class="logo" @click="handleToHomepage()">Library</div>
          <nav>
            <a @click="search">书目检索</a>
            <a @click="classify">分类浏览</a>
            <a @click="library">我的图书馆</a>
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
      'isLogin',
      'uniqueId',
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
      this.$router.push({ name: 'user' });
    },
    search() {
      this.$router.push({ name: 'search' });
    },
    classify() {
      this.$router.push({ name: 'classify' });
    },
    library() {
      this.$router.push({ name: 'library' });
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
        width: 150px;
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
          flex:2;
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
