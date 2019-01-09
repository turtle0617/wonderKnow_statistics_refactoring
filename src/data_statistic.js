import moment from 'moment'
const startDate = [2017, 3]
const endDate = moment()
const month_period = Math.abs(moment([2017, 3]).diff(endDate, 'months')) + 1

function initCharDataFormat () {
  const month_talk_statistic = generateRangeYYYY_MM()
  return {
    columns: ['month', 'month_speeches_count'],
    rows: month_talk_statistic
  }
}

function initMonthlyOfSpeechCount () {
  return new Array(month_period).fill(0);
}

function generateSpeakersSpeechList (response) {
  const repeat_speakers = response.result.map(result => result.speaker)
  const unique_speakers = [...new Set(repeat_speakers)].map(speaker => {
    return {
      name: speaker,
      speeches_count: 0,
      monthly_of_speech_count: initMonthlyOfSpeechCount().slice(),
      photo: '',
      chartData: initCharDataFormat(),
      speech_list: [],
      showChart: false
    }
  })
  const all_speakers_speech_statistic = {
    speeches_count: 0,
    monthly_of_speech_count: initMonthlyOfSpeechCount().slice(),
    chartData: initCharDataFormat()
  }
  return [response.result, unique_speakers, all_speakers_speech_statistic]
}

function calculMonthPeriodSpeechCount (speaker, startIndex, endIndex) {
  return speaker.monthly_of_speech_count.reduce(function (
    accumulator,
    currentValue,
    index
  ) {
    if (index < startIndex || index > endIndex) return accumulator
    return (accumulator += currentValue)
  },
  0)
}

function calculSpeakersSpeechCount (responseResult_and_speakers) {
  const response_result = responseResult_and_speakers[0]
  let unique_speakers_statistic = responseResult_and_speakers[1]
  let all_speakers_speech_statistic = responseResult_and_speakers[2]

  unique_speakers_statistic = unique_speakers_statistic.map(speaker => {
    response_result.forEach(detail => {
      const speakerMatch = detail.speaker === speaker.name
      const speech_date = detail.speech_date.slice(0, 7)
      const monthSpeechIndex = speaker.chartData.rows.findIndex(
        row => row.month === speech_date
      )

      if (speakerMatch && !!~monthSpeechIndex) {
        const count = 'month_speeches_count'
        speaker.speeches_count += 1;
        speaker.photo = hasPhoto(detail.speaker_img);
        speaker.monthly_of_speech_count[monthSpeechIndex] += 1;
        speaker.chartData.rows[monthSpeechIndex][count] += 1;
        speaker.speech_list.push({
          date: detail.speech_date,
          camp: detail.class,
          title: detail.title
        })
        all_speakers_speech_statistic.speeches_count += 1;
        all_speakers_speech_statistic.monthly_of_speech_count[monthSpeechIndex] += 1;
        all_speakers_speech_statistic.chartData.rows[monthSpeechIndex][count] += 1;
      }
    });
    speaker.speech_list = sortBySpeechDate(speaker.speech_list);
    return speaker
  })

  return [unique_speakers_statistic, all_speakers_speech_statistic]
}

function sortBySpeechCount (speaker_list) {
  const speaker_sort_list = speaker_list.slice()
  return speaker_sort_list.sort((a, b) => {
    return b.speeches_count - a.speeches_count
  })
}

function sortBySpeechDate (speech_list) {
  const speech_sort_list = speech_list.slice()
  return speech_sort_list.sort((a, b) => {
    if (a.date > b.date) {
      return 1
    } else if (a.date === b.date) {
      return 0
    }
    return -1
  })
}

function hasPhoto (url) {
  return url.includes('imgur') ? url : process.env.BASE_URL + 'goodidea.png'
}

function generateRangeYYYY_MM () {
  const month_speechList = []
  for (let i = 0; i < month_period; i++) {
    month_speechList.push({
      month: moment(startDate)
        .add(i, 'M')
        .format('YYYY-MM'),
      month_speeches_count: 0
    })
  }
  return month_speechList
}

export {
  generateSpeakersSpeechList,
  calculSpeakersSpeechCount,
  calculMonthPeriodSpeechCount,
  sortBySpeechCount
}
