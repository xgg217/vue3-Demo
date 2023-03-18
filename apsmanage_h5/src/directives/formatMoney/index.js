/**
 * 格式化金额 v-format-money
 */
import {formatMoney} from "@/utils/utils";

export default {
    name: 'format-money',
    mounted(el, ...arg) {
        const value = arg[0].value
        el.innerHTML =formatMoney(value);
    },
    updated(el, ...arg){
        const value = arg[0].value
        el.innerHTML =formatMoney(value);
    }
}
