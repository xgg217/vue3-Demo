import {ref} from 'vue'
import {openShare, setShareIcon} from "@/utils/ddApi";
import {getScheduleList, getWorkOrderList} from "@/api/prodFow";
import {useRouter } from "vue-router"
import {openLoading, closeLoading} from "@/utils/toastTips"

export default (props) => {
  const router = useRouter()
  let showSearch = ref(false)
  let activeIndex = ref(0)
  let listData = ref({}) //列表数据
  let customerNo = ref('')

  if (router.currentRoute.value.name == "workOrder") {
    activeIndex.value = 2
  }

  console.log(activeIndex)

//点击显示搜索列表
  const clickSearchDom = (value) => {
    showSearch.value = value
  }


//点击选中的搜索项，触发tab归零和重新请求
  const getSearchResult = (value) => {
    activeIndex.value = 0
    customerNo.value = value
    getList()
  }

  // 点击tab
  const handleTab = (index) => {
    activeIndex.value = index
    getList({activeIndex:index})
  }


  const getList = (param = {}) => {
    openLoading()
    let {activeIndex} = param
    switch (props.name) {
      case 'schedule':
        getScheduleList({orderNo: customerNo.value}).then((res) => {
          listData.value = res.data
        }).finally(closeLoading)
        break
      case 'workOrder':
        activeIndex = 2
        getWorkOrderList({orderNo: customerNo.value, status: activeIndex ? activeIndex : ''}).then((res) => {
          listData.value = res.data
        }).finally(closeLoading)
        break
      default :
        break
    }
  }

  const toDetail = (row) => {
    let name = ''
    let query = {}
    switch (props.name) {
      case 'schedule':
        name = 'scheduleDetail'
        query = {orderNo: row.orderNo}
        break
      case 'workOrder':
        name = 'workOrderDetail'
        query = {orderNo: row.orderNo}
        break
      default :
        break
    }
    router.push({name, query})
  }

  const ddSetShareIcon = (url=window.location.origin) => {
    setShareIcon({
      items:[{"id": "1", "text": "share", "url": 'https://static-1253419794.file.myqcloud.com/test_img/clipboard_20221118_024809.png'}],
      sunFn:()=>{
        openShare({url})
      }
    })
  }
  onMounted(()=>{
    openLoading()
  })
  return {
    showSearch,
    activeIndex,
    listData,
    customerNo,
    clickSearchDom,
    getSearchResult,
    getList,
    toDetail,
    handleTab,
    ddSetShareIcon
  }
}
