import { Toast } from 'vant';
import { Notify } from "@/plugins/pxNotify"
const openLoading = () => {
  Toast.loading({
    duration: 0,
    forbidClick: true,
  })
}
const closeLoading = () => {
  Toast.clear()
}

const successTip = (msg) => {
  // #34C606
  Notify.success(msg)
  // Toast.success({
  //   duration: 5000,
  //   // forbidClick: true,
  //   closeOnClickOverlay: true,
  //   overlay: true,
  //   message: msg
  // })
}

const noticeTip = (msg) => {
  Notify.info(msg)
  // Toast.success({
  //   duration: 5000,
  //   // forbidClick: true,
  //   closeOnClickOverlay: true,
  //   overlay: true,
  //   message: msg
  // })
}

const failTip = (msg) => {
  Notify.error(msg)
  // Toast.fail({
  //   duration: 5000,
  //   // forbidClick: true,
  //   closeOnClickOverlay: true,
  //   overlay: true,
  //   message: msg
  // })
}

export {openLoading, closeLoading, successTip, failTip, noticeTip}