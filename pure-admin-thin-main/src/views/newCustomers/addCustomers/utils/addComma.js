export default (number) => {
  // 转为字符串，并按照.拆分
  const arr = (number + '').split('.');
  // 整数部分再拆分
  const int = arr[0].split('');
  // 小数部分
  const fraction = arr[1] || '';
  // 返回的变量
  let r = '';
  int.reverse().forEach(function (v, i) {
    // 非第一位并且是位值是3的倍数，添加“,”
    if (i !== 0 && i % 3 === 0) {
      r = v + ',' + r;
    } else {
      // 正常添加字符(这是好写法)
      r = v + r;
    }
  });
  // 整数部分和小数部分拼接
  return r + (!!fraction ? '.' + fraction : '');
}