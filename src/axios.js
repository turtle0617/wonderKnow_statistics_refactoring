import axios from "axios";

let url = "https://devche.com/api/speech/data";
const domain = "https://devche.com/api";

function GET(url) {
  return axios.get(domain + url).then(response => {
    if (response.status === 200) {
      return response.data;
    } else {
      return response.status;
    }
  });
}

function getSpeechRawData() {
  return axios.get(url);
}
//
// function initCharDataFormat() {
//   let month_talk_statistic = generateRangeYYYY_MM([2017, 5], Date.now());
//   return {
//     columns: ["month", "month_speechs_count"],
//     rows: month_talk_statistic
//   };
// }
//
// function getStatisticData() {
//   return axios
//     .get(url)
//     .then(generateSpeakersSpeechList)
//     .then(response => {
//       let all_speakers_speech_statistic = {
//         chartData: initCharDataFormat()
//       };
//       return calculSpeakersSpeechCount(response, all_speakers_speech_statistic);
//     });
// }
//
// function generateSpeakersSpeechList(response) {
//   let repeat_speakers = response.data.result.map(result => result.speaker);
//   let unique_speakers = [...new Set(repeat_speakers)].map(speaker => {
//     // let month_talk_statistic = generateEveryMonthToNow();
//     return {
//       name: speaker,
//       speechs_count: 0,
//       photo: "",
//       chartData: initCharDataFormat(),
//       showChart: true
//     };
//   });
//   return [response.data.result, unique_speakers];
// }
//
// function calculSpeakersSpeechCount(
//   responseResult_and_speakers,
//   all_speakers_speech_statistic
// ) {
//   let response_result = responseResult_and_speakers[0];
//   let unique_speakers_statistic = responseResult_and_speakers[1];
//   unique_speakers_statistic = unique_speakers_statistic.map(speaker => {
//     response_result.forEach(detail => {
//       let speech_date = detail.speech_date.slice(0, 7);
//       if (detail.speaker === speaker.name) {
//         speaker.speechs_count++;
//         speaker.photo = hasPhoto(detail.speaker_img);
//
//         speaker.chartData.rows = calculMonthTalks(
//           speaker.chartData.rows,
//           speech_date
//         );
//
//         all_speakers_speech_statistic.chartData.rows = calculMonthTalks(
//           all_speakers_speech_statistic.chartData.rows,
//           speech_date
//         );
//       }
//     });
//     return speaker;
//   });
//   return [unique_speakers_statistic, all_speakers_speech_statistic];
// }
//
// function calculMonthTalks(chart_rows, speech_date) {
//   return chart_rows.map(row => {
//     // month_speechs_count[1, 2, 3, 4, 5, 6, ]
//     // month_speechs_count[speech_date]++
//     if (row.month === speech_date) {
//       row.month_speechs_count++;
//       return row;
//     }
//     return row;
//   });
// }
//
// function hasPhoto(url) {
//   return url.includes("imgur") ? url : "goodidea.png"
// }
//
// function generateRangeYYYY_MM(start, end) {
//   let month_speechList = [];
//   for (let i = 0; i <= Math.abs(moment(start).diff(Data.now(), "months")); i++) {
//     month_speechList.push({
//       month: moment(start).add(i, 'M').format('YYYY-MM'),
//       month_speechs_count: 0
//     });
//   }
//   return month_speechList;
// }

export default { GET, getSpeechRawData };
