import formatMoney from '@/directives/formatMoney/'
import removeReadonly from './removeReadonly'
import moreTips from './moreTips'
import permission from './permission'

// 注册全局自定义指令
const directive = [formatMoney, removeReadonly, moreTips,permission]

export default (app) => {
  directive.forEach((directive) => {
    app.directive(directive.name, directive)
  })
}

