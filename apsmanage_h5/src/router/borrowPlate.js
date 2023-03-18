// 立项
export default {
  path: "/borrowPlate",
  children: [
    // activeTab init 或者 record
    { path: ':activeTab?', name: 'borrowPlateInit', meta: { title: '借板'}, component: () => import(/* webpackChunkName: "borrowPlateInit" */ '@/views/borrowPlate/init.vue') },
    // 借板详情
    { path: 'preview/:id', name: 'borrowPlatePreview', meta: { title: '借板详情' }, component: () => import(/* webpackChunkName: "borrowPlatePreview" */ '@/views/borrowPlate/preview.vue') },
    // 驳回借板
    { path: 'back/:id', name: 'borrowPlateBack', meta: { title: '组长驳回借板' }, component: () => import(/* webpackChunkName: "borrowPlateBack" */ '@/views/borrowPlate/back.vue') },
    // 归还借板
    { path: 'return/:id', name: 'borrowPlateReturn', meta: { title: '归还借板' }, component: () => import(/* webpackChunkName: "borrowPlateReturn" */ '@/views/borrowPlate/return.vue') },
    // 组长确认
    { path: 'audit/:id', name: 'borrowPlateAudit', meta: { title: '组长确认' }, component: () => import(/* webpackChunkName: "borrowPlateAudit" */ '@/views/borrowPlate/audit.vue') },
    // 仓库确认还板页
    { path: 'storehouseConfirmation/:id', name: 'borrowPlateStorehouse', meta: { title: '仓库确认还板' }, component: () => import(/* webpackChunkName: "borrowPlateStorehouse" */ '@/views/borrowPlate/storehouseConfirmation.vue') },
    // 接受人确认
    { path: 'customerConfirmation/:id', name: 'borrowPlateCustomerConfirmation', meta: { title: '借板信息确认' }, component: () => import(/* webpackChunkName: "borrowPlateCustomerConfirmation" */ '@/views/borrowPlate/customerConfirmation.vue') },
    // 申请人填电话
    { path: 'applicantTel/:id', name: 'borrowPlateApplicantTel', meta: { title: '填写接收人电话' }, component: () => import(/* webpackChunkName: "borrowPlateApplicantTel" */ '@/views/borrowPlate/applicantTel.vue') },
  ]
}
