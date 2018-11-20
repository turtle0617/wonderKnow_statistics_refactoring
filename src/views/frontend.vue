<template>
<div class="frontend">
  <forntendDisplay v-bind:talks="talks" />
</div>
</template>

<script>
import forntendDisplay from "@/components/forntendDisplay.vue";
import API from "../axios";
export default {
  name: "frontend",
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
    forntendDisplay
  }
};
</script>
