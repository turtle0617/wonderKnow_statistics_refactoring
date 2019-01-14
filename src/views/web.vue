<template>
<div class="web">
  <webDisplay v-bind:talks="talks" />
</div>
</template>

<script>
import webDisplay from '@/components/webDisplay.vue'
import API from '../axios'
export default {
  name: 'web',
  data: function () {
    return {
      talks: []
    }
  },
  mounted: function () {
    const anchor = this.$router.currentRoute.hash;
    API.GET('/speech/data').then(response => {
      this.talks = response.result
    })
      .then(() => {
        this.$nextTick(() => {
          if (anchor && document.querySelector(anchor)) {
            location.href = anchor;
          }
        });
      })
  },
  components: {
    webDisplay
  }
}
</script>
