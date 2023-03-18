import * as dd from 'dingtalk-jsapi'
import {isDev} from '@/constant/attendMeetingPerson'
import { fetchGet } from '@/api/axios'
import {useUserStore, useNavBarStore, useSystemStore} from '@/store'
import { getYMDHM } from '@/utils/timeFormat'
import {defaultPersonList} from "@/constant/attendMeetingPerson"
import to from 'await-to-js';
import {Notify, Toast} from 'vant';
import {openLoading, closeLoading, noticeTip} from "@/utils/toastTips"
import sesstionStorage from "@/utils/sessionStorage"
import router from '@/router'
import bus from "@/utils/bus";
import {getOrgDescribe, getPageInfoIds} from "@/api/login";
import useOrgTree from "@/hooks/useOrgTree";
import {getDeviceOSType} from "@/utils/utils";
import useClipboard from "vue-clipboard3";
const corpId='dinge49d4993d5cdc5f435c2f4657eb6378f' //企业id
const ddError={
    'open':'请在钉钉内打开',
    'login':'系统异常，登陆失败',
    'auth':'jsApi鉴权失败',
    'code':'获取code失败',
    'permission':'暂无权限',
}
let jsApiList= [
    'runtime.info',
    'biz.contact.complexPicker',
    'biz.ding.create',
    'biz.util.openLink',
    'biz.cspace.saveFile',
    'biz.cspace.preview',
    'biz.util.downloadFile',
    'biz.clipboardData.setData',
    'biz.util.chooseImage',
    'device.audio.startRecord',
    'device.audio.stopRecord',
    'device.audio.play'
]
let eventListenerFnList=[]
/* 隐藏导航栏 */
// const hideNavBar = () => {
//     if (dd.env.platform != "notInDingTalk") {
//         dd.biz.navigation.hideBar({
//             hidden:true
//         })
//     }
// }
// hideNavBar()
/* 设置钉钉右侧导航栏 */
// const setRightNav = () => {
//     dd.ready(function () {
//         dd.biz.navigation.setRight({
//             show: true,
//             control: true,
//             text: "筛选",
//             onSuccess: res => {
//                 console.log(res)
//             },
//             onFail: res => {
//                 alert(JSON.stringify(res))
//             }
//         })
//     })
// }
// setRightNav()
export function chooseMenber(callBack) {
    dd.ready(function () {
        dd.biz.contact.complexPicker({
            title: '选择',
            corpId: corpId,
            multiple: true,
            limitTips: '超出了',
            maxUsers: 1000,
            pickedUsers: [],
            pickedDepartments: [],
            disabledUsers: [],
            disabledDepartments: [],
            requiredUsers: [],
            requiredDepartments: [],
            appId: 0,
            permissionType: 'GLOBAL',
            responseUserOnly: true,
            startWithDepartmentId: 0,
            onSuccess: function (res) {
                console.log(res.users)
                // 调用成功时回调
                callBack(res.users)
            },
            onFail: function (err) {
                // 调用失败时回调
                console.log(JSON.stringify(err))
            }
        })
    })
}
export const isPc=dd.env.platform === 'pc'
export const isIos=dd.env.platform === 'ios'
export const isAndroid=dd.env.platform === 'android'
export const notDingTalk=dd.env.platform === 'notInDingTalk'

/* 获取小6userid */
const getXiao6Id = () => fetchGet('/customer/dingding_tools/getToolsMan')
const checkXiao6Id = () => {
    return new Promise(resolve => {
        getXiao6Id()
            .then(res => {
                if (res.code === 200) {
                    resolve(res.data)
                } else {
                    resolve(false)
                }
            })
            .catch(() => {
                resolve(false)
            })
    })
}

