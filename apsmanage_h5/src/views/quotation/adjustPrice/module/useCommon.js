export default (tableDetail = []) => {
  const currency = inject('currency')
  const isDetail = inject('isDetail')
  const offerId = inject('offerId')
  return {
    currency,
    isDetail,
    offerId
  }
}
