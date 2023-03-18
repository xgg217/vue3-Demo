export default {
  systemSybol: '-jstar',
  set (key, value) {
    localStorage.setItem(key + this.systemSybol, JSON.stringify(value))
  },
  get (key) {
    const val = localStorage.getItem(key + this.systemSybol)
    if (val !== undefined) {
      return JSON.parse(val)
    }
    return null
  },
  remove (key) {
    localStorage.removeItem(key + this.systemSybol)
  },
  clear () {
    const storageLength = localStorage.length
    let deleteIndex = 0
    for (let i = 0; i < storageLength; i++) {
      if (localStorage.key(deleteIndex) && localStorage.key(deleteIndex).indexOf(this.systemSybol) !== -1) {
        // this.remove(localStorage.key(deleteIndex))
        localStorage.removeItem(localStorage.key(deleteIndex))
      } else {
        deleteIndex++
      }
    }
  }
}