/* 创建日程会议
* title 标题
* alertDate 时间初始值
* start 会议开始时间 时间初始值* start个小时
* end 会议结束时间 时间初始值* end个小时
* attendMeetingPerson 参会人
* */
export async function createdConference(title,option={}) {
    let {alertDate=new Date().getTime(),start=1,end=1.5,attendMeetingPerson=[...defaultPersonList]}=option
    // if (notDingTalk) {
    //     noticeTip("该版本暂不支持创建钉钉会议，请在钉钉内打开该页面！")
    //     return
    // }

    let xiao6Id = await checkXiao6Id()
    if (xiao6Id) {
        attendMeetingPerson.push(xiao6Id)
    }
    console.log('userid',attendMeetingPerson)
    const taskId = sesstionStorage.get("taskId")
    if (taskId) {
        title = title + ` TID(${taskId})`
    }
    console.log(title)
    dd.ready(function () {
        dd.biz.ding.create({
            users: attendMeetingPerson,
            corpId,
            type: 1,
            alertType: 2,
            alertDate: { format: 'yyyy-MM-dd HH:mm', value: getYMDHM(alertDate) },
            attachment: { images: [] },
            text: title,
            bizType: 2,
            taskInfo: {title: title},
            confInfo: {
                bizSubType: 0,
                //开发环境默认间隔1分钟
                startTime:{"format":"yyyy-MM-dd HH:mm", "value": isDev?getYMDHM(alertDate +  60 * 1000) : getYMDHM(alertDate + start * 60 * 60 * 1000)},
                endTime:{"format":"yyyy-MM-dd HH:mm", "value": isDev? getYMDHM(alertDate +  2 * 60 * 1000) : getYMDHM(alertDate + end * 60 * 60 * 1000)}
            },  //会议结束时间 },
            onSuccess: function (res) {
                // 调用成功时回调
                console.log(res)
            },
            onFail: function (err) {
                // 调用失败时回调
                console.log(err)
            }
        })
    })
}
/* 打开会议新页面 */
export function openNewPage(id) {
    if (notDingTalk) {
        noticeTip("该版本暂不支持查看钉钉会议，请在钉钉内打开该页面！")
        return
    }
    dd.ready(function () {
        dd.biz.util.openLink({
            url: `dingtalk://dingtalkclient/action/open_mini_app?miniAppId=2018112162280005&ddMode=push&mainTask=true&keepAlive=false&newCalendar=1&page=pages%2Fdetail%2Findex%3FuniqueId%3D${id}&fallback_url=dingtalk%3A%2F%2Fdingtalkclient%2Fpage%2Fcalendar_detail%3Fid%3D0%26uniqueId%3D${id}`,
            onSuccess: function (res) {
                // 调用成功时回调
                console.log(res)
            },
            onFail: function (err) {
                // 调用失败时回调
                console.log(err)
            }
        })
    })
}

/* 保存在钉盘-app跳转到浏览器下载 */
export function openSaveFile(name, url,option={}) {
    let {isClose=false}=option
    let {isApp}=storeToRefs(useSystemStore())
    if(isApp.value){
        uniOpenBrowser(url)
    }else{
        //安卓和pc，用windos.open
        if (getDeviceOSType() === 'pc' || getDeviceOSType() === 'android') {
            window.open(url)
        } else {
            //钉钉环境-ios跳保存钉盘
            dd.ready(function () {
                dd.biz.cspace.saveFile({
                    corpId,
                    url: url,
                    name: name,
                    onSuccess: function (res) {
                        // 调用成功时回调
                        console.log(res)
                        dd.biz.cspace.preview({
                            corpId,
                            ...res.data[0],
                            onSuccess : function(res) {
                                if(isClose){
                                    setTimeout(close,2000)
                                }
                                console.log(res)
                            },
                            onFail : function(err) {
                                alert(err)
                            }
                        })
                    },
                    onFail: function (err) {
                        // 调用失败时回调
                        console.log(err)
                    }
                })
            })
        }
    }

}

/**
 * 钉钉分享
 * @param param
 */
