<template >
<ul v-if="!!speaker_list" class="speakers_container" v-masonry gutter="20" fit-width="true" item-selector=".speaker">
  <template v-for="speaker in speaker_list">
    <li v-masonry-tile class="speaker" column-width=".speaker" v-if="speaker.speeches_count>0" v-bind:key="speaker.name">
      <div class="speaker_name" v-on:click="showChart(speaker)">
        <img v-bind:src="speaker.photo" alt=""> {{ speaker.name }}
      </div>
      <h3>總演講次數: {{speaker.speeches_count}}</h3>
      <div class="speaker_chart" v-if="speaker.showChart">
          <ve-line  :data="speaker.chartData" :data-zoom="speaker_dataZoom" :settings="chartXMax" ></ve-line>
      </div>
    </li>
  </template>

</ul>
</template>

<script>
import {
  sortBySpeechCount,
  calculMonthPeriodSpeechCount
} from '../data_statistic'
export default {
  props: ['speakerList', 'chartXMax', 'dataZoomDuration'],
  data: function () {
    return {
      speaker_list: null,
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
      this.speaker_dataZoom = speaker_option;
      this.speaker_list.forEach(speaker => {
        console.log(speaker);
        speaker.speeches_count = calculMonthPeriodSpeechCount(
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
    }
  }
}
</script>
