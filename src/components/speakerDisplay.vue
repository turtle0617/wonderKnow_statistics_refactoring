<template >
  <ul v-if="!!speaker_list" class="speakers_container" v-masonry gutter="20" fit-width="true" item-selector=".speaker">
    <template v-for="speaker in speaker_list">
      <li v-masonry-tile class="speaker" column-width=".speaker" v-if="speaker.speeches_count>0" v-bind:key="speaker.name">
        <div class="speaker_name" v-on:click="showChart(speaker)">
          <img v-bind:src="speaker.photo" alt=""> {{ speaker.name }}
        </div>
        <h3>總演講次數: {{speaker.speeches_count}}</h3>
        <div class="speaker_chart" v-if="speaker.showChart">
            <ve-line  :extend="speakerChartExtend" :data="speaker.chartData" :data-zoom="speaker_dataZoom" :settings="chartXMax" ></ve-line>
        </div>
        <ul class="speaker_speechList" v-if="speaker.showChart">
          <template v-for="speech in calculSpeechListRange(speaker.speech_list)" >
              <router-link tag="li"
               v-bind:to="getAnchorName(speech.camp,speaker.name,speech.date)"
               class="speechList__item"
               v-bind:key="speech.title">
                <div
                  class="speechList__item--camp"
                  v-bind:class="'camp--' +convertClassToCampName(speech.camp)">
                    {{convertClassToCampName(speech.camp)}}
                </div>
                <div class="speechList__item--title">
                  {{speech.title}}
                </div>
              </router-link>
          </template>
        </ul>
      </li>
    </template>
  </ul>
</template>

<script>
import {
  sortBySpeechCount,
  calculMonthPeriodSpeechCount
} from '../data_statistic';
import moment from 'moment';
export default {
  props: ['speakerList', 'chartXMax', 'dataZoomDuration'],
  data: function () {
    return {
      speaker_list: null,
      startMonth: [2017, 3],
      endMonth: moment(),
      speakerChartExtend:{
        color: '#4484ce'
      },
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
      this.speaker_list = sortBySpeechCount(speakerList);
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
      this.startMonth = dataZoomDuration.startMonth;
      this.endMonth = dataZoomDuration.endMonth;

      this.speaker_list.forEach(speaker => {
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
    },
    calculSpeechListRange: function (list, startMonth = this.startMonth, endMonth = this.endMonth) {
      return list.filter(item => {
        return moment(item.date).isBetween(startMonth, endMonth, 'month', '[]')
      });
    },
    getAnchorName: function (className, name, date) {
      const campName = this.convertClassToCampName(className);
      const anchorName = `${campName}#${name}${date}`;
      return anchorName.split(' ').join('');
    },
    convertClassToCampName: function (className) {
      switch (className) {
        case 'HTML':
        case 'JavaScript':
        case 'CSS':
        case 'Vue':
        case 'Front-end':
          return 'web';
        case 'NodeJS':
        case 'Security':
        case 'Backend-end':
        case 'backend-end':
          return 'backend';
        case 'Android':
          return 'android';
        case 'IOS':
          return 'ios';
        default:
          return className;
      }
    }
  }
}
</script>
