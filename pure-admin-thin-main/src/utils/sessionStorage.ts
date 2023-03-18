export default {
  systemSybol: '',
  set(key: string, value: any) {
    sessionStorage.setItem(key + this.systemSybol, JSON.stringify(value))
  },
  get(key) {
    const val = sessionStorage.getItem(key + this.systemSybol)
    if (val !== undefined) {
      return JSON.parse(val)
    }
    return null
  },
  remove(key) {
    sessionStorage.removeItem(key + this.systemSybol)
  },
  clear() {
    const storageLength = sessionStorage.length
    let deleteIndex = 0
    for (let i = 0; i < storageLength; i++) {
      if (sessionStorage.key(deleteIndex) && sessionStorage.key(deleteIndex).indexOf(this.systemSybol) !== -1) {
        sessionStorage.removeItem(sessionStorage.key(deleteIndex))
      } else {
        deleteIndex++
      }
    }
  }
}