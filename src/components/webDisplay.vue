<template>
<ul v-if="frontendTalks.length">
  <template v-for="(talk,index) in frontendTalks">
    <li class="talk"   v-bind:id="getAnchorName(talk.speaker,talk.speech_date)" v-bind:key="index">
      <h1>{{talk.title}}</h1>
      <div class="talk_title">
        <div class="speaker_name">
          <img v-bind:src="talk.speaker_img" alt="">
          <span>{{talk.speaker}}</span>
        </div>
        <div class="Summary">
          {{talk.message}}
        </div>
      </div>
      <label>日期：{{talk.speech_date}}</label>
    </li>
  </template>
</ul>
</template>

<script>
export default {
  props: ['talks'],
  methods: {
    getAnchorName: function (name, date) {
      const id = name + date;
      return id.split(' ').join('');
    },
    isFrontend: function (item) {
      const frontEndCondition = ['Front-end', 'CSS', 'JavaScript', 'HTML', 'Vue']
      let photo = item.speaker_img
      item.speaker_img = this.checkPhoto(photo)
      return frontEndCondition.includes(item.class)
    },
    checkPhoto: function (photo) {
      let hasPhoto = photo.includes('imgur')
      if (!hasPhoto) {
        photo = '/goodidea.png'
        return photo
      }
      return photo
    }

  },
  computed: {
    frontendTalks: function () {
      let frontendTalks = this.talks.filter(this.isFrontend)
      // let frontendTalks = this.talks.filter(data => isFrontend(data));
      return frontendTalks.reverse()
    }
  }
}
</script>
