const axios = require("axios");
const moment = require("moment");

let url = "https://devche.com/api/speech/data";

getResult();

function getResult() {
  let all_speakers_speech_statistic = {
    chartData: {
      columns: ["month", "month_talks_count"],
      rows: generateMonthToNow()
    }
  };
  axios
    .get(url)
    .then(generateSpeakersSpeechList)
    .then(response => {
      return calculSpeakersSpeechCount(response, all_speakers_speech_statistic);
    });
}

function generateSpeakersSpeechList(response) {
  let repeat_speakers = response.data.result.map(result => result.speaker);
  let unique_speakers = [...new Set(repeat_speakers)].map(speaker => {
    let month_talk_statistic = generateMonthToNow();
    return {
      name: speaker,
      speechs_count: 0,
      photo: "",
      chartData: {
        columns: ["month", "month_speechs_count"],
        rows: month_talk_statistic
      },
      showChart: true
    };
  });
  return [response.data.result, unique_speakers];
}

function calculSpeakersSpeechCount(
  responseResult_and_speakers,
  all_speakers_speech_statistic
) {
  let response_result = responseResult_and_speakers[0];
  let unique_speakers_statistic = responseResult_and_speakers[1];
  unique_speakers_statistic = unique_speakers_statistic.map(speaker => {
    response_result.forEach(detail => {
      let speakerMatch = detail.speaker === speaker.name;
      let speech_date = detail.speech_date.slice(0, 7);
      if (speakerMatch) {
        speaker.speechs_count++;
        speaker.photo = hasPhoto(detail.speaker_img);
        speaker.chartData.rows = calculMonthTalks(
          speaker.chartData.rows,
          speech_date
        );
        all_speakers_speech_statistic.chartData.rows = calculMonthTalks(
          all_speakers_speech_statistic.chartData.rows,
          speech_date
        );
      }
    });
    return speaker;
  });
  // console.log(all_speakers_speech_statistic.chartData.rows);
  return [unique_speakers_statistic, all_speakers_speech_statistic];
  // console.log(all_speakers_speech_statistic);
}

function calculMonthTalks(chart_rows, speech_date) {
  return chart_rows.map(row => {
    if (row.month === speech_date) {
      row.month_speechs_count++;
      return row;
    }
    return row;
  });
}

function hasPhoto(url) {
  let hasPhoto = url.includes("imgur");
  if (!hasPhoto) {
    return "goodidea.png";
  }
  return url;
}

function generateMonthToNow() {
  let startTime = moment([2017, 5]);
  let now = moment().format();
  let month_range = Math.abs(startTime.diff(now, "months"));
  let month_speechList = [];
  for (let i = 0; i < month_range; i++) {
    let year = 5 + i > 11 ? 2018 : 2017;
    let month = 5 + i > 11 ? 5 + i - 11 : 5 + i;
    month_speechList.push({
      month: moment([year, month]).format("YYYY-MM"),
      month_speechs_count: 0
    });
  }
  return month_speechList;
}
