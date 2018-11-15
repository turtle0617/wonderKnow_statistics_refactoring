<template>
  <div>

  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";
let url = "https://devche.com/api/speech/data";
export default {
  created: function() {
    axios.get(url).then(response => {
      this.$emit("send-datas", response.data.result);
    });
  }
};
</script>
