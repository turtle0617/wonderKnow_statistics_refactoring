<template >
<ul>
  <li v-for="( speaker, index) in speaker_list " v-bind:key="index">
    <div class="speaker" v-on:click="showChart(speaker)">
      <img v-bind:src="speaker.photo" alt=""> {{ speaker.name }}
    </div>
    <h3>總演講次數: {{speaker.speechs_count}}</h3>
    <div v-if="speaker.showChart">
      <ve-line :data="speaker.chartData" :settings="chartXMax" :after-set-option-once="(echarts)=>getSpeakerChartInit(echarts,index)"></ve-line>
    </div>
  </li>
</ul>
</template>


<script>
import {
  sortBySpeechCount
} from "../data_statistic";
export default {
  props: ["speakerList", "chartXMax", "dataZoomDuration"],
  data: function() {
    return {
      speaker_list: [],
    };
  },
  watch: {
    speakerList: function(speakerList) {
      this.speaker_list = sortBySpeechCount(speakerList);
    },
    dataZoomDuration: function(dataZoomDuration) {
      const speaker_option = {
        dataZoom: [{
          type: "slider",
          show: false,
          start: dataZoomDuration.start,
          end: dataZoomDuration.end
        }]
      };
      console.log(dataZoomDuration.end);
      this.speaker_list.forEach(speaker => {
        speaker.echartInit.setOption(speaker_option);
      });
    }
  },
  methods: {
    getSpeakerChartInit: function(echarts, index) {
      this.speaker_list[index].echartInit = echarts;
    },
    showChart: function(speaker) {
      speaker.showChart = !speaker.showChart;
    }
  }
};
</script>
