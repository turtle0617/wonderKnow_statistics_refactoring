<template>
  <div class="">
    {{sendMember()}}
  </div>

</template>
<script>
// v-on:click="showChart(detail.talks)"
import "v-charts/lib/style.css";
export default {
  props: ["talks"],
  // mounted: function() {
  //   this.MemberTalkStatistics;
  //   this.sendMember();
  // },
  computed: {
    isData: function() {
      return this.talks.length !== 0;
    }
  },
  methods: {
    sendMember: function() {
      let member_List = this.MemberTalkStatistics();
      let list_length = Object.keys(member_List).length;
      // console.count("sendMember", list_length);
      if (list_length != 0) {
        // console.log("success send-member-List");
        // this.$emit("send-member-List", member_List);

        return member_List;
      }
    },
    MemberTalkStatistics: function() {
      // console.log(this.talks);
      let talks = this.talks;
      let member_list = [];
      // let month_talk_statistic = this.getMonthInYears();
      // member_List = talks.
      talks.forEach(talk => {
        // this.memberDetailStatistics(talk, member_list, month_talk_statistic);
        this.memberDetailStatistics(talk, member_list);
      });
      for (let member in member_list) {
        this.monthTalksStatistic(member_list[member]);
      }
      // console.log(member_list);
      return member_list;
    },
    // memberDetailStatistics: function(talk, member_list, month_talk_statistic) {
    memberDetailStatistics: function(talk, member_list) {
      let member = talk.speaker;
      let hasMember = Object.keys(member_list).includes(member);
      let hasPhoto = talk.speaker_img.includes("imgur");
      let month_talk_statistic = this.getMonthInYears();
      if (!hasMember) {
        if (!hasPhoto) {
          talk.speaker_img = "/goodidea.png";
        }
        member_list[member] = {
          talk_count: 0,
          chartData: {
            columns: ["month", "month_talks_count"],
            rows: month_talk_statistic
          },
          speaker: member,
          photo: talk.speaker_img,
          talks: [],
          showChart: false
        };
        // return;
      }
      member_list[member].talk_count += 1;
      member_list[member].talks.push(talk);
    },
    monthTalksStatistic: function(member) {
      member.talks.forEach(talk => {
        let talkDate = talk.speech_date.slice(0, 7);
        member.chartData.rows.forEach(talkCount => {
          if (talkDate.includes(talkCount.month)) {
            talkCount.month_talks_count++;
          }
        });
      });
    },
    getMonthInYears: function() {
      let date = new Date();
      let earliestYear = "2017";
      let nowMonth =
        date.getMonth() < 10 ? "0" + date.getMonth() : date.getMonth();
      let nowYear = date.getFullYear();
      let yearRange = nowYear - earliestYear;
      let monthRange = 6 + parseInt(nowMonth) + 1;
      let monthAndTalk = [];
      // console.log("getMonthInYears monthAndTalk 剛宣告完",monthAndTalk);
      let yearForloop = 2017;
      let monthForloop = 6;
      if (yearRange > 1) {
        monthRange += 12;
      }
      for (let i = 0; i < monthRange; i++) {
        if (monthForloop < 10) {
          monthForloop = "0" + monthForloop;
        }

        if (monthForloop > 12) {
          yearForloop++;
          monthForloop -= 12;
          monthAndTalk.push({
            month: yearForloop + "-0" + monthForloop,
            month_talks_count: 0
          });
          monthForloop++;
        } else {
          monthAndTalk.push({
            month: yearForloop + "-" + monthForloop,
            month_talks_count: 0
          });
          monthForloop++;
        }
      }
      // console.log("getMonthInYears return",monthAndTalk);
      return monthAndTalk;
    }
  }
};
</script>
