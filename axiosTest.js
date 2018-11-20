const axios = require("axios");
const moment = require("moment");

let url = "https://devche.com/api/speech/data";

getResult();

function getSpeechRawData() {
  return axios.get(url).then(response => {
    return Error(response.status);
  });
}

function getResult() {
  let all_speakers_speech_statistic = {
    chartData: {
      columns: ["month", "month_talks_count"],
      rows: generateEveryMonthToNow()
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
  let repeat_speakers = response.result.map(result => result.speaker);
  // console.log(repeat_speakers.length);
  let unique_speakers = [...new Set(repeat_speakers)].map(speaker => {
    let month_talk_statistic = generateEveryMonthToNow();
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
  return [response.result, unique_speakers];
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
      let monthSpeechIndex = speaker.chartData.rows.findIndex(
        row => row.month === speech_date
      );

      if (speakerMatch && !!~monthSpeechIndex) {
        let count = "month_speechs_count";
        speaker.speechs_count++;
        speaker.photo = hasPhoto(detail.speaker_img);
        console.log(
          all_speakers_speech_statistic.chartData.rows[monthSpeechIndex][count]
        );
        speaker.chartData.rows[monthSpeechIndex][count]++;
        all_speakers_speech_statistic.chartData.rows[monthSpeechIndex][count]++;
      }
    });
    return speaker;
  });
  console.log(all_speakers_speech_statistic.chartData.rows);
  return [unique_speakers_statistic, all_speakers_speech_statistic];
  // console.log(all_speakers_speech_statistic);
}

function findMonthSpeechIndex(chart_rows, speech_date) {
  return chart_rows.findIndex(row => {
    // return row.month_speechs_count[speech_date]++
    // console.log(row.month[speech_date]);
    // if(row.month === speech_date){
    //   console.log(row.month ,speech_date);
    // }
    return row.month === speech_date;
  });
}
// function calculMonthTalks(chart_rows, speech_date) {
//   return chart_rows.map(row => {
//     // return row.month_speechs_count[speech_date]++
//     // console.log(row.month[speech_date]);
//     if (row.month === speech_date) {
//       row.month_speechs_count++;
//       return row;
//     }
//     return row;
//   });
// }

function hasPhoto(url) {
  let hasPhoto = url.includes("imgur");
  if (!hasPhoto) {
    return "goodidea.png";
  }
  return url;
}

function generateEveryMonthToNow() {
  const startDate = [2017, 3];
  let month_range = Math.abs(moment(startDate).diff(Date.now(), "months"));
  let month_speechList = [];
  for (let i = 0; i <= month_range; i++) {
    month_speechList.push({
      month: moment(startDate)
        .add(i, "M")
        .format("YYYY-MM"),
      month_speechs_count: 0
    });
  }
  return month_speechList;
}
