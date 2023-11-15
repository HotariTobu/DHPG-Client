export default (obj: object, encode = true) => {
  const entries = Object.entries(obj)
  const pairs = entries.filter(([_, v]) => {
    return typeof v !== 'undefined'
  }).map(([k, v]) => {
    if (encode) {
      v = encodeURIComponent(v)
    }

    return `${k}=${v}`
  })

  return '?' + pairs.join('&')
}
