import remoteLoad from '@/utils/remoteLoad.js'
import { getDeviceOSType } from "@/utils/utils"

if (getDeviceOSType() != "pc") {
  await remoteLoad("https://unpkg.com/vconsole@latest/dist/vconsole.min.js")
  new window.VConsole()
}