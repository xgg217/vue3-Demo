// 立项
export default {
  path: "/setProject",
  children: [
    { path: 'init', name: 'setProject', meta: { title: '发起立项申请', keepAlive: true }, component: () => import(/* webpackChunkName: "setProject" */ '@/views/setProject/init.vue') },
    { path: 'back/:id', name: 'backProject', meta: { title: '已退回-发起立项申请' }, component: () => import(/* webpackChunkName: "backProject" */ '@/views/setProject/back.vue') },
    { path: 'audit/:id', name: 'auditProject', meta: { assemTitle: '-发起的立项申请' }, component: () => import(/* webpackChunkName: "auditProject" */ '@/views/setProject/audit.vue') },
    { path: 'meeting/:id', name: 'meetProject', meta: { assemTitle: '-发起的立项申请' }, component: () => import(/* webpackChunkName: "meetProject" */ '@/views/setProject/meeting.vue') },
    { path: 'saveMeet/:id', name: 'saveMeetingProject', meta: { assemTitle: '-发起的立项申请' }, component: () => import(/* webpackChunkName: "saveMeetingProject" */ '@/views/setProject/saveMeeting.vue') },
    { path: 'preview/:id', name: 'previewProject', meta: { assemTitle: '-发起的立项申请' }, component: () => import(/* webpackChunkName: "previewProject" */ '@/views/setProject/preview.vue') },
  ]
}
