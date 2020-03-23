<template>
  <div id="layout">
    <nav-bar />

    <main>
      <router-view></router-view>
    </main>

  </div>
</template>

<script>
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
    height:calc(100% - 70px - 100px);
    background: $grayBack;
  }
}
</style>
