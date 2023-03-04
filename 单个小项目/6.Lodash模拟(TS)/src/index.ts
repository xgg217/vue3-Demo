// import chunk from './utils/array/1.chunk'
// import compact from './utils/array/2.compact'
// import concat from './utils/array/3.concat'
import difference from './utils/array/4.difference'
(() => {
  // const arr = Array.from({ length: 10 }, (x, i) => {
  //   return i
  // });
  // console.log(arr); // [0, 1, 2, 3, 4,5, 6, 7, 8, 9]

  // chunk(['a', 'b', 'c', 'd'], 3);
  // console.log(compact([0, 1, false, 2, '', 3]));
  // console.log(compact([0, 1, false, 2, '', 3]));

  // var array = [1];
  // var other = concat(array, 2, [3], [[4]]);

  // console.log(other);
  // // => [1, 2, 3, [4]]

  // console.log(array);
  // => [1]
  console.log(difference([3, 2, 1], [4, 2]));



})();
