<template >
<div>

</div>
</template>


<script>
// v-on:click="showChart(detail.talks)"
export default {
  props: ["talks"],
  mounted: function() {
    this.$nextTick(() => {
      setTimeout(this.sendMember, 2000);
    });
  },
  methods: {
    sendMember: function() {
      let member_talk_return = this.MemberTalkStatistics();
      let member_List = member_talk_return[0];
      let all_Month_Talk = member_talk_return[1];
      let list_length = member_List.length;

      if (list_length != 0) {
        // console.log("success send-member-List");
        this.$emit("send-member-List", member_List, all_Month_Talk);

        // return this.MemberTalkStatistics();
      }
    },

    MemberTalkStatistics: function() {
      // console.log("MemberTalkStatistics",this.talks);
      let talks = Array.from(this.talks);
      let calcul_member_return;
      let member_list;
      let all_Month_Talk = {
        chartData: {
          columns: ["month", "month_talks_count"],
          rows: this.getMonthInYears()
        }
      };
      member_list = this.generateMemberList(talks);
      // console.log(member_list);
      calcul_member_return = this.calculMemberAllTalk(
        all_Month_Talk,
        member_list,
        talks
      );
      // member_list = this.calculMemberAllTalk(member_list, talks);
      return calcul_member_return;
    },
    generateMemberList: function(talks) {
      let member_list = [];

      member_list = talks
        .map(talk => {
          return talk.speaker;
        })
        .filter((item, index, list) => {
          // console.log(list.keys());
          // if(list.indexOf(item.speaker) === index){
          //   console.log(list[index].includes(item.speaker),index);
          // }
          return list.indexOf(item) === index;
        })
        .map(member => {
          let month_talk_statistic = this.getMonthInYears();
          return {
            speaker: member,
            talk_count: 0,
            talks: [],
            chartData: {
              columns: ["month", "month_talks_count"],
              rows: month_talk_statistic
            },
            showChart: true
          };
        });
      return member_list;
    },
    calculMemberAllTalk: function(all_Month_Talk, member_list, talks) {
      // console.log("Blist",member_list);
      member_list = member_list.map(member => {
        talks.forEach(talk => {
          let hasPhotoKey = Object.keys(member).includes("photo");
          let speaker = member.speaker;
          let speakerMatch = talk.speaker === speaker;

          if (speakerMatch) {
            let talkDate = talk.speech_date.slice(0, 7);
            member.talks.push({
              class: talk.class,
              title: talk.title,
              message: talk.message,
              speech_date: talk.speech_date
            });
            member.talk_count++;
            member.chartData.rows = this.calculMonthTalks(
              member.chartData.rows,
              talkDate
            );
            if (!hasPhotoKey) {
              let hasPhoto = talk.speaker_img.includes("imgur");
              if (!hasPhoto) {
                talk.speaker_img = process.env.BASE_URL + "goodidea.png";
              }
              member.photo = talk.speaker_img;
            }

            all_Month_Talk.chartData.rows = this.calculMonthTalks(
              all_Month_Talk.chartData.rows,
              talkDate
            );
          }
        });
        return member;
      });
      // console.log("list",all_Month_Talk);
      return [member_list, all_Month_Talk];
      // return member_list;
    },
    calculMonthTalks: function(chartRows, talkDate) {
      return chartRows.map(row => {
        if (row.month === talkDate) {
          row.month_talks_count++;
          return row;
        }
        return row;
      });
    },
    getMonthInYears: function() {
      let date = new Date();
      let earliestYear = "2017";
      let nowMonth =
        date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1;
      let nowYear = date.getFullYear();
      let yearRange = nowYear - earliestYear;
      let monthRange = 6 + parseInt(nowMonth) + 1;
      let monthAndTalk = [];
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
      return monthAndTalk;
    }
  }
};
</script>
