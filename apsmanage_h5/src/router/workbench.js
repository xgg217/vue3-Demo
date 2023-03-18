export default [
  /* 常用流程 */
  {
    path: '/commonProcess',
    children: [
      /* 常用流程首页 */
      { path: 'proceHome', name: 'proceHome', meta: { title: '常用流程' }, component: () => import(/* webpackChunkName: "proceHome" */ '@/views/workbench/commonProcess/index.vue') },
      /* 流程列表 */
      { path: 'goingProcessList/:type', name: 'goingProcessList', meta: { title: '流程单' }, component: () => import(/* webpackChunkName: "goingProcessList" */ '@/views/workbench/commonProcess/pages/goingProcessList.vue') },
      /* 流程详情 */
      { path: 'processDetail/:id/:offerId', name: 'processDetail', meta: { title: '流程详情' }, component: () => import(/* webpackChunkName: "processDetail" */ '@/views/workbench/commonProcess/pages/processDetail.vue') },
    ]
  },
  /* 工作台首页-以及4个tab的丢这个路由 */
  {
    path: "/workbench",
    redirect: '/workbench',
    children: [
      { path: '/workbench', name: 'workbench',meta: { title: '工作台', keepAlive: true },component: () => import(/* webpackChunkName: "workbench" */ '@/views/workbench/index.vue') },
      { path: 'more', name: 'workbenchMore',meta: { title: '更多应用' },component: () => import(/* webpackChunkName: "workbench" */ '@/views/workbench/home/more.vue') },
      { path: 'setting', name: 'mySetting',meta: { title: '设置' },component: () => import(/* webpackChunkName: "my" */ '@/views/workbench/my/setting.vue') },
      { path: 'reset', name: 'myReset',meta: { title: '修改密码' },component: () => import(/* webpackChunkName: "my" */ '@/views/workbench/my/reset.vue') },
      { path: 'about', name: 'myAbout',meta: { title: '关于我们' },component: () => import(/* webpackChunkName: "my" */ '@/views/workbench/my/about.vue') },
      { path: 'msgDetail', name: 'msgDetail',meta: { title: '小6' },component: () => import(/* webpackChunkName: "xiao6" */ '@/views/workbench/message/msgDetail.vue') },
    ]
  },
  // 工作指标
  {
    path: "/workTarget",
    redirect: '/workTarget',
    children: [
      { path: '/workTarget', name: 'workTarget',meta: { title: '指标单' },component: () => import(/* webpackChunkName: "workTarget" */ '@/views/workbench/workTarget/index.vue') },
      { path: 'detail/:id', name: 'workTargetDetail',meta: { title: '指标详情' },component: () => import(/* webpackChunkName: "workTarget" */ '@/views/workbench/workTarget/detail.vue') },
      { path: 'allot/:id', name: 'workTargetAllot',meta: { title: '分配指标' },component: () => import(/* webpackChunkName: "workTarget" */ '@/views/workbench/workTarget/allot.vue') },
      { path: 'set/:id?', name: 'workTargetSet',meta: { title: '设定指标' },component: () => import(/* webpackChunkName: "workTarget" */ '@/views/workbench/workTarget/set.vue') },
    ]
  },
  // 经营报告
  { path: '/report', name: 'report', meta: { title: '我的报告' }, component: () => import(/* webpackChunkName: "report" */ '@/views/workbench/report/index.vue') },
  /* 工作任务 */
  { path: '/workTask', name: 'workTask', meta: { title: '任务单', }, component: () => import(/* webpackChunkName: "workTask" */ '@/views/workbench/workTask/index.vue') },
]
