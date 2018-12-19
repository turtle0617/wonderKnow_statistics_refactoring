<template >
<ul>
  <li v-for="( speaker, index) in speaker_list " v-bind:key="index">
    <div v-if="speaker.speechs_count>0">
      <div class="speaker" v-on:click="showChart(speaker)">
        <img v-bind:src="speaker.photo" alt=""> {{ speaker.name }}
      </div>
      <h3>總演講次數: {{speaker.speechs_count}}</h3>
      <div v-if="speaker.showChart">
        <ve-line :data="speaker.chartData" :data-zoom="speaker_dataZoom" :settings="chartXMax" :after-set-option-once="(echarts)=>getSpeakerChartInit(echarts,index)"></ve-line>
      </div>
    </div>

  </li>
</ul>
</template>


<script>
import {
  sortBySpeechCount
} from "../data_statistic";
export default {
  props: [
    "speakerList",
    "chartXMax",
    "dataZoomDuration",
    "percentageOfMonthPeriod"
  ],
  data: function() {
    return {
      speaker_list: [],
      speaker_dataZoom: {
        type: "slider",
        show: false,
        start: 0,
        end: 100,
      }
    };
  },
  watch: {
    speakerList: function(speakerList) {
      this.speaker_list = sortBySpeechCount(speakerList);
    },
    dataZoomDuration: function(dataZoomDuration) {
      const startIndex = dataZoomDuration.startIndex;
      const endIndex = dataZoomDuration.endIndex;
      const speaker_option = {
        type: "slider",
        show: false,
        start: dataZoomDuration.start,
        end: dataZoomDuration.end,
      };
      this.speaker_dataZoom = speaker_option;
      console.time();
      this.speaker_list.forEach(speaker => {
        speaker.speechs_count = this.calculMonthPeriodSpeechCount(speaker, startIndex, endIndex);
      });

      this.speaker_list = sortBySpeechCount(this.speaker_list);
      console.timeEnd();
    }
  },
  methods: {
    getSpeakerChartInit: function(echarts, index) {
      this.speaker_list[index].echartInit = echarts;
    },
    showChart: function(speaker) {
      speaker.showChart = !speaker.showChart;
    },
    calculMonthPeriodSpeechCount: function(speaker, startIndex, endIndex) {
      const count = speaker.monthly_of_speech_count.reduce(function(
          accumulator,
          currentValue,
          index
        ) {
          if (index < startIndex || index > endIndex) return accumulator;
          return (accumulator += currentValue);
        },
        0);

      return count;
    }
  }
};
</script>
