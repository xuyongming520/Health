<template>
  <div id="layout">
    <nav-bar />

    <main>
      <router-view></router-view>
    </main>

    <footer>
      <main>
        <div class="logo"><svg-icon icon-class="book" class-name="icon" /></div>
        <span>&copy; 图书管理系统</span>
      </main>
    </footer>
  </div>
</template>

<script>
// import navigation from './components/navigation.vue';
import NavBar from './components/top.vue';

export default {
  name: 'Layout',
  components: {
    NavBar,
  },
};
</script>

<style lang="scss" scoped>
#layout{
  height: 100%;
  width: 100%;

  main{
    width: 100%;
    min-height:calc(100% - 170px - 100px);
    background: #F2F6FC;
  }

  footer{
    width: 100%;
    height: 100px;
    text-align: center;
    background: $white;
    main{
      width: $detailWidth;
      margin: auto;
      border-top: 1px solid gray;
      background: $white;
      .logo{
        width: 40px;
        height: 60px;
        margin: auto;
        padding: 15px 0;
        .icon{
          width: 40px;
          height: 30px;
        }
      }
      span{
        color: $navigation;
        font-size: 14px;
      }
    }
  }
}
</style>
