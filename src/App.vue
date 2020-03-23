<template>
  <div id="app">
    <router-view />

  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'app',
  components: {
    ...mapGetters([
      'isLogin',
    ]),
  },
  created() {
    if (this.isLogin) {
      // this.$store.dispatch('getUniqueId');
    }
  },
};

</script>
