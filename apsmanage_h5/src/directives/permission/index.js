import checkPermission from '@/utils/permission'

/**
 * @example
 * v-permission="['add','bbb']"
 * v-permission="'add'"
 */
export default {
  name: 'permission',
  mounted (el, binding) {
    const { value } = binding;
    const hasPermission = checkPermission(value);
    if (!hasPermission) {
      if (el.parentNode) {
        el.parentNode.removeChild(el);
      } else {
        el.innerHTML = '';
      }
    } else {
      el && el.setAttribute('code', value);
    }
  }
}


