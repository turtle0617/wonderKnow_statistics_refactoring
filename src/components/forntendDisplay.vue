<template>
<ul>
  <li v-for="(talk,index) in frontendTalks" v-bind:key="index">
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
    isFrontend: function(item) {
      const frontEndCondition = ["Front-end", "CSS", "HTML", "Vue"];
      let photo = item.speaker_img;
      item.speaker_img = this.checkPhoto(photo);
      return frontEndCondition.includes(item.class);
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
    frontendTalks: function() {
      let frontendTalks = this.talks.filter(this.isFrontend);
      // let frontendTalks = this.talks.filter(data => isFrontend(data));
      return frontendTalks.reverse();
    }
  }
};
</script>
