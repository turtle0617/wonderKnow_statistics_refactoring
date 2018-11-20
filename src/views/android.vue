<template>
<div class="backend">
  <androidDisplay v-bind:talks="talks" />
  <!-- <getData v-on:send-datas="receiveData" /> -->
</div>
</template>

<script>
import androidDisplay from "@/components/androidDisplay.vue";
import API from "../axios";
export default {
  name: "backend",
  data: function() {
    return {
      talks: []
    };
  },
  mounted: function() {
    API.GET("/speech/data").then(response => {
      this.talks = response.result;
    });
  },
  components: {
    androidDisplay
  }
};
</script>
