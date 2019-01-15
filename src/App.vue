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
