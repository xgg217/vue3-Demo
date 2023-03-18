class Bus {
  constructor() {
    this.list = {}
  }
  emit(name, ...args) {
    if (!this.list[name]) return
    let eventName = this.list[name]
    eventName.forEach(ev => {
      ev.apply(this, args)
    })
  }
  on(name, callback) {
    let fn = this.list[name] || []
    fn.push(callback)
    this.list[name] = fn
  }
  off(name) {
    delete this.list[name]
  }
}

export default new Bus()