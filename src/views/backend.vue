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
    API.getSpeechRawData().then(response => {
      this.talks = response.data.result;
    });
  },
  components: {
    backendDisplay
  }
};
</script>
