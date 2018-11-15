<template>
<div class="home">
  <div class="all_speakers_speech_statistic">
    <h1>每月統計:</h1>
    <ve-line :data="all_speakers_speech_statistic.chartData" :data-zoom="dataZoom" :events="detectSliderMove()"></ve-line>
  </div>
  <!-- <ul>
    <li v-for="( speaker, index) in speaker_list" v-bind:key="index">
      <div class="speaker" v-on:click="checkChart(speaker)">
        <img v-bind:src="speaker.photo" alt=""> {{ speaker.name }}
      </div>
      <h3>總演講次數: {{speaker.speechs_count}}</h3>
      <div v-if="speaker.showChart">
        <ve-line :data="speaker.chartData" :settings="chartSettings" :after-set-option="(echarts)=>memberOption(echarts,index)"></ve-line>
      </div>
    </li>
  </ul> -->
  <MemberDisplay v-bind:speaker_list="speaker_list" v-on:send-member-List="receivememberList" />
</div>
</template>

<script>
import "v-charts/lib/style.css";
import MemberDisplay from "@/components/Member.vue";
import { getStatisticData } from "../axios";
export default {
  name: "home",
  data: function() {
    return {
      speaker_list: [],
      all_speakers_speech_statistic: [],
      chartSettings: {
        max: [20]
      },
      dataZoom: [
        {
          type: "slider",
          show: true,
          start: 0,
          end: 100,
          realtime: false //滑鼠放開時才會更新數據
        }
      ]
    };
  },
  mounted: function() {
    // console.log('monuted');
    getStatisticData().then(response => {
      this.speaker_list = response[0];
      this.all_speakers_speech_statistic = response[1];
    });
  },
  components: {
    MemberDisplay
  },
  methods: {
    checkChart: function(member) {
      member.showChart = !member.showChart;
    },
    receivememberList: function(list, all_speakers_speech_statistic) {
      // this.speaker_list = list;
      this.all_speakers_speech_statistic = all_speakers_speech_statistic;
      this.calculMaxTalkCount(all_speakers_speech_statistic);
    },
    calculMaxTalkCount: function(all_month) {
      let count = all_month.chartData.rows.map(month => {
        return month.month_talks_count;
      });
      let max = count.reduce(function(oldNum, newNum) {
        return Math.max(oldNum, newNum);
      });
      // console.log("max", max);
      this.chartSettings.max = [max];
    },
    detectSliderMove: function() {
      return {
        datazoom: function(e) {
          // console.log(e);
          // this.dynamicZoomSlider(startPoint, endPoint);
        }
      };
    },
    memberOption: function(echarts, index) {
      this.speaker_list[index].echartInit = echarts;
    },
    dynamicZoomSlider: function(startPoint, endPoint) {
      let changeZoom = {
        dataZoom: [
          {
            type: "slider",
            show: false,
            start: startPoint,
            end: endPoint
          }
        ]
      };
      this.speaker_list.forEach(member => {
        member.echartInit.setOption(changeZoom);
      });
    }
  }
};
</script>