export function openShare(param = {}) {
    let { url = '', type = 0, title = '分享链接', content = '', image = '', sunFn = () => { } } = param
    //app走系统分享
    if (notDingTalk){
        uni.postMessage({
          data: {
            ...param,
            type: 'share'
          }
        })
    }else{
        // 钉钉走钉钉分享
        dd.ready(function () {
            dd.biz.util.share({
                type,
                url,
                title,
                content: content || url,
                image,
                onSuccess: function (res) {
                    sunFn(res)
                },
                onFail: function (err) {
                    console.log(err)
                }
            })
        })
    }

}

/**
 * 设置右侧菜单
 * @param param
 */
export function setShareIcon(param = {}) {
    let { items = [], backgroundColor = "#ADD8E6", textColor = "#ADD8E611", sunFn = () => { } } = param
    if (isPc) return
    dd.ready(function () {
        dd.biz.navigation.setMenu({
            backgroundColor,
            textColor,
            items,
            onSuccess: function (res) {
                sunFn(res)
            },
            onFail: function (err) {
                console.log(err)
            }
        });
    })
}


/**
 * 设置标题
 * @param title
 */
export function setTitle(title = '业务全流程') {
    let navBarStore=useNavBarStore()
    if (isDd()) {
        dd.ready(function () {
            dd.biz.navigation.setTitle({ title });
        })
    }
    document.title = title
    //设置自定义导航栏标题
    navBarStore.updateNavBar({title})
}
/**
 * 判断是否在钉钉环境
 * @return {boolean}
 */
export function isDd() {
    return dd.env.platform !== "notInDingTalk"
}
/**
 * 设置左侧导航按钮文本
 * @param param
 */
export function setLeft(param = {}) {
    let {control = false, text = "", sucFn = () => {}} = param

    eventListenerFnList.push(sucFn)
    // 先卸载,多次添加会执行多次,具名函数才能卸载！！！
    for (let i = 0; i <eventListenerFnList.length ; i++) {
        dd.off('leftBtnClick', eventListenerFnList[i]);
        dd.off('backbutton', eventListenerFnList[i]);
    }
    //pc
    dd.on('leftBtnClick', sucFn);
    // 安卓
    dd.on('backbutton', sucFn);

    dd.ready(function () {
        dd.biz.navigation.setLeft({
            control,
            text,
            onSuccess:()=>{
                if (dd.env.platform !== 'pc') {
                    sucFn()
                }
            },
            onFail: function (err) {
                console.log('err', err)
            }
        });
    })
}
export function setLeftBack(e={}) {
    try {
        e.preventDefault() //安卓阻止默认返回键
    }catch (e) {

    }
    if (window.openMap) {
        window.openMap()
        return
    }
    if (router.options?.history?.state?.back) {
        router.back()
    } else {
        close()
    }
}
//设置全局返回，三端不统一，真的坑爹
export function setGlobalSetLeft() {
    setLeft({text: '返回', control: true, sucFn:setLeftBack})
}
/**
 * 关闭钉钉页面
 */
export function close() {
    if(notDingTalk){
        router.replace({name:'workbench'})
    }else{
        dd.ready(function () {
            if(isPc){
                dd.biz.navigation.quit()
            }else{
                dd.biz.navigation.close()
            }
        })
    }
}

export function getToken(code){
    return fetchGet(`upms/auth/fordingdingCode`, { code })
}

export function getConfig(code){
    return fetchGet(`upms/auth/getJsApi`, { url:window.location.origin+'/' })
}


export function ddCode(){
    return new Promise(async (resolve, reject) => {
        dd.runtime.permission.requestAuthCode({
            corpId,
            onSuccess: function (res) {
                resolve(res.code)
            },
            onFail: function (err) {
                reject(ddError.code)
            }
        })
    })
}

