import crypto from 'crypto'

export default {
  parseQueryParams(query) {
    return query.split('?').pop().split('&')
      .map((query) => {
        let keyValue = query.split('=')
        return {
          key: keyValue.shift(),
          value: keyValue.pop()
        }
      })
      .reduce((collection, param) => {
        collection[param.key] = param.value
        return collection
      }, {})
  },
  sha1Gen(raw) {
    let hashGen = crypto.createHash('sha1')
    hashGen.update(raw)
    return hashGen.digest('hex')
  }
}
