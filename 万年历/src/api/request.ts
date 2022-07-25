import request from "@/libs/http";
import type { AxiosPromise } from "axios";

// interface IHttpResponseDay {
//   error_code: number; // 错误码
//   reason: string; // 错误原因
//   result: string; // 返回实体内容
// }

/**
 * 根据传入日期返回当天详细信息
 * @param data 指定日期,格式为YYYY-MM-DD,如月份和日期小于10,则取个位,如:2012-1-1
 * @returns
 */
export function apiPostDay(date: string) {
  return request.get("/api/day", {
    params: {
      date,
    },
  });
}

/**
 *  根据传入的月份返回近期的假期列表（起始年份为2013年）
 * @param data 指定月份,格式为YYYY-MM,如月份和日期小于10,则取个位,如:2012-1
 * @returns
 */
export function apiPostMonth(data: string) {
  return request.get("/api/month", {
    params: {
      "year-month": data,
    },
  });
}

/**
 * 根据传入年份返回当年假期列表
 * @param data 	指定年份,格式为YYYY,如:2015
 * @returns
 */
export function apiPostYear(data: string) {
  return request.get("/api/year", {
    params: {
      year: data,
    },
  });
}
