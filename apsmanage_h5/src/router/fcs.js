// fcs
export default {
  path: "/fcs",
  children: [
    { path: 'record', name: 'recordFcs', meta: { title: 'FCS记录'}, component: () => import(/* webpackChunkName: "recordFcs" */ '@/views/fcs/record.vue') },
    { path: 'init/:businessId?', name: 'initFcs', meta: { title: '发起FCS产前准备',keepAlive:true }, component: () => import(/* webpackChunkName: "initFcs" */ '@/views/fcs/init.vue') },
    { path: 'project/:fcsTaskId', name: 'projectFcs', meta: { title: 'FCS处理-工程任务' }, component: () => import(/* webpackChunkName: "projectFcs" */ '@/views/fcs/project.vue') },
    { path: 'material/:fcsTaskId', name: 'materialFcs', meta: { title: 'FCS处理-物控任务' }, component: () => import(/* webpackChunkName: "materialFcs" */ '@/views/fcs/material.vue') },
    { path: 'logistic/:fcsTaskId', name: 'logisticFcs', meta: { title: 'FCS处理-物流任务' }, component: () => import(/* webpackChunkName: "logisticFcs" */ '@/views/fcs/logistic.vue') },
    { path: 'custom/:fcsTaskId', name: 'customFcs', meta: { title: 'FCS处理-关务任务' }, component: () => import(/* webpackChunkName: "customFcs" */ '@/views/fcs/custom.vue') },
    { path: 'preview/:fcsTaskId', name: 'previewFcs', meta: { title: 'FCS任务商务预览' }, component: () => import(/* webpackChunkName: "previewFcs" */ '@/views/fcs/preview.vue') },
    { path: 'history/:fcsBaseId', name: 'historyFcs', meta: { title: 'FCS任务历史记录' }, component: () => import(/* webpackChunkName: "historyFcs" */ '@/views/fcs/history.vue') },
    { path: 'historyPreview/:fcsTaskId', name: 'historyFcsPreview', meta: { title: 'FCS任务详情' }, component: () => import(/* webpackChunkName: "historyFcsPreview" */ '@/views/fcs/historyPreview.vue') },
  ]
}
