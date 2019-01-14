<template>
<div id="app">
  <div id="nav">
    <router-link to="/">Members</router-link> |
    <router-link to="/web">Web</router-link> |
    <router-link to="/backend">Back-end</router-link> |
    <router-link to="/ios">IOS</router-link> |
    <router-link to="/android">Android</router-link> |
  </div>
  <router-view/>
  <div class="scrollTop" v-on:click="scrollTop">
      <i class="fas fa-sort-up"></i>
  </div>
</div>
</template>
<script type="text/javascript">
export default {
  methods: {
    scrollTop: function () {
      (document.documentElement || document.body).scrollTop = 0;
    }
  }
}
</script>
<style lang="scss">
@import "./assets/componentStyle.scss";
</style>
