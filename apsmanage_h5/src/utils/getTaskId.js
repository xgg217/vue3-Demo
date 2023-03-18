import getQuery from "@/utils/getQuery"
import sesstionStorage from "@/utils/sessionStorage"

sesstionStorage.clear()
const taskId = getQuery()
if (taskId.processInstanceId) {
  console.log("设置taskId")
  sesstionStorage.set("taskId", taskId.processInstanceId)
}
