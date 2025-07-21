import { random, sampleSize } from "lodash-es";
import { nameArr } from "./consts";

// 百家姓
export const { setNameStr } = (() => {
  // 随机生成数组
  const randomArr = () => {
    const val = random(2, 6);
    return sampleSize(nameArr, val).join("");
  };

  // 设置数值
  const setVal = (arr: string[]) => {
    return arr.map(item => {
      return {
        value: random(100, 10000),
        name: item,
      };
    });
  };

  // 组合名字
  const setNameStr = () => {
    // 初始化
    const nameArr: string[] = Array.from({ length: 10 }, x => {
      return "";
    });
    // console.log(nameArr);

    // 组合后的名字集合
    const newArr = nameArr.forEach((_, index) => {
      // item = randomArr();
      // return randomArr();
      nameArr[index] = randomArr();
    });

    // console.log(nameArr);

    // 填上数值
    const nameValArr = setVal(nameArr);

    return {
      nameArr,
      nameValArr,
    };
  };

  // setNameStr();

  return {
    setNameStr,
  };
})();
