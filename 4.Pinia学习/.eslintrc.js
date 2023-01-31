module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:vue/vue3-recommended', // 导入vue3的格式建议拓展
    'plugin:@typescript-eslint/recommended', // 使用ts导入ts的格式建议拓展
  ],
  parserOptions: {
    ecmaVersion: 2020,
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
    jsxPragma: 'React', // jsx的解析方式
    ecmaFeatures: {
      jsx: true,
      tsx: true,
    },
  },
  parser: 'vue-eslint-parser',
  plugins: ['vue', '@typescript-eslint', 'prettier'],
  rules: {
    // js/ts
    'eol-last': 'error',  // 禁止文件末尾保留一行空行
    'no-trailing-spaces': 'error', // 禁用行尾空白
    'comma-style': ['error', 'last'],  // 逗号的风格，在末尾补上逗号
    'comma-dangle': ['error', 'always-multiline'],  // 在[].{}中换行的尾部用上逗号
    'quotes': ['1', 'single'],
    'camelcase': ['error', { properties: 'always' }], // 驼峰语法
    'semi': ['error', 'always'], // 使用半分号
    'indent': ['error', 2, { SwitchCase: 1 }],  // 前空隙，2个单位
    'object-curly-spacing': ['error', 'always'], // 强制在{}中使用一致的空格
    'arrow-parens': ['error', 'as-needed'], // 箭头函数需要括号
    '@typescript-eslint/explicit-module-boundary-types': 'off', // ts的约束
    '@typescript-eslint/no-explicit-any': 'off', // ts的约束
    '@typescript-eslint/member-delimiter-style': [  // ts的约束
      'error',
      {
        multiline: {
          delimiter: 'none',
          requireLast: false,
        },
        singleline: {
          delimiter: 'semi',
          requireLast: true,
        },
      },
    ],
    // vue相关约束
    'vue/no-v-html': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'never',
          normal: 'never',
          component: 'always',
        },
      },
    ],
    'vue/max-attributes-per-line': [
      'error',
      {
        singleline: 3,
        multiline: 1,
      },
    ],
    'vue/multi-word-component-names': ['error', {
      'ignores': ['Todo'],
    }],
    'vue/require-default-prop': 'off',
    'vue/html-closing-bracket-spacing': 'error',
  },
};
