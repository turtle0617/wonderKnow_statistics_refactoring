<template>
<ul>
  <li v-for="(talk,index) in backendTalks" v-bind:key="index">
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
    isBackend: function(item) {
      const backEndCondition = [
        "Backend-end",
        "backend-end",
        "Security",
        "NodeJS"
      ];
      let photo = item.speaker_img;
      item.speaker_img = this.checkPhoto(photo);
      return backEndCondition.includes(item.class);
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
    backendTalks: function() {
      // let arr = this.talks.map(talk => talk.speaker_img)
      // return arr;
      let backendTalks = this.talks.filter(this.isBackend);
      return backendTalks.reverse();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
