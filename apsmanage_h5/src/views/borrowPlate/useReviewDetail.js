import {closeLoading, openLoading} from "@/utils/toastTips";
import {useUserStore} from "@/store";
import '@/utils/getTaskId'
import {getBorrowDetail} from "@/api/borrowPlate";
// 状态:reject-拒绝借板,wait_receiver_confirm-待接收人确认（厂外人员）,borrowing-借板中,apply_returned-申请人确认归
export default (option = {}) => {
  let {isDetail = true} = option
  const route = useRoute()
  const router = useRouter()
  const {id} = route.params
  const {nickName, isIPQC} = storeToRefs(useUserStore())
  let previewDetail = reactive({})

  const projectInitiationReview = () => {
    openLoading()
    getBorrowDetail(id).then((res) => {
      Object.assign(previewDetail, res.data)
    }).finally(closeLoading)
  }

  onMounted(() => {
    if (isDetail) {
      projectInitiationReview()
    }
  })

  const status = {
    reject: '拒绝借板',
    wait_receiver_confirm: '待接收人确认',
    borrowing: '借板中',
    apply_returned: '还板中，待确认',
    confirm_returned: '已归还',
    wait_receiver: '待填写接收人信息'
  }

  return {
    route,
    router,
    nickName,
    isIPQC,
    previewDetail,
    id: String(id),
    projectInitiationReview,
    status
  }
}
