// 报价
export default {
  path: "/quote",
  children: [
    { path: 'customerRules/:id?', name: 'customerRules', meta: { title: '客户报价规则', keepAlive: true }, component: () => import(/* webpackChunkName: "customerRules" */ '@/views/quotation/customerRules/customerRules.vue') },
    {
      path: 'initiateQuotation', name: 'initiateQuotation', meta: { title: '发起报价' }, component: () => import(/* webpackChunkName: "initiateQuotation" */ '@/views/quotation/internalQuotation/initiateQuotation.vue')
    },
    {
      path: 'uploadCorpBOM/:offerId', name: 'uploadCorpBOM', meta: { title: '上传我司BOM' }, component: () => import(/* webpackChunkName: "uploadCorpBOM" */ '@/views/quotation/uploadCorpBOM/uploadCorpBOM.vue')
    },
    {
      path: 'checkCorpBOM/:offerId', name: 'checkCorpBOM', meta: { title: '待检查BOM' }, component: () => import(/* webpackChunkName: "checkCorpBOM" */ '@/views/quotation/uploadCorpBOM/checkCorpBOM.vue')
    },
    {
      path: 'projectPrice/:offerId', name: 'projectPrice', meta: { assemTitle: '-工程报价' }, component: () => import(/* webpackChunkName: "projectPrice" */ '@/views/quotation/projectPrice/projectPrice.vue')
    },
    {
      path: 'customPrice/:offerId', name: 'customPrice', meta: { assemTitle: '-关务报价' }, component: () => import(/* webpackChunkName: "customPrice" */ '@/views/quotation/customPrice/customPrice.vue')
    },
    {
      path: 'logisticPrice/:offerId', name: 'logisticPrice', meta: { assemTitle: '-物流报价' }, component: () => import(/* webpackChunkName: "customPrice" */ '@/views/quotation/logisticPrice/logisticPrice.vue')
    },
    {
      path: 'materialPrice/:offerId', name: 'materialPrice', meta: { assemTitle: '-物料报价' }, component: () => import(/* webpackChunkName: "materialPrice" */ '@/views/quotation/materialPrice/materialPrice.vue')
    },
    {
      path: 'sourcePrice/:offerId', name: 'sourcePrice', meta: { assemTitle: '-sourcing报价' }, component: () => import(/* webpackChunkName: "sourcePrice" */ '@/views/quotation/sourcePrice/sourcePrice.vue')
    },
    {
      path: 'adjustPrice/:offerId', name: 'adjustPrice', meta: { assemTitle: '-外发报价调整' }, component: () => import(/* webpackChunkName: "adjustPrice" */ '@/views/quotation/adjustPrice/adjustPrice.vue')
    },
    {
      path: 'superAudit/:offerId', name: 'superAudit', meta: { assemTitle: '-董事长审批' }, component: () => import(/* webpackChunkName: "superAudit" */ '@/views/quotation/superAudit/superAudit.vue')
    },
    {
      path: 'customerConfirm/:offerId', name: 'customerConfirm', meta: { assemTitle: '-待客户确认' }, component: () => import(/* webpackChunkName: "customerConfirm" */ '@/views/quotation/customerConfirm/customerConfirm.vue')
    },
    {
      path: 'preview/:offerId', name: 'preview', meta: { title: '' }, component: () => import(/* webpackChunkName: "preview" */ '@/views/quotation/preview/preview.vue')
    },
  ]
}
