import {useDictStore, useUserStore} from "@/store";
import {getFixtureDictionary, getParameterConfig} from "@/api/common";
import {getHttpSourcingList} from "@/api/business";

export default (param={}) => {
  let dictStore=useDictStore()
  let {unit} = storeToRefs(dictStore)
  // fixture 获取工具
  let {fixture=false,offerId='',source=false}=param
  onMounted(()=>{
    //获取通用字典
    getParameterConfig().then((res) => {
      dictStore.updateDict(res.data)
    })
    //工治具字典
    if(fixture){
      getFixtureDictionary().then((res) => {
        dictStore.updateDict({fixtureDict:res.data})
      })
    }
    // Sourcing人名列表,根据报价单id查
    if(source){
      getHttpSourcingList(offerId).then((res) => {
        dictStore.updateDict({sourcingDict:res.data})
      })
    }
  })
}
