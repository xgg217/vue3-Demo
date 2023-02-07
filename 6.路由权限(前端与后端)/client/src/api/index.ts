import http from "@/utils/http";

export function getUserRouteList(uid: number) {
  return http.post('/api/user_router_list', { uid }).then((res) => {
    return res;
  }).catch(err => {
    console.error(err);

  });
}