<template>
<ul>
  <template v-for="(talk,index) in backendTalks">
    <li class="talk" v-bind:id="getAnchorName(talk.speaker,talk.speech_date)" v-bind:key="index">
      <div class="talk_title">
        {{talk.title}}
      </div>
      <div class="talk_detail">
        <div class="talk_name">
          <img v-bind:src="talk.speaker_img" alt="">
          <span>{{talk.speaker}}</span>
        </div>
        <div class="talk_summary">
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
    isBackend: function (item) {
      const backEndCondition = [
        'Backend-end',
        'backend-end',
        'Security',
        'NodeJS'
      ]
      let photo = item.speaker_img
      item.speaker_img = this.checkPhoto(photo)
      return backEndCondition.includes(item.class)
    },
    checkPhoto: function (photo) {
      let hasPhoto = photo.includes('imgur')
      if (!hasPhoto) {
        photo = process.env.BASE_URL + 'goodidea.png'
        return photo
      }
      return photo
    }
  },
  computed: {
    backendTalks: function () {
      // let arr = this.talks.map(talk => talk.speaker_img)
      // return arr;
      let backendTalks = this.talks.filter(this.isBackend)
      return backendTalks.reverse()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
