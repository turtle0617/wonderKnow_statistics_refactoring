<template>
<ul>
  <li v-for="(talk,index) in androidTalks" v-bind:key="index">
    <h1>主題：{{talk.title}}</h1>
    <div class="talk">
      <div class="speaker">
        <img v-bind:src="talk.speaker_img" alt="">
        <span>{{talk.speaker}}</span>
      </div>
      <div class="Summary">
        {{talk.message}}
      </div>
    </div>
    <label>日期：{{talk.speech_date}}</label>
  </li>
</ul>
</template>

<script>
export default {
  props: ["talks"],
  methods: {
    isAndroid: function(item) {
      const androidCondition = ["Android"];
      let photo = item.speaker_img;
      item.speaker_img = this.checkPhoto(photo);
      return androidCondition.includes(item.class);
    },
    checkPhoto: function(photo) {
      let hasPhoto = photo.includes("imgur");
      if (!hasPhoto) {
        photo = "/goodidea.png";
        return photo;
      }
      return photo;
    }
  },
  computed: {
    androidTalks: function() {
      // let arr = this.talks.map(talk => talk.speaker_img)
      // return arr;
      let androidTalks = this.talks.filter(this.isAndroid);
      return androidTalks.reverse();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
