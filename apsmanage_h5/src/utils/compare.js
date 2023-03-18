/**
 * 数据历史数据对比，给对象字段中加入status参数，1没变，2新增，3修改，4删除
 * 要求的数据顺序，排在数组前面的是最近修改的，最后一条是最历史的数组 ["最新的","第二新的","……","最旧的"]
 * 7.0版本用的历史记录对比方法不是很好，之后新的用这个方法替换，缺点是每个字段都要写插槽
 * @param data
 * @param verifyKey 校验字段的key，注意：在同一个数组内，key对应的value必须是唯一的
 * @param subKey 外层记录了退回信息，里层才是table数据
 * @returns {*}
 * @example
 * let data = [
 *   [
 *     {
 *       name: 'taosi',
 *       sex: 1,
 *       desc: '我是备注'
 *     },
 *     {
 *       name: 'siqi',
 *       sex: 3,
 *       desc: '我是备注'
 *     },
 *     {
 *       name: 'qi',
 *       sex: 3,
 *       desc: '备注'
 *     }
 *   ],
 *   [
 *     {
 *       name: 'siqi',
 *       sex: 2,
 *       desc: '我是备注1'
 *     },
 *     {
 *       name: 'taoqi',
 *       sex: 3,
 *       desc: '备注'
 *     }
 *   ],
 * ]
 * console.log(compare(data))
 * [
 *     [
 *         {
 *             "name": {
 *                 "value": "taosi",
 *                 "status": 2
 *             },
 *             "sex": {
 *                 "value": 1,
 *                 "status": 2
 *             },
 *             "desc": {
 *                 "value": "我是备注",
 *                 "status": 2
 *             }
 *         },
 *         {
 *             "name": {
 *                 "value": "siqi",
 *                 "status": 1
 *             },
 *             "sex": {
 *                 "value": 3,
 *                 "status": 3
 *             },
 *             "desc": {
 *                 "value": "我是备注",
 *                 "status": 3
 *             }
 *         },
 *         {
 *             "name": {
 *                 "value": "qi",
 *                 "status": 2
 *             },
 *             "sex": {
 *                 "value": 3,
 *                 "status": 2
 *             },
 *             "desc": {
 *                 "value": "备注",
 *                 "status": 2
 *             }
 *         },
 *         {
 *             "name": {
 *                 "value": "taoqi",
 *                 "status": 4
 *             },
 *             "sex": {
 *                 "value": 3,
 *                 "status": 4
 *             },
 *             "desc": {
 *                 "value": "备注",
 *                 "status": 4
 *             }
 *         }
 *     ],
 *     [
 *         {
 *             "name": {
 *                 "value": "siqi",
 *                 "status": 1
 *             },
 *             "sex": {
 *                 "value": 2,
 *                 "status": 1
 *             },
 *             "desc": {
 *                 "value": "我是备注1",
 *                 "status": 1
 *             }
 *         },
 *         {
 *             "name": {
 *                 "value": "taoqi",
 *                 "status": 1
 *             },
 *             "sex": {
 *                 "value": 3,
 *                 "status": 1
 *             },
 *             "desc": {
 *                 "value": "备注",
 *                 "status": 1
 *             }
 *         }
 *     ]
 * ]
 */

export function compare(data,verifyKey='name',subKey='customsOffer') {
  data = JSON.parse(JSON.stringify(data))
  if(!data.length) return []
  let fieldKeys = Object.keys(data?.[0]?.[subKey]?.[0])

  data.forEach((item) => {
    item[subKey].forEach((subItem) => {
      fieldKeys.forEach(key => subItem[key] = {value: subItem[key], status: 1});
    })
  })
  for (let i = 0; i < data.length - 1; i++) {
    let newVal = data[i][subKey]
    let oldVal = data[i + 1][subKey]
    newVal.forEach((newValItem) => {
      //通过name做匹配
      //newVal的每一项去oldVal的里面找，没有找到表明是新增
      if (!oldVal.some(oldValItem => oldValItem[verifyKey].value === newValItem[verifyKey].value)) {
        fieldKeys.forEach(key => newValItem[key].status = 2)
      } else {
        //找到了，逐字段对比，判断是否有修改
        //找到oldVal和newVal里面，name一样的那条数据
        let oldValItem=oldVal.filter(oldValItem=>oldValItem[verifyKey].value===newValItem[verifyKey].value)[0]
        fieldKeys.forEach((key) => {
          if (newValItem[key].value !==oldValItem[key].value) newValItem[key].status = 3;
        })
      }
    })
    oldVal.forEach((oldValItem) => {
      //oldVal的每一项去newVal的里面找，没有找到表明是删除，需要push到新的数据的里面，加上删除标记
      if (!newVal.some(newValItem => newValItem[verifyKey].value === oldValItem[verifyKey].value)) {
        let copyOldValItem = JSON.parse(JSON.stringify(oldValItem))
        fieldKeys.forEach(key => copyOldValItem[key].status = 4)
        newVal.push(copyOldValItem)
      }
    })
  }

  return data
}

export function compareColor(status){
  // 1没变，2新增，3修改，4删除
  if(status===2 || status===3){
    return {color:'#FF3A35'}
  }else if(status===4){
    return {color:'#A2A2A2',textDecoration:'line-through'}
  }else{
    return {color:'#4A4A4A'}
  }
}
