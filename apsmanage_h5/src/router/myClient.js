//我的客户
export default {
  path: '/',
  redirect: '/myClient',
  children: [
    { path: 'myClient', name: 'myClient', meta: { title: '我的客户' }, component: () => import(/* webpackChunkName: "myClient" */ '@/views/myClient/myClient.vue') },
    { path: 'addDemand/', name: 'addDemand', meta: { title: '业务需求填写' }, component: () => import(/* webpackChunkName: "addDemand" */ '@/views/myClient/addDemand/addDemand.vue') },
    { path: 'customerDemand/:id', name: 'customerDemand', meta: { title: '客户信息预览' }, component: () => import(/* webpackChunkName: "addDemand" */ '@/views/myClient/addDemand/addDemand.vue') },
    { path: 'customerInfoPreview/:id', name: 'customerInfoPreview', meta: { title: '客户信息预览' }, component: () => import(/* webpackChunkName: "customerInfoPreview" */ '@/views/myClient/addDemand/customerInfoPreview.vue') },
    { path: 'meetingInput/:id', name: 'meetingInput', meta: { title: '会议结果录入', status: 4 }, component: () => import(/* webpackChunkName: "meetingInput" */ '@/views/myClient/meetingInput/index.vue') },
    { path: 'leaderCheck/:id', name: 'leaderCheck', meta: { title: '董事长审核', status: 5 }, component: () => import(/* webpackChunkName: "leaderCheck" */ '@/views/myClient/leaderCheck/index.vue') },
    { path: 'uploadProtocol/:id', name: 'uploadProtocol', meta: { title: '上传初版协议', status: 8 }, component: () => import(/* webpackChunkName: "uploadProtocol" */ '@/views/myClient/uploadProtocol/index.vue') },
    { path: 'entryQuestions/:id', name: 'entryQuestions', meta: { title: '协议问题录入', status: 9 }, component: () => import(/* webpackChunkName: "entryQuestions" */ '@/views/myClient/entryQuestions/index.vue') },
    { path: 'answerQuestions/:id', name: 'answerQuestions', meta: { title: '协议问题回复', status: 9 }, component: () => import(/* webpackChunkName: "answerQuestions" */ '@/views/myClient/entryQuestions/index.vue') },
    { path: 'legalAppraise/:id', name: 'legalAppraise', meta: { title: '法务评估', status: 9 }, component: () => import(/* webpackChunkName: "legalAppraise" */ '@/views/myClient/entryQuestions/index.vue') },
    { path: 'offlineBridge/:id', name: 'offlineBridge', meta: { title: '线下沟通', status: 12 }, component: () => import(/* webpackChunkName: "offlineBridge" */ '@/views/myClient/offlineBridge/index.vue') },
    { path: 'uploadSignPro/:id', name: 'uploadSignPro', meta: { title: '上传回签协议', status: 13 }, component: () => import(/* webpackChunkName: "uploadSignPro" */ '@/views/myClient/uploadSignPro/index.vue') }
  ]
}
