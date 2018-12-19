<template>
<div class="home">
  <div class="all_speakers_speech_statistic">
    <h1>每月統計:</h1>
    <ve-line :after-set-option-once="getChartInit"  :data="all_speakers_speech_statistic.chartData" :data-zoom="all_speakers_dataZoom" :events="detectSliderMove()"></ve-line>
  </div>
  <speakerDisplay :speakerList="speaker_list" :chartXMax="chartSettings" :dataZoomDuration="dataZoom_duration"/>
</div>
</template>

<script>
import "v-charts/lib/style.css";
import speakerDisplay from "@/components/speakerDisplay.vue";
import API from "../axios";
import {
  generateSpeakersSpeechList,
  calculSpeakersSpeechCount
} from "../data_statistic";
export default {
  name: "home",
  data: function() {
    return {
      all_speakers_chartInit: "",
      speaker_list: [],
      all_speakers_speech_statistic: [],
      chartSettings: {
        max: []
      },
      all_speakers_dataZoom: {
        type: "slider",
        show: true,
        start: 0,
        end: 100,
        realtime: false
      },
      dataZoom_duration: {
        start: 0,
        end: 100,
        startIndex:0,
        endIndex:0
      },
    };
  },
  mounted: function() {
    API.GET("/speech/data")
      .then(generateSpeakersSpeechList)
      .then(calculSpeakersSpeechCount)
      .then(([unique_speakers_statistic, all_speakers_speech_statistic]) => {
        this.speaker_list = unique_speakers_statistic;
        this.all_speakers_speech_statistic = all_speakers_speech_statistic;
        this.chartSettings.max.push(this.calculSpeechMaxCount());

      });
  },
  components: {
    speakerDisplay
  },
  methods: {
    calculSpeechMaxCount: function() {
      let speech_count_list = this.all_speakers_speech_statistic.chartData.rows.map(
        month => {
          return month.month_speechs_count;
        }
      );
      let max_count = speech_count_list.reduce(function(oldNum, newNum) {
        return Math.max(oldNum, newNum);
      });
      return max_count;
    },
    detectSliderMove: function() {
      let self = this;
      return {
        datazoom: function(e) {
          self.updateSpeakerZoom(e.start, e.end);
        }
      };
    },
    updateSpeakerZoom: function(startPoint, endPoint) {
      const xAxis = this.all_speakers_chartInit.getOption().xAxis[0];
      const duration = {
        start: Number(startPoint.toFixed(2)),
        end: Number(endPoint.toFixed(2)),
        startIndex: xAxis.rangeStart,
        endIndex: xAxis.rangeEnd
      };
      this.dataZoom_duration = duration;
    },
    getChartInit: function(echart) {
      this.all_speakers_chartInit = echart;
    }
  }
};
</script>