export function  clipboardData(msg){
    const { toClipboard } = useClipboard()
    return new Promise((resolve,reject)=>{
        if(isDd() && (isAndroid || isIos)){
            dd.biz.clipboardData.setData({
                text: msg, //要复制粘贴板的内容
                onSuccess : function(result) {
                    Toast("已复制到剪切板");
                    resolve()
                },
                onFail : function(err) {
                    console.log(err)
                    Notify(`复制失败`);
                    reject()
                }
            })
        }else{
            toClipboard(msg)
            Toast("已复制到剪切板");
            resolve()
        }
    })
}
export function setConfig() {
    getConfig().then((res)=>{
        let {agentId,corpId,timeStamp,nonceStr,signature,type}=res.data
        dd.config({
            agentId, // 必填，微应用ID
            corpId, // 必填，企业ID
            timeStamp, // 必填，生成签名的时间戳
            nonceStr, // 必填，自定义固定字符串
            signature, // 必填，签名
            type:0, // 选填。0表示微应用的jsapi,1表示服务窗的jsapi；不填默认为0。该参数从dingtalk.js的0.8.3版本开始支持
            jsApiList // 必填，需要使用的jsapi列表，注意：不要带dd。
        })
        dd.error(function (err) {
            Notify(ddError.auth);
        })
    })
}

export function auth() {
    const userStore = useUserStore()
    const orgTree=useOrgTree()
    openLoading()
    return new Promise(async (resolve, reject) => {
        // setGlobalSetLeft() //设置全局返回
        //获取钉钉code
        let [ err, data ] = await to(ddCode());
        err && reject(err);
        //获取用户信息
        let [ userErr, userData ] = await to(getToken(data));
        //后面的操作需要token
        await userStore.asyncUpdateUserInfo({token:userData.data.token})
        //获取用户权限
        let [ permissionErr, permissionData ] = await to(getPageInfoIds({userId:userData.data?.saasId,userSource: userData.data?.userSource}));
        //获取组织架构
        let [ orgErr, orgData ] = await to(getOrgDescribe({userId:userData.data?.saasId, userSource:userData.data?.userSource}));
        //获取组织树
        orgTree.getOrgData()
        if(err || userErr || permissionErr || orgErr){
            userStore.updateUserInfo({token:''})
            reject(ddError.login)
        }else {
            userStore.updateUserInfo({
                ...userData.data,
                pagePermissions:permissionData.data,
                orgDescribe:orgData.data,
                orgName:orgData.data?.[0]?.orgName,
                loginTime: getYMDHM(new Date())
            })
        }
        setConfig()
        resolve(data)
    }).finally(closeLoading)
}

/**
 * 在当前环境，打开外部页面
 * uniapp中打开另外一个webview
 * 其他环境替换本页面url
 * @param option
 */
export function openExternalPage(option={}) {
    if(!option.url) return
    let {isApp}=storeToRefs(useSystemStore())
    if(isApp.value){
        uni.postMessage({
            data: {
                ...option,
                type: 'toPage'
            }
        })
    }else{
        location.href=option.url
    }
}

export function restart(option={}) {
    let {isApp}=storeToRefs(useSystemStore())
    if(isApp.value){
        uni.postMessage({
            data: {
                type: 'restart'
            }
        })
    }else{
        location.reload()
        router.go(0)
    }
}

export function uniOpenBrowser(url){
    uni.postMessage({
        data: {
            url:url,
            type: 'openBrowser'
        }
    })
}

/**
 * 扫码功能
 * @returns {Promise<unknown>}
 */

export const scan = () => {
    return new Promise((resolve,reject)=>{
        if (notDingTalk || isPc){
            Notify('该设备不支持扫码功能，请使用手机钉钉App')
            reject()
        }
        dd.biz.util.scan({
            type: 'all' , // type 为 all、qrCode、barCode，默认是all。
            onSuccess: function(data) {
                resolve(data.text)
            },
            onFail : function(err) {
                reject(err)
            }
        })
    })
}
