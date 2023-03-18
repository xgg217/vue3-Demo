import { ref } from 'vue';

export default function usePage(options) {
    let loading = ref(options?.loading || false);
    let finished = ref(options?.finished || false);
    let pageNum = ref(options?.pageNum || 0)
    let pageSize = ref(options?.pageSize || 10)
    let total = ref(0)

    return {
        loading,
        finished,
        pageNum,
        pageSize,
        total
    };
}
