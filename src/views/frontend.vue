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
    API.getSpeechRawData().then(response => {
      this.talks = response.data.result;
    });
  },
  components: {
    forntendDisplay
  }
};
</script>
