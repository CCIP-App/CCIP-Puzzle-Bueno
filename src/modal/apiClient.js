import axios from 'axios'
import qs from 'qs'
import config from '../../config/project.json'
const defaults = {
  baseURL: config.serverUrl
}

Object.assign(axios.defaults, defaults)

export var getBoothList = () => {
  return axios.get('/event/puzzle/deliverers').then((res) => res.data)
}

export var getSponsorList = () => {
  return axios.get(config.sponsorUrl)
    .then((res) => res.data.sponsors.map((el) => ({
      level: el.level,
      logourl: 'https://api2018.coscup.org/' + el.image,
      name: {
        'en': el.name.trim()
      }
    })))
}

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
