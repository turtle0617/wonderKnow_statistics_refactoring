<template>
<div class="backend">
  <iosDisplay v-bind:talks="talks" />
</div>
</template>

<script>
import iosDisplay from '@/components/iosDisplay.vue'
import API from '../axios'
export default {
  name: 'backend',
  data: function () {
    return {
      talks: []
    }
  },
  mounted: function () {
    API.GET('/speech/data').then(response => {
      this.talks = response.result
    })
  },
  components: {
    iosDisplay
  }
}
</script>
