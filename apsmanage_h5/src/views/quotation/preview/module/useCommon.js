import {roundFun} from "@/utils/utils";

export default () => {
  const currency = inject('currency')
  const offerId = inject('offerId')
  const total = (tableDetail,key) => {
    let total=tableDetail.reduce((cur,pre)=>{
      return pre[key].status!==4? cur+pre[key].value : cur
    },0)
    return roundFun(total,4)
  }
  return {
    currency,
    offerId,
    total
  }
}
