import './css/rl.css'
import dayjs from 'dayjs'

import { getMonthDays } from './tools'
import type { IYmd } from './types'

// 工具函数
const tooltObj = (() => {
  const minYear = 2000;
  const maxYear = 2050;

  // 初始化年份数据
  const initYear = () => {
    const arr = [];
    for (let i = minYear; i <= maxYear; i++) {
      arr.push(i);
    }

    return arr.map(item => {
      return `<option value="${item}">${item}年</option>`
    }).join('')
  }

  /**
   * 计算年份
   * @param year 年份
   */
  const setYear = (year:number) => {
    return year - minYear
  }

  return {
    initYear,
    setYear
  }
})();

// 初始化日历
((tooltObj) => {
  const tbodyDom = document.querySelector('tbody') as HTMLTableSectionElement;
  const yearDom = document.querySelector('.sw .year') as HTMLSelectElement;
  const monthDom = document.querySelector('.sw .month') as HTMLSelectElement;
  const prevYearDom = document.querySelector('.sw .prevYear') as Element;
  const nextYearDom = document.querySelector('.sw .nextYear') as Element;
  const prevMonthDom = document.querySelector('.sw .prevMonth') as Element;
  const nextMonthDom = document.querySelector('.sw .nextMonth') as Element;
  const otherGymd = document.querySelector('.js_other .js_gymd') as Element; // 2022-09-28
  const otherjsGd = document.querySelector('.js_other .js_gd') as Element; // 28
  const otherNmd = document.querySelector('.js_other .js_nmd') as Element; // 九月初三
  const otherNy = document.querySelector('.js_other .js_ny') as Element; // 壬寅年
  const otherNs = document.querySelector('.js_other .js_ns') as Element; // 虎
  const otherNm = document.querySelector('.js_other .js_nm') as Element; // 己酉月
  const otherNd = document.querySelector('.js_other .js_nd') as Element; // 甲申日
  const map:Map<string, IYmd> = new Map();

  // 渲染日历
  const render = (newY: number, newM: number, avcObj?:IYmd) => {
    const y = avcObj ? avcObj.y : dayjs().year();
    const m = avcObj ? avcObj.m : dayjs().month() + 1;
    const d = avcObj ? avcObj.d: dayjs().date();

    const {lastArr, arr, nextArr} = getMonthDays(newY, newM);
    const list = [...lastArr, ...arr, ...nextArr];
    console.log(list);
    
    const newArr:IYmd[] = JSON.parse(JSON.stringify(list));
    const listDom = []
    
    // dom 结构
    {
      const lastDomArr = lastArr.map(item => {
        return `<td class="off" data-id="${[item.y,item.m, item.d].join()}">
          <p data-id="${[item.y,item.m, item.d].join()}">${item.d}</p>
          <p data-id="${[item.y,item.m, item.d].join()}">${ item.IDayCn }</p>
        </td>`
      });

      const arrDomArr = arr.map(item => {
        if(item.d === d && newM === m && newY === y) {
          return `<td class="active" data-id="${[item.y,item.m, item.d].join('')}">
            <p data-id="${[item.y,item.m, item.d].join('')}">${item.d}</p>
            <p data-id="${[item.y,item.m, item.d].join('')}">${ item.IDayCn }</p>
          </td>`
        }
        return `<td class="" data-id="${[item.y,item.m, item.d].join('')}">
          <p data-id="${[item.y,item.m, item.d].join('')}">${item.d}</p>
          <p data-id="${[item.y,item.m, item.d].join('')}">${ item.IDayCn }</p>
        </td>`
      })

      const nextDomArr = nextArr.map(item => {
        return `<td class="off" data-id="${[item.y,item.m, item.d].join('')}">
          <p data-id="${[item.y,item.m, item.d].join('')}">${item.d}</p>
          <p data-id="${[item.y,item.m, item.d].join('')}">${ item.IDayCn }</p>
        </td>`
      });

      const newDayArr = [...lastDomArr, ...arrDomArr, ...nextDomArr]

      for(let i = 0; i < (newDayArr.length / 7); i++) {
        listDom.push(newDayArr.slice(i * 7, (i + 1) * 7))
      }
    }

    // 渲染
    tbodyDom.innerHTML = listDom.map(item => {
      return `<tr>${item.join('')}</tr>`
    }).join('')

    
    // 便于后续事件处理
    // newArr.forEach(item => {
    //   const {y,m,d} = item
    //   const key = [y,m,d].join('');
    //   map.set(key, {...item})
    // })
    return newArr
  };

  // 设置map数据
  const setMapData = (arr:IYmd[]) => {
    arr.forEach(item => {
      const {y,m,d} = item
      const key = [y,m,d].join('');
      map.set(key, {...item})
    })
  };

  // 渲染 其他栏 信息
  const renderMapData = (id:string) => {

    let obj:IYmd | undefined = undefined;
    if(map.has(id)) {
      obj = map.get(id)
    }
    if(!obj) {
      return
    }

    const {
      y,
      m,
      d,
      IDayCn,
      IMonthCn,
      gzYear,
      gzMonth,
      gzDay,
      Animal
    } = obj;

    otherGymd.textContent = `${ y }-${ m }-${d}`;
    otherjsGd.textContent = d + '';
    otherNmd.textContent = IMonthCn + IDayCn;
    otherNy.textContent = gzYear + '年';
    otherNs.textContent = Animal;
    otherNm.textContent = gzMonth + '月';
    otherNd.textContent = gzDay + '日';

  };


  // 事件处理
  const handle = () => {

    // 上一年
    prevYearDom.addEventListener('click',() => {
      const year = Number(yearDom.value || '') // 当前年份
      const month = Number(monthDom.value || '') // 当前月份
      yearDom.selectedIndex = tooltObj.setYear(year - 1);
      render(year - 1, month)
    });

    // 下一年
    nextYearDom.addEventListener('click',() => {
      const year = Number(yearDom.value || '') // 当前年份
      const month = Number(monthDom.value || '') // 当前月份
      yearDom.selectedIndex = tooltObj.setYear(year + 1);
      render(year + 1, month)
    });

    // 上个月
    prevMonthDom.addEventListener('click', () => {
      const year = Number(yearDom.value) // 当前年份
      const month = Number(monthDom.value) // 当前月份
      if (month === 1) {
        yearDom.selectedIndex = tooltObj.setYear(year - 1);
        monthDom.selectedIndex = 11;
        render(year - 1, 12)
      } else {
        monthDom.selectedIndex = month - 1 - 1;
        render(year, month - 1)
      }
    });

    // 下个月
    nextMonthDom.addEventListener('click', () => {
      const year = Number(yearDom.value) // 当前年份
      const month = Number(monthDom.value) // 当前月份
      if (month === 12) {
        yearDom.selectedIndex = tooltObj.setYear(year + 1);
        monthDom.selectedIndex = 0;
        render(year + 1, 1)
      } else {
        monthDom.selectedIndex = month;
        render(year, month + 1)
      }
    });

    // 选择年份
    yearDom.addEventListener('change', (e) => {
      const year = Number((e.target as HTMLSelectElement).value);
      const month = Number(monthDom.value) // 当前月份
      yearDom.selectedIndex = tooltObj.setYear(year);
      render(year, month)
    });

    // 选择月份
    monthDom.addEventListener('change', (e) => {
      const year = Number(yearDom.value) // 当前年份
      const month = Number((e.target as HTMLSelectElement).value);
      monthDom.selectedIndex = month - 1;
      render(year, month)
    });

    // 点击日期
    tbodyDom.addEventListener('click', (e) => {
      console.log(e.target);
      const tdArr = Array.from(tbodyDom.querySelectorAll('td'));

      const target = e.target as HTMLElement;
      if(target.nodeName !== 'P') { return }
      const parentDom = target.parentElement!;
      const id = parentDom.dataset.id;
      console.log(parentDom);
      console.log(id);


      // 取消 类
      for(const key of tdArr) {
        // 取消
        if(key.classList.contains('xz')) {
          key.classList.remove("xz");
          break;
        }
      }
      // 添加 类
      for(const key of tdArr) {
        // 取消
        if(key.dataset.id === id) {
          key.classList.add("xz");
          break;
        }
      }

      // 跟新 其它栏 内容
      renderMapData(id!)
    })
  }

  // 初始化
  const init = () => {
    const year = dayjs().year() // 当前年份
    const month = dayjs().month() + 1 // 当前月份
    const day = dayjs().date() // 当前日期

    // 初始化年份数据
    yearDom.insertAdjacentHTML('afterbegin', tooltObj.initYear());

    // 设置年份
    yearDom.selectedIndex = tooltObj.setYear(year);

    // 设置月份
    monthDom.selectedIndex = month - 1;
    const newArr = render(year, month);

    // 便于后续事件处理
    setMapData(newArr)

    renderMapData(`${year}${month}${day}`)

    // 事件
    handle()
  }

  init();
})(tooltObj);




