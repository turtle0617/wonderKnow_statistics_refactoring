import axios from 'axios'

// let url = "https://devche.com/api/speech/data";
const domain = 'https://devche.com/api'

function GET (url) {
  return axios.get(domain + url).then(response => {
    if (response.status === 200) {
      return response.data
    } else {
      return response.status
    }
  })
}

// function getSpeechRawData() {
//   return axios.get(url);
// }

export default { GET }
