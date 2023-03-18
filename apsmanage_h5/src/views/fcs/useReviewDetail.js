import {getHttpCompanyList, getHttpFcsSummaryInfo, getHttpWeekStr} from "@/api/business";
import {closeLoading, openLoading} from "@/utils/toastTips";
import {useDictStore, useUserStore} from "@/store";
import '@/utils/getTaskId'
import {getParameterConfig} from "@/api/common";
import { Dialog } from 'vant';
// fcs状态 1 待整理BOM（工程报价状态） 2 待各岗位准备（物料、关务、物流） 3 已准备完成
export default (option={}) => {
  let {isGetWeek=true,isGetDetail=true,isGetDict=true,isCompany=false}=option
  const route = useRoute()
  const router = useRouter()
  let dictStore = useDictStore()
  const {factory} = storeToRefs(dictStore)
  const {fcsTaskId} = route.params
  const {nickName} = storeToRefs(useUserStore())
  const statusDict={1:'进行中', 2:'准备完成', 3:'终止'}
  let previewDetail = reactive({})
  let weekData=ref([]) //fcs周别数

  //公共头部详情
  const getFcsSummaryInfo = () => {
    openLoading()
    getHttpFcsSummaryInfo({fcsTaskId}).then((res) => {
      Object.assign(previewDetail,{...res.data.fcsNeedsInfo,...res.data.fcsBaseInfo,fcsTaskStatus:res.data.fcsTaskStatus})
    }).finally(closeLoading)
  }
 //获取周别字典
  const getWeekStr = () => {
    getHttpWeekStr().then((res) => {
      weekData.value=res.data
    })
  }
  //获取公共字典
  const getDict = () => {
    getParameterConfig().then((res) => {
      dictStore.updateDict(res.data)
    }).catch((err)=>{
    })
  }
  // 跳转客户/报价详情
  const toCustomerDetailInfo = (businessType,businessId) => {
    if (businessType==1) {
      router.push({name: "customerDemand", params: {id:businessId}})
    } else {
      router.push({name: "preview", params: {offerId: businessId}})
    }
  }
  const getCompanyList = () => {
    //129487 --国内
    //129486 --中港
    getHttpCompanyList({groupId:129487}).then((res)=>{
      dictStore.updateDict({z_logistics_company:res.data})
    })
    getHttpCompanyList({groupId:129486}).then((res)=>{
      dictStore.updateDict({g_logistics_company:res.data})
    })
  }
  const fcsBaseId = computed(()=>{
    return previewDetail?.id
  })
  watch(()=>previewDetail.fcsTaskStatus,(val)=>{
    if(val==3 && !route.path.includes('historyPreview')){
      Dialog.alert({
        message: '流程已终止',
        confirmButtonColor:'#0096FF'
      }).then(() => {
        // on close
      });
    }
  })
  //终止状态
  const stop =computed(()=>{
    return previewDetail.fcsTaskStatus==3
  })
  //物料、关务、工程、物流 完成状态
  const isMaterialDetail = computed(()=>{
    // 0是已完成 1是未完成
    if (stop.value){
      return true
    }
    return  previewDetail?.fcsStatus!=2 ? true : previewDetail?.materialControlFlag==0
  })

  const isCustomsDetail = computed(()=>{
    if (stop.value){
      return true
    }
    return  previewDetail?.fcsStatus!=2 ? true : previewDetail?.customsFlag==0
  })

  const isLogisticsDetail = computed(()=>{
    if (stop.value){
      return true
    }
    return  previewDetail?.fcsStatus!=2 ? true : previewDetail?.logisticsFlag==0
  })

  const isProjectDetail = computed(()=>{
    return previewDetail.fcsTaskStatus==3 ? true : previewDetail?.fcsStatus!=1
  })

  onMounted(() => {
    if(fcsTaskId && isGetDetail){
      getFcsSummaryInfo()
    }
    if(isGetWeek){
      getWeekStr()
    }
    if(isGetDict){
      getDict()
    }
    if(isCompany){
      getCompanyList()
    }
  })
  return {
    route,
    router,
    nickName,
    previewDetail,
    fcsTaskId:Number(fcsTaskId),
    weekData,
    fcsBaseId,
    factory,
    dictStore,
    isProjectDetail,
    isMaterialDetail,
    isCustomsDetail,
    isLogisticsDetail,
    statusDict,
    toCustomerDetailInfo,
    getFcsSummaryInfo
  }
}
