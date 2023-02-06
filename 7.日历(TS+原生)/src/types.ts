export interface IMoonth {
  lastArr: IYmd[]
  arr: IYmd[]
  nextArr: IYmd[]
}

export interface IYmd {
  y: number, // 年
  m: number, // 月
  d: number, // 日
  IMonthCn: string, // 农历 月
  IDayCn: string, // 农历 天
  astro: string, // 星座
  gzYear: string, // 天干地支纪年 年
  gzMonth: string, // 天干地支纪年 月
  gzDay: string, // 天干地支纪年 天
  Animal: string, // 生肖
  nWeek: number, // 星期
  ncWeek: string // 星期
}