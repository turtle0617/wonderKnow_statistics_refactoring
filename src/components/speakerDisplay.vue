<template >
<ul v-masonry item-selector=".item">
  <template v-for="speaker in speaker_list">
    <li v-masonry-tile class="item"  fit-width="true" v-if="speaker.speechs_count>0" v-bind:key="speaker.name">
      <div class="speaker" v-on:click="showChart(speaker)">
        <img v-bind:src="speaker.photo" alt=""> {{ speaker.name }}
      </div>
      <h3>總演講次數: {{speaker.speechs_count}}</h3>
      <div v-if="speaker.showChart">
          <ve-line width="400px" :data="speaker.chartData" :data-zoom="speaker_dataZoom" :settings="chartXMax" ></ve-line>
      </div>
    </li>
  </template>

</ul>
</template>

<script>
import {
  sortBySpeechCount
} from '../data_statistic'
export default {
  props: ['speakerList', 'chartXMax', 'dataZoomDuration'],
  data: function () {
    return {
      speaker_list: [],
      speaker_dataZoom: {
        type: 'slider',
        show: false,
        start: 0,
        end: 100
      }
    }
  },
  watch: {
    speakerList: function (speakerList) {
      this.speaker_list = sortBySpeechCount(speakerList)
    },
    dataZoomDuration: function (dataZoomDuration) {
      const startIndex = dataZoomDuration.startIndex
      const endIndex = dataZoomDuration.endIndex
      const speaker_option = {
        type: 'slider',
        show: false,
        start: dataZoomDuration.start,
        end: dataZoomDuration.end
      }
      this.speaker_dataZoom = speaker_option
      this.speaker_list.forEach(speaker => {
        speaker.speechs_count = this.calculMonthPeriodSpeechCount(
          speaker,
          startIndex,
          endIndex
        )
      })

      this.speaker_list = sortBySpeechCount(this.speaker_list)
    }
  },
  methods: {
    showChart: function (speaker) {
      speaker.showChart = !speaker.showChart
      this.$nextTick(function () {
        this.$redrawVueMasonry()
      })
    },
    calculMonthPeriodSpeechCount: function (speaker, startIndex, endIndex) {
      return speaker.monthly_of_speech_count.reduce(function (
        accumulator,
        currentValue,
        index
      ) {
        if (index < startIndex || index > endIndex) return accumulator
        return (accumulator += currentValue)
      },
      0)
    }
  }
}
</script>
