import {useSystemStore} from "@/store";
import {isDd} from "@/utils/ddApi";
import {getDeviceOSType} from "@/utils/utils";


export default (param={}) => {
  let systemStore=useSystemStore()
  onMounted(()=>{
    document.addEventListener('UniAppJSBridgeReady', function() {
      uni.getEnv(function(res) {
        let env='h5'
        if(res.plus){
          env='app'
        }else if(isDd()){
          env='dd'
        }
        systemStore.updateSystemStore({env})
      })
    })
    systemStore.updateSystemStore({browserEnv:getDeviceOSType()})
  })
}
