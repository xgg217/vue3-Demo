export default (search) => {
  if (!search) return {}
  const list = search.replace("?", '').split("&")
  const Obj = {}
  list.forEach(ele => {
    const temp = ele.split("=")
    Obj[temp[0]] = temp[1]
  })
  return Obj
}