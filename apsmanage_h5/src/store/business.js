import { defineStore } from 'pinia'

export const useBusinessStore = defineStore('business', {
  state: () => {
    return {
      id: null,
      state: null,
      cusId: null,
      cusName: null,
      businessData: null,
      businessProtocolData: null,
      protocolId: null
    }
  },
  actions: {
    updatePageInfo (value) {
      this.id = value.id
      this.state = value.state
      this.cusId = value.cusId
      this.cusName = value.cusName
    },
    updateData (value) {
      console.log("****", value)
      this.businessData = value
    },
    updateProtocolData (value) {
      this.businessProtocolData = value
    },
    updateProtocolId (value) {
      this.protocolId = value
    }
  },
  persist: {
    enabled: true
  }
})