import axios from 'axios'
import qs from 'qs'
const defaults = {
  baseURL: 'https://ccip.sitcon.org/'
}

Object.assign(axios.defaults, defaults)

export var checkBoothToken = (boothToken) => {
  return axios.get('/event/puzzle/deliverer', {
    params: {
      token: boothToken
    }
  })
}

export var grantPuzzle = (boothToken, clientToken) => {
  return axios.post('/event/puzzle/deliver?token=' + boothToken, qs.stringify({receiver: clientToken}))
}

export var getPuzzle = (pubToken) => {
  return axios.get('/event/puzzle', {
    params: {
      token: pubToken
    }
  })
}

export var getNickname = (token) => {
  return axios.get('landing?token=' + token).then((res) => res.data)
}
