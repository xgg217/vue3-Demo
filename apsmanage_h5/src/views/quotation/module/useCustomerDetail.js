import {getHttpOfferOrderPreview} from "@/api/business";
import {useUserStore} from "@/store";
import {closeLoading, openLoading} from "@/utils/toastTips";
import '@/utils/getTaskId'
export default () => {
  const route = useRoute()
  const {nickName} = storeToRefs(useUserStore())
  let {offerId, type = ''} = route.params
  offerId = Number(offerId)
  provide('offerId', offerId)
  let customerDetail = ref({})
  const getOfferOrderPreview = () => {
    openLoading()
    getHttpOfferOrderPreview(offerId).then((res) => {
      customerDetail.value = res.data
    }).finally(closeLoading)
  }
  //客供不显示退回
  const isGuest = computed(()=>{
    return customerDetail.value?.offerDetail?.purchaseModel==1
  })
  onMounted(() => {
    //获取报价详情
    getOfferOrderPreview()
  })
  return {
    offerId,
    customerDetail,
    nickName,
    type,
    isGuest,
    getOfferOrderPreview
  }
}
