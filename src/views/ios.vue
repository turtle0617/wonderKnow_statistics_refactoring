<template>
<div class="backend">
  <iosDisplay v-bind:talks="talks" />
</div>
</template>

<script>
import iosDisplay from "@/components/iosDisplay.vue";
import { axiosURL } from "../axios";
export default {
  name: "backend",
  data: function() {
    return {
      talks: []
    };
  },
  mounted: function() {
    axiosURL().then(response => {
      this.talks = response.data.result;
    });
  },
  components: {
    iosDisplay
  }
};
</script>
