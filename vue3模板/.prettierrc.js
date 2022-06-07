module.exports = {
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,   // 使用空格缩进
  semi: true,   // 分号
  vueIndentScriptAndStyle: true,
  singleQuote: true,
  quoteProps: 'as-needed',
  bracketSpacing: true,  //对象大括号直接是否有空格，默认为true，效果：{ foo: bar }
  trailingComma: 'es5',
  jsxBracketSameLine: false,
  jsxSingleQuote: false,  // jsx 属性使用双引号
  arrowParens: 'avoid',  // 箭头函数只有一个参数的时候可以忽略括号
  insertPragma: false,
  requirePragma: false,
  proseWrap: 'preserve',  // 换行方式
  htmlWhitespaceSensitivity: 'strict',
  endOfLine: 'auto',  // 行结束符使用 Unix 格式
  rangeStart: 0
};