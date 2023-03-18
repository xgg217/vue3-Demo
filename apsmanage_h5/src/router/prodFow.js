// pp1-pp20
export default {
  path: '/prodFow',
  children: [
    //pp2
    { path: 'schedule', name: 'schedule', meta: { title: '生产排程信息' }, component: () => import(/* webpackChunkName: "schedule" */ '@/views/prodFow/schedule/index.vue') },
    { path: 'schedule/detail', name: 'scheduleDetail', meta: { title: '生产排程概况' }, component: () => import(/* webpackChunkName: "schedule" */ '@/views/prodFow/schedule/detail.vue') },
    // pp1
    { path: 'workOrder', name: 'workOrder', meta: { title: '订单编号信息' }, component: () => import(/* webpackChunkName: "workOrder" */ '@/views/prodFow/workOrder/index.vue') },
    { path: 'workOrder/detail', name: 'workOrderDetail', meta: { title: '订单编号信息' }, component: () => import(/* webpackChunkName: "workOrder" */ '@/views/prodFow/workOrder/detail.vue') },
    // pp3
    { path: 'equipInsp', name: 'equipInsp', meta: { title: '设备点检任务' }, component: () => import(/* webpackChunkName: "equipInsp" */ '@/views/prodFow/equipInsp/index.vue') },
    //Pp4.5.0 备料通知推送type:1  备料超时推送上级type:2  领料通知:3
    { path: 'stock/:type', name: 'stock', meta: { title: '备料任务' }, component: () => import(/* webpackChunkName: "stock" */ '@/views/prodFow/stock/index.vue'), beforeEnter: (to, from) => {
        /* 从详情页返回使用上次的参数 */
        if (from.name === "stockDetail") {
          window.useSessionParams = true
        }
        return true
      } },
    { path: 'stock/:type/detail/:id', name: 'stockDetail', meta: { title: '备料任务' }, component: () => import(/* webpackChunkName: "stock" */ '@/views/prodFow/stock/detail.vue') },
    //Pp4.5.1 推送至工程负责人判断 type:1  工治具异常处理结果反馈type:2
    { path: 'toolException/:type', name: 'toolException', meta: { title: '工治具异常处理' }, component: () => import(/* webpackChunkName: "toolException" */ '@/views/prodFow/toolException/index.vue') },
    { path: 'toolException/:type/detail', name: 'toolExceptionDetail', meta: { title: '工治具异常处理' }, component: () => import(/* webpackChunkName: "toolException" */ '@/views/prodFow/toolException/detail.vue') },
    { path: 'toolException/:type/singleDetail', name: 'toolExceptionSingleDetail', meta: { title: '工治具异常处理' }, component: () => import(/* webpackChunkName: "toolException" */ '@/views/prodFow/toolException/singleDetail.vue') },
    /* pp4.5.2 设备异常处理任务 type: 1-设备异常推送通知 2-设备异常处理超时通知 */
    { path: 'exceptionFlow/:type', name: 'exceptionFlow', meta: { title: '设备异常处理任务'}, component: () => import(/* webpackChunkName: "exceptionFlow" */ '@/views/prodFow/exceptionFlow/index.vue') },
    { path: 'exceptionFlow/:type/detail/:id', name: 'exceptionFlowDetail', meta: { title: '设备异常处理任务' }, component: () => import(/* webpackChunkName: "exceptionFlow" */ '@/views/prodFow/exceptionFlow/detail.vue') },
    //Pp4.5.3 检测任务推送  type: 1-检测任务推送 type:2 任务超时通知上级  type:3 检测NG现场人员推送  type:4 NG处理超时通知上级 type:4
    { path: 'firstDetect/:type', name: 'firstDetect', meta: { title: '检测任务' }, component: () => import(/* webpackChunkName: "firstDetect" */ '@/views/prodFow/firstDetect/index.vue') },
    { path: 'firstDetect/:type/detail/:id', name: 'firstDetectDetail', meta: { title: '检测任务' }, component: () => import(/* webpackChunkName: "firstDetect" */ '@/views/prodFow/firstDetect/detail.vue') },
    /* pp4.5.4 抽检不合格任务处理 type: 1-抽检不合格处理（向当线人员推送） 2-抽检处理方式确认（上级决议推送） 3-抽检不合格处理（抽检超时推送） */
    { path: 'spotCheck/:type', name: 'spotCheck', meta: { title: '抽检不合格处理'}, component: () => import(/* webpackChunkName: "spotCheck" */ '@/views/prodFow/spotCheck/index.vue') },
    { path: 'spotCheck/:type/detail/:id', name: 'spotCheckDetail', meta: { title: '抽检不合格处理任务' }, component: () => import(/* webpackChunkName: "spotCheckDetail" */ '@/views/prodFow/spotCheck/detail.vue') },
  ]
}
