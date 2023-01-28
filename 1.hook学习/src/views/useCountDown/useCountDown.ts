import { computed, onActivated, onBeforeUnmount, onDeactivated, ref } from "vue";
import { raf, cancelRaf, inBrowser } from "./utils";
// import { ref, type ComputedRef } from "vue";

type UseCountDownOptions = {
  time: number; // 总时间 单位毫秒
  millisecond?: boolean;
  onChange?: (current: CurrentTime) => void;
  onFinish?: () => void;
};

type CurrentTime = {
  total: number; // 总时间
  days: number; // 天
  hours: number; // 小时
  minutes: number; // 分钟
  seconds: number; // 秒
  milliseconds: number; // 毫秒
};

// type CountDown = {
//   start: () => void; // 开始计时
//   pause: () => void; // 暂停计时
//   reset: (totalTime: number) => void; // 重置计时
//   // current: ComputedRef<CurrentTime>;
//   current: CurrentTime; // 当前时间
// };

const SECOND = 1000; // 1秒
const MINUTE = 60 * SECOND; // 1分钟
const HOUR = 60 * MINUTE; // 1小时
const DAY = 24 * HOUR; // 1天


const current = {
  days: 0,
  hours: 0,
  total: 0,
  minutes: 0,
  seconds: 0,
  milliseconds: 0,
}

// 时间处理
const parseTime = (time: number):CurrentTime => {
  const days = Math.floor(time / DAY);
  const hours = Math.floor((time % DAY) / HOUR);
  const minutes = Math.floor((time % HOUR) / MINUTE);
  const seconds = Math.floor((time % MINUTE) / SECOND);
  const milliseconds = Math.floor(time % SECOND);

  return {
    days,
    hours,
    minutes,
    seconds,
    milliseconds,
    total: time,
  };
}
// 是否是相同的时间
const isSameSecond = (time1: number, time2: number):boolean => {
  return Math.floor(time1 / 1000) === Math.floor(time2 / 1000);
}

// // 是否暂停
// let isStop = false;

// let timer = 0;

// // 定时器
// const setD = () => {
//   if(isStop) return
//   clearTimeout(timer);

//   timer = setTimeout(() => {
//     console.log('timer');
//     current.total = current.total - 1000;
//     setData(current.total)
//     setD();
//   }, 1000);
// }

// // 数据处理
// const setData = (time: number) => {
//   const { days, hours, minutes, seconds, milliseconds, total } = formatTime(time);
//   current.days = days;
//   current.hours = hours;
//   current.minutes = minutes;
//   current.seconds = seconds;
//   current.milliseconds = milliseconds;
//   current.total = total;
// }



export default function useCountDown(options: UseCountDownOptions) {
  let rafId: number = 0; // requestAnimationFrame id
  let endTime: number = 0;
  let counting = false; // 是否在计时
  let deactivated = false;

  const remain = ref(options.time);
  const current = computed(() => parseTime(remain.value));

  // 暂停计时
  const pause = () => {
    counting = false;
    cancelRaf(rafId)
  }

  // 重置计时
  const getCurrentRemain = () => {
    return Math.max(endTime - Date.now(), 0);
  }

  const setRemain = (value: number) => {
    remain.value = value;
    options.onChange?.(current.value);

    if (value === 0) {
      pause();
      options.onFinish?.();
    }
  }

  const microTick = () => {
    rafId = raf(() => {
      // in case of call reset immediately after finish
      if (counting) {
        setRemain(getCurrentRemain());

        if (remain.value > 0) {
          microTick();
        }
      }
    });
  };

  const macroTick = () => {
    rafId = raf(() => {
      // in case of call reset immediately after finish
      if (counting) {
        const remainRemain = getCurrentRemain();

        if (!isSameSecond(remainRemain, remain.value) || remainRemain === 0) {
          setRemain(remainRemain);
        }

        if (remain.value > 0) {
          macroTick();
        }
      }
    });
  };

  const tick = () => {
    // should not start counting in server
    // see: https://github.com/vant-ui/vant/issues/7807
    if (!inBrowser) {
      return;
    }

    if (options.millisecond) {
      microTick();
    } else {
      macroTick();
    }
  };

  const start = () => {
    if (!counting) {
      endTime = Date.now() + remain.value;
      counting = true;
      tick();
    }
  };

  const reset = (totalTime: number = options.time) => {
    pause();
    remain.value = totalTime;
  };

  onBeforeUnmount(pause);

  onActivated(() => {
    if (deactivated) {
      counting = true;
      deactivated = false;
      tick();
    }
  });

  onDeactivated(() => {
    if (counting) {
      pause();
      deactivated = true;
    }
  });



  // setData(options.time);

  // // 开始计时
  // const start = () => {
  //   setD()
  // }

  // // 暂停计时
  // const pause = () => {
  //   isStop = true
  // }

  // // 重置计时
  // const reset = (totalTime: number) => {}

  return {
    start, // 开始计时
    pause, // 暂停计时
    reset, // 重置计时
    current // 当前时间
  }
}