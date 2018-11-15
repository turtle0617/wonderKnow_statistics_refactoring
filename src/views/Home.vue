<template>
<div class="home">
  <!-- <MemberDisplay v-bind:talks="talks" v-on:send-member-List="receivememberList" /> -->
  <div class="members_month">
    <h1>每月統計:</h1>
    <ve-line :data="all_speakers_speech_statistic.chartData" :data-zoom="dataZoom" :after-set-option="membersAfterOption"></ve-line>
  </div>
  <!-- <ul>
    <li v-for="( speaker, index) in member_List" v-bind:key="index">
      <div class="speaker" v-on:click="checkChart(speaker)">
        <img v-bind:src="speaker.photo" alt=""> {{ speaker.speaker }}
      </div>
      <h3>總演講次數: {{speaker.talk_count}}</h3>
      <div v-if="speaker.showChart">
        <ve-line :data="speaker.chartData" :settings="chartSettings" :after-set-option="(echarts)=>memberOption(echarts,index)"></ve-line>
      </div>
    </li>
  </ul> -->
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
      talks: [],
      member_List: [],
      all_speakers_speech_statistic: [],
      chartSettings: {
        max: [20]
      },
      dataZoom: [
        {
          type: "slider",
          show: true,
          start: 0,
          end: 100
        }
      ]
    };
  },
  mounted: function() {
    // console.log('monuted');
    getStatisticData().then(response => {
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
      this.member_List = list;
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
      this.chartSettings.max = [max];
    },
    membersAfterOption: function(echarts) {
      let chartDom = echarts._dom;
      let bodyDom = document.getElementById("app");
      let clickOnSlider = false;
      let startPoint;
      let endPoint;
      // console.log(echarts);
      echarts.on("dataZoom", params => {
        startPoint = parseInt(params.start);
        endPoint = parseInt(params.end);
      });
      chartDom.addEventListener("mousedown", e => {
        let inSliderRange = e.offsetY > 360;
        if (!inSliderRange) return;
        clickOnSlider = !clickOnSlider;
      });
      bodyDom.addEventListener("mouseup", () => {
        if (!clickOnSlider) return;
        clickOnSlider = !clickOnSlider;
        this.dynamicZoomSlider(startPoint, endPoint);
      });
      // echarts.on("dataZoom", params => {
      //   startPoint = parseInt(params.start);
      //   endPoint = parseInt(params.end);
      //   this.dynamicZoomSlider(startPoint, endPoint)
      // });
    },
    memberOption: function(echarts, index) {
      this.member_List[index].echartInit = echarts;
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
      this.member_List.forEach(member => {
        member.echartInit.setOption(changeZoom);
      });
    }
  }
};
</script>
