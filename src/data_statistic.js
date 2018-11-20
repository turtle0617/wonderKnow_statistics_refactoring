import moment from "moment";

function initCharDataFormat() {
  const month_talk_statistic = generateRangeYYYY_MM([2017, 3], Date.now());
  return {
    columns: ["month", "month_speechs_count"],
    rows: month_talk_statistic
  };
}

function generateSpeakersSpeechList(response) {
  const repeat_speakers = response.result.map(result => result.speaker);
  const unique_speakers = [...new Set(repeat_speakers)].map(speaker => {
    return {
      name: speaker,
      speechs_count: 0,
      photo: "",
      chartData: initCharDataFormat(),
      showChart: true
    };
  });
  const all_speakers_speech_statistic = {
    chartData: initCharDataFormat()
  };
  return [response.result, unique_speakers, all_speakers_speech_statistic];
}

function calculSpeakersSpeechCount(responseResult_and_speakers) {
  const response_result = responseResult_and_speakers[0];
  let unique_speakers_statistic = responseResult_and_speakers[1];
  let all_speakers_speech_statistic = responseResult_and_speakers[2];

  unique_speakers_statistic = unique_speakers_statistic.map(speaker => {
    response_result.forEach(detail => {
      const speakerMatch = detail.speaker === speaker.name;
      const speech_date = detail.speech_date.slice(0, 7);
      const monthSpeechIndex = speaker.chartData.rows.findIndex(
        row => row.month === speech_date
      );

      if (speakerMatch && !!~monthSpeechIndex) {
        const count = "month_speechs_count";
        speaker.speechs_count++;
        speaker.photo = hasPhoto(detail.speaker_img);

        speaker.chartData.rows[monthSpeechIndex][count]++;
        all_speakers_speech_statistic.chartData.rows[monthSpeechIndex][count]++;
      }
    });
    return speaker;
  });
  return [unique_speakers_statistic, all_speakers_speech_statistic];
}

function hasPhoto(url) {
  return url.includes("imgur") ? url : process.env.BASE_URL+"goodidea.png";
}

function generateRangeYYYY_MM(start, end) {
  const month_speechList = [];
  for (let i = 0; i <= Math.abs(moment(start).diff(end, "months")); i++) {
    month_speechList.push({
      month: moment(start)
        .add(i, "M")
        .format("YYYY-MM"),
      month_speechs_count: 0
    });
  }
  return month_speechList;
}

export { generateSpeakersSpeechList, calculSpeakersSpeechCount };
