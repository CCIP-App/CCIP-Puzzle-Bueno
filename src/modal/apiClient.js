import axios from 'axios'

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
  var params = new URLSearchParams()
  params.append('receiver', clientToken)
  return axios.post('/event/puzzle/deliver', params, {
    params: {
      token: boothToken
    }
  })
}

export var getPuzzle = (clientToken) => {
  return axios.get('/event/puzzle', {
    params: {
      token: clientToken
    }
  })
}

