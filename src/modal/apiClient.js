import axios from 'axios'

const defaults = {
  baseURL: 'https://ccip.sitcon.org/'
}

Object.assign(axios.defaults, defaults)

export const checkBoothToken = (boothToken) => {
  return axios.get('/event/puzzle/deliverer', {
    params: {
      token: boothToken
    }
  })
}

export const grantPuzzle = (boothToken, clientToken) => {
  var params = new URLSearchParams()
  params.append('receiver', clientToken)
  return axios.post('/event/puzzle/deliver', params ,{
    params: {
      token: boothToken
    }
  })
}

export const getPuzzle = (clientToken) => {
  return axios.get('/event/puzzle', {
    params: {
      token: clientToken
    }
  })
}

