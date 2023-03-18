import {defineStore} from 'pinia';

export const useDictStore = defineStore('dict', {
  state: () => {
    return {
      bill_date:[],
      currency:[],
      //报关项目
      customs_project:[],
      employee_num:[],
      factory:[],
      //物流项目
      logistics_project:[],
      reconcile:[],
      settlement_date:[],
      // 单位
      unit:[],
      customerType:[
        {name: '已建档客户', value: 1},
        {name: '未建档客户，仅报价', value: 2}
      ],
      bomAdjust:[
        {name: '有误，需调整', value: 0},
        {name: '无误，无需调整', value: 1}
      ],
      startupStatus:[
        {name: '有', value: 1},
        {name: '无', value: 2}
      ],
      returnReason:[
        {name:'报价太高',value:1},
        {name:'报价太底',value:2},
        {name:'其它',value:3},
      ],
      offerType:[
        {"name":"工程报价","value":1},
        {"name":"关务报价","value":2},
        {"name":"物流报价","value":3},
        {"name":"物料报价","value":4},
        {"name":"加工费报价","value":5}
      ],
      //工治具字典 tree
      fixtureDict:[],
      //Sourcing人名列表
      sourcingDict:[],
      distributeDict:[
        {name: '平均分配(系统自动计算)', value: 1},
        {name: '手动分配', value: 2}
      ],
      distributeDict2:[
        {name: '平均分摊到组织成员', value: 1},
        {name: '指定人员分配', value: 2}
      ],
      indexTypeDict:[
        {name: '财务指标', value: 1},
        {name: '经营指标', value: 2},
        {name: '生产指标', value: 3},
        {name: '管理指标', value: 4},
        {name: '人事指标', value: 5},
        {name: '品质指标', value: 6},
        {name: '质量指标', value: 7},
        {name: '其它指标', value: 0}
      ],
      indexRecipientTypeDict:[
        {name: '指派到组织', value: 1},
        {name: '指派到人', value: 2}
      ],
      dimensionDict:[
        {name: '数值', value: 1},
        {name: '百分比', value: 2}
      ],
      //指标单位
      targetUnitDict:[
        {name: 'RMB', value: "RMB"},
        {name: 'H(时间)', value: "H"},
        {name: 'PCS(生产类)', value: "PCB"},
      ],

      timeDict:[
        {name: '固定周期', value: 1},
        {name: '指定日期', value: 2}
      ],
      fixedTimeDict:[
        //固定周期，D天；W周；M月；Q季度；Y年
        {name: '天(每天23:59检查指标是否完成)', value: "D"},
        {name: '周(每周日23:59检查指标是否完成)', value: "W"},
        {name: '月(每月最后一天检查指标是否完成)', value: "M"},
        {name: '季度(每季度最后一天检查指标是否完成)', value:"Q"},
        {name: '年(每年最后一天检查指标是否完成)', value: "Y"}
      ],
      calculateDict:[
        {name: '=', value: '='},
        {name: '≥', value: '≥'},
        {name: '>', value: '>'},
        {name: '≤', value: '≤'},
        {name: '<', value: '<'}
      ],
      //全部-组织用户树
      orgTree:[],
      flatOrgTree:[],
      setProjectType:[
        {name: 'By报价单立项', value: 2},
        {name: 'By业务需求立项', value: 1}
      ],
      dateRangeDict:[
        {name: '默认（当前周+10）', value: 1},
        {name: '今年', value: 2},
        {name: '去年', value: 3},
      ],
      z_logistics_company:[], //国内物流公司
      g_logistics_company:[], //中港物流公司
      vehicle_type:[], //车型
      coopTypeList:['保税加工', '国内加工', '纯垫资代采']
    }
  },
  actions: {
    updateDict(value) {
      Object.keys(value || {}).forEach((key) => {
        this[key] = value[key]
      })
    },
    //key：字典名，value：paramValue，返回paramName
    getDictValue(key,value) {
      let arr=this[key].filter(({paramValue})=>{
        return value==paramValue
      })
      return arr[0]?.paramName ?? ''
    },
    getDictValue2(key,values) {
      let arr=this[key].filter(({value})=>{
        return values==value
      })
      return arr[0]?.name ?? ''
    },
    getFixtureValue(key,values){
      if(!key || !values || !values.length) return ''
      let data=[]
      this[key].forEach(({id,fixtureName,childList})=>{
        if(values[0]===id){
          data.push(fixtureName)
          values[1] && childList.forEach(item=>{
            if(values[1]===item.id){
              data.push(item.fixtureName)
            }
          })
        }
      })
      return data.join('-')
    }
  },
  getters:{
    unit2: (state) => state.unit.filter(({paramKey})=>paramKey==='3' || paramKey==='4'),
    adjustOfferType: (state) => state.offerType.filter(({value})=>value!==5 )
  },
  persist: {
    enabled: true,
    strategies:[{
      storage: localStorage,
    }]
  }
})




