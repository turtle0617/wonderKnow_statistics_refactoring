<template >
<ul>
  <li v-for="( speaker, index) in speaker_list " v-bind:key="index">
    <div class="speaker" v-on:click="checkChart(speaker)">
      <img v-bind:src="speaker.photo" alt=""> {{ speaker.name }}
    </div>
    <h3>總演講次數: {{speaker.speechs_count}}</h3>
    <div v-if="speaker.showChart">
      <ve-line :data="speaker.chartData" :settings="chartSettings" :after-set-option-once="(echarts)=>getSpeakerInit(echarts,index)"></ve-line>
    </div>
  </li>
</ul>
</template>


<script>
export default {
  props: ["speaker_list_and_maxCount","datazoom"],
  data: function() {
    return {
      speaker_list: [],
      chartSettings: {
        max: []
      }
    };
  },
  watch: {
    speaker_list_and_maxCount: function(speaker_list_and_maxCount) {
      this.speaker_list = speaker_list_and_maxCount.speaker;
      this.chartSettings = speaker_list_and_maxCount.max;
    },
    datazoom:function (datazoom) {
      this.speaker_list.forEach(speaker => {
        speaker.echartInit.setOption(datazoom);
      });
    }
  },
  methods: {
    getSpeakerInit: function(echarts, index) {
      this.speaker_list[index].echartInit = echarts;
    },
    checkChart: function(speaker) {
      speaker.showChart = !speaker.showChart;
    },
  }
};
</script>
