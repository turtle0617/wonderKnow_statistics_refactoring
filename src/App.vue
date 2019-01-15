<template>
<div id="app">
  <div class="nav">
    <router-link to="/">Members</router-link>
    <div class="nav__separate">|</div>
    <router-link to="/web">Web</router-link>
    <div class="nav__separate">|</div>
    <router-link to="/backend">Back-end</router-link>
    <div class="nav__separate">|</div>
    <router-link to="/ios">IOS</router-link>
    <div class="nav__separate">|</div>
    <router-link to="/android">Android</router-link>
  </div>
  <div class="fb-like" data-href="https://www.facebook.com/GoodideasStudio/" data-layout="button_count" data-action="like" data-size="small" data-show-faces="false" data-share="true"></div>
  <router-view/>
  <div class="scrollTop" v-on:click="scrollTop">
      <!-- <i class="fas fa-sort-up"></i> -->
      <i class="fas fa-angle-up"></i>
  </div>
</div>
</template>
<script type="text/javascript">
export default {
  methods: {
    scrollTop: function () {
      window.scrollTo(0, 0)
    }
  }
}
</script>
<style lang="scss">
@import "./assets/componentStyle.scss";
</style>
