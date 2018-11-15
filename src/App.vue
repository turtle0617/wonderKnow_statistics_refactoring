<template>
<div id="app">
  <div id="nav">
    <router-link to="/">Members</router-link> |
    <router-link to="/Frontend">Front-end</router-link> |
    <router-link to="/Backend">Back-end</router-link> |
    <router-link to="/ios">IOS</router-link> |
    <router-link to="/android">Android</router-link> |
  </div>
  <router-view/>
</div>
</template>
<script>
</script>
<style lang="scss">
@import "./assets/componentStyle.scss";
</style>
