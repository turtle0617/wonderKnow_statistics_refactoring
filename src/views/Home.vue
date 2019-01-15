<template>
<div class="home" >
  <div v-if="!!all_speakers_speech_statistic" class="all_speakers_speech_statistic">
    <h1>總演講次數 : {{all_speakers_speech_statistic.speeches_count}}</h1>
    <ve-line :extend="allSpeakerChartExtend" :after-set-option-once="getChartInit"  :data="all_speakers_speech_statistic.chartData" :data-zoom="all_speakers_dataZoom" :events="detectSliderMove()"></ve-line>
  </div>
  <speakerDisplay :speakerList="speaker_list" :chartXMax="chartSettings" :dataZoomDuration="dataZoom_duration"/>
</div>
</template>

<script>
import 'v-charts/lib/style.css'
import speakerDisplay from '@/components/speakerDisplay.vue'
import API from '../axios'
import {
  generateSpeakersSpeechList,
  calculSpeakersSpeechCount,
  calculMonthPeriodSpeechCount
} from '../data_statistic'
export default {
  name: 'home',
  data: function () {
    return {
      all_speakers_chartInit: '',
      speaker_list: [],
      all_speakers_speech_statistic: null,
      chartRowEndIndex: null,
      chartSettings: {
        max: []
      },
      allSpeakerChartExtend: {
        color: '#4484ce'
      },
      all_speakers_dataZoom: {
        type: 'slider',
        show: true,
        start: 0,
        end: 100,
        realtime: false
      },
      dataZoom_duration: {
        start: 0,
        end: 100,
        startIndex: 0,
        endIndex: 0
      }
    }
  },
  created: function () {
    API.GET('/speech/data')
      .then(generateSpeakersSpeechList)
      .then(calculSpeakersSpeechCount)
      .then(([unique_speakers_statistic, all_speakers_speech_statistic]) => {
        this.speaker_list = unique_speakers_statistic;
        this.all_speakers_speech_statistic = all_speakers_speech_statistic;
        this.chartRowEndIndex = all_speakers_speech_statistic.chartData.rows.length - 1;
        this.chartSettings.max.push(this.calculSpeechMaxCount());
      })
  },
  components: {
    speakerDisplay
  },
  methods: {
    calculSpeechMaxCount: function () {
      let speech_count_list = this.all_speakers_speech_statistic.chartData.rows.map(
        month => {
          return month.month_speeches_count
        }
      )
      let max_count = speech_count_list.reduce(function (oldNum, newNum) {
        return Math.max(oldNum, newNum)
      })
      return max_count
    },
    detectSliderMove: function () {
      let self = this
      return {
        datazoom: function (e) {
          self.updateSpeakerZoom(e.start, e.end)
        }
      }
    },
    updateSpeakerZoom: function (startPoint, endPoint) {
      const xAxis = this.all_speakers_chartInit.getOption().xAxis[0];
      const startIndex = xAxis.rangeStart || 0; // 超出 datazoom 範圍時會吐 null，防止崩潰用
      const endIndex = xAxis.rangeEnd || this.chartRowEndIndex
      const duration = {
        start: Number(startPoint.toFixed(2)),
        end: Number(endPoint.toFixed(2)),
        startIndex: startIndex,
        endIndex: endIndex,
        startMonth: xAxis.data[startIndex],
        endMonth: xAxis.data[endIndex]
      }
      console.log(duration.startMonth, duration.endMonth);
      this.all_speakers_dataZoom.start = startPoint;
      this.all_speakers_dataZoom.end = endPoint;
      this.all_speakers_speech_statistic.speeches_count = calculMonthPeriodSpeechCount(
        this.all_speakers_speech_statistic,
        duration.startIndex,
        duration.endIndex
      )
      this.dataZoom_duration = duration
    },
    getChartInit: function (echart) {
      this.all_speakers_chartInit = echart
    }
  }
}
</script>
