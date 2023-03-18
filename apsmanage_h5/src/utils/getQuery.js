export default (url) => {
  let baseQuery = ''
  if (url) {
    if (url.indexOf('?') < 0) return {}
    baseQuery = decodeURIComponent(url.split('?')[1])
  } else {
    if (window.location.href.indexOf('?') < 0) return {}
    baseQuery = decodeURIComponent(window.location.href.split('?')[1])
  }
  
  const initQuery = baseQuery.split('&')
  let query = {}
  initQuery.forEach(item => {
    const temp = item.split('=')
    query[temp[0]] = temp[1]
  })
  return query
}