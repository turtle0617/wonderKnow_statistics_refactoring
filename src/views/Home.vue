<template>
<div class="home">
  <div class="all_speakers_speech_statistic">
    <h1>每月統計:</h1>
    <ve-line :data="all_speakers_speech_statistic.chartData" :data-zoom="all_speakers_dataZoom" :events="detectSliderMove()"></ve-line>
  </div>
  <speakerDisplay v-bind:speaker_list_and_maxCount="{speaker:speaker_list,max:chartSettings}" :datazoom="speaker_dataZoom" />
</div>
</template>

<script>
import "v-charts/lib/style.css";
import speakerDisplay from "@/components/speakerDisplay.vue";
import API from "../axios";
import {
  generateSpeakersSpeechList,
  calculSpeakersSpeechCount,
  sortBySpeechCount
} from "../data_statistic";
export default {
  name: "home",
  data: function() {
    return {
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
        realtime: false,
        // startValue: 0,
        // endValue: 20,
        // rangeMode: ["value", "value"]
      },
      speaker_dataZoom: {
        type: "slider",
        show: false,
        start: 0,
        end: 100
      }
    };
  },
  mounted: function() {
    API.GET("/speech/data")
      .then(generateSpeakersSpeechList)
      .then(calculSpeakersSpeechCount)
      .then(([unique_speakers_statistic, all_speakers_speech_statistic]) => {
        this.speaker_list = sortBySpeechCount(unique_speakers_statistic);
        this.all_speakers_speech_statistic = all_speakers_speech_statistic;
        this.chartSettings.max.push(this.calculSpeechMaxCount());
        // this.getMonthDuration(all_speakers_speech_statistic.chartData.rows)
      });
  },
  components: {
    speakerDisplay
  },
  methods: {
    getMonthDuration: function(month_list) {
      const month_duration = month_list.length - 1;
      this.all_speakers_dataZoom.endValue = month_duration;
    },
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
          console.log(e.startValue,e.endValue);
          self.updateSpeakerZoom(e.start, e.end);
        }
      };
    },
    updateSpeakerZoom: function(startPoint, endPoint) {
      let changeZoom = {
        dataZoom: [{
          type: "slider",
          show: false,
          start: startPoint,
          end: endPoint
        }]
      };
      this.all_speakers_dataZoom.start = startPoint;
      this.all_speakers_dataZoom.end = endPoint;

      this.speaker_dataZoom = changeZoom;
    }
  }
};
</script>
