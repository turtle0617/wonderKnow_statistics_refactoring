<template>
<div class="backend">
  <backendDisplay v-bind:talks="talks" />
</div>
</template>

<script>
import backendDisplay from "@/components/backendDisplay.vue";
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
    backendDisplay
  }
};
</script>
