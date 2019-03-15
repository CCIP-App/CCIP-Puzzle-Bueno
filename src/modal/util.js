import crypto from 'crypto'

export default {
  parseQueryParams (query) {
    return query.split('?').pop().split('&')
      .map((query) => {
        var keyValue = query.split('=')
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
  sha1Gen (raw) {
    var hashGen = crypto.createHash('sha1')
    hashGen.update(raw)
    return hashGen.digest('hex')
  },

  StringFormat () {
    let formatString = arguments[0]
    let args = Array.prototype.slice.call(arguments).slice(1)
    return args.reduce(
      (formatString, arg, i) => formatString.replace('${' + (i + 1) + '}', arg), formatString)
  }
}
