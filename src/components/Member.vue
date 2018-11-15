<template >
  <ul>
    <li v-for="( speaker, index) in speaker_list" v-bind:key="index">
      <div class="speaker" v-on:click="checkChart(speaker)">
        <img v-bind:src="speaker.photo" alt=""> {{ speaker.name }}
      </div>
      <h3>總演講次數: {{speaker.speechs_count}}</h3>
      <div v-if="speaker.showChart">
        <ve-line :data="speaker.chartData" :settings="chartSettings" :after-set-option="(echarts)=>memberOption(echarts,index)"></ve-line>
      </div>
    </li>
  </ul>
</template>


<script>
export default {
  props: ["speaker_list"],
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
    }
  }
};
</script>
