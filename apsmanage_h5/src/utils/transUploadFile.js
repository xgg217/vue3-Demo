export default (file) => {
  let data = new FormData()
  data.append('file', file)
  return data
}
