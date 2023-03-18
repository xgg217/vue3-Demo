import {httpProjectInitiationReview} from "@/api/business";
import {closeLoading, openLoading} from "@/utils/toastTips";
import {useUserStore} from "@/store";
import '@/utils/getTaskId'
// {1:"待签核", 2:"已退回", 3:"待评审", 4:"评审中", 5:"待录入评审结果", 6:"已通过"}
export default () => {
  // useDict()
  const route = useRoute()
  const router = useRouter()
  const {id} = route.params
  const {nickName,isBusiness} = storeToRefs(useUserStore())

  let previewDetail = reactive({
    projectInitiation:{},
    projectSignatureList:[],
    meetingLogInfo:[],
    projectMeetingRecord:{},
    projectInitiationDetail:{},
    meetingRecordFile:[]
  })
  let {
    projectInitiation,
    projectSignatureList,
    meetingLogInfo,
    projectMeetingRecord,
    projectInitiationDetail,
    meetingRecordFile}=toRefs(previewDetail)

  const projectInitiationReview = () => {
    openLoading()
    httpProjectInitiationReview(id).then((res) => {
      // 把projectInitiation里面的数据合并到projectInitiationDetail
      res.data.projectInitiationDetail={
        ...res.data.projectInitiationDetail,
        ...res.data.projectInitiation
      }
      Object.assign(previewDetail,res.data)
    }).finally(closeLoading)
  }
  const createdBy=computed(()=>{
    return projectInitiation.value?.createdBy
  })

  const receiverName=computed(()=>{
    return (projectInitiation.value?.receiverId || []).join('、')
  })
  onMounted(() => {
    projectInitiationReview()
  })
  return {
    route,
    router,
    nickName,
    isBusiness,
    createdBy,
    previewDetail,
    projectInitiation,
    projectSignatureList,
    meetingLogInfo,
    projectMeetingRecord,
    projectInitiationDetail,
    meetingRecordFile,
    receiverName,
    projectId:Number(id),
    projectInitiationReview
  }
}
