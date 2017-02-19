import axios from 'axios'

const defaults = {
  baseURL: 'https://ccip.sitcon.org/'
}

Object.assign(axios.defaults, defaults)

export const grantPuzzle = (boothToken, clientToken) => {
  return axios.post('/event/puzzle/grant', {
    attendee: clientToken
  }, {
    headers: {'Auth': boothToken}
  })
}

export const getPuzzle = (clientToken) => {
  return axios.get('/event/puzzle', {
    params: {
      ID: 12345
    }
  })
}

