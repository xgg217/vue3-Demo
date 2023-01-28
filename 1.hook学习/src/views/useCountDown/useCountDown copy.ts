import type { ComputedRef } from "vue";

type UseCountDownOptions = {
  time: number; // 总时间 单位毫秒
  // millisecond?: boolean;
  // onChange?: (current: CurrentTime) => void;
  // onFinish?: () => void;
};

type CurrentTime = {
  total: number; // 总时间
  days: number; // 天
  hours: number; // 小时
  minutes: number; // 分钟
  seconds: number; // 秒
  milliseconds: number; // 毫秒
};

type CountDown = {
  start: () => void; // 开始计时
  pause: () => void; // 暂停计时
  reset: (totalTime: number) => void; // 重置计时
  // current: ComputedRef<CurrentTime>;
  current: CurrentTime; // 当前时间
};

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
const formatTime = (time: number) => {
  const days = Math.floor(time / 1000 / 60 / 60 / 24);
  const hours = Math.floor((time / 1000 / 60 / 60) % 24);
  const minutes = Math.floor((time / 1000 / 60) % 60);
  const seconds = Math.floor((time / 1000) % 60);
  const milliseconds = Math.floor((time % 1000) / 10);
  return {
    days,
    hours,
    minutes,
    seconds,
    milliseconds,
    total: time,
  };
}

// 是否暂停
let isStop = false;

let timer = 0;

// 定时器
const setD = () => {
  if(isStop) return
  clearTimeout(timer);

  timer = setTimeout(() => {
    console.log('timer');
    current.total = current.total - 1000;
    setData(current.total)
    setD();
  }, 1000);
}

// 数据处理
const setData = (time: number) => {
  const { days, hours, minutes, seconds, milliseconds, total } = formatTime(time);
  current.days = days;
  current.hours = hours;
  current.minutes = minutes;
  current.seconds = seconds;
  current.milliseconds = milliseconds;
  current.total = total;
}



export default function useCountDown(options: UseCountDownOptions):CountDown {

  setData(options.time);

  // 开始计时
  const start = () => {
    setD()
  }

  // 暂停计时
  const pause = () => {
    isStop = true
  }

  // 重置计时
  const reset = (totalTime: number) => {}

  return {
    start,
    pause,
    reset,
    current
  }
}