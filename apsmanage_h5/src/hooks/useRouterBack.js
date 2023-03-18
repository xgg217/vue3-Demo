export default function useRouterBack() {
    const router = useRouter()
    //返回按钮
    const handelNavBack = (name,{query={},params={}}) => {
        console.log(router.options?.history?.state?.back)
        if(router.options?.history?.state?.back){
            router.back()
        }else {
            router.replace({name, params,query})
        }
    }
    return {
        handelNavBack
    };
}
