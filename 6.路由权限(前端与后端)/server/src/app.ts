import express from 'express';
import { routes, users } from "./data/index"
import type { IRoute } from "./data/index"

const app = express();
const PORT = 8888;

app.use(express.urlencoded({extended: true}));
app.use(express.json());

interface IBody {
  uid: number
}

// 获取所有路由
app.post('/user_router_list', (req, res)=>{
  console.log('post请求体传参',req.body);

  const { uid } = req.body as IBody;

  if(!uid) {
    res.status(200).send({
      code: 1001,
      msg: 'id 不存在',
      data: null
    });
    return
  }
  const userInfo = users.find(item => item.id === Number(uid));

  if(!userInfo) {
    res.status(200).send({
      code: 1002,
      data: null,
      msg: '用户不存在',
    });
    return
  }

  const { auth } = userInfo
  const authRouteList: IRoute[] = []
  auth.forEach(item => {
    routes.forEach(route => {
      if(route.id === item) {
        authRouteList.push(route)
      }
    })
  })
  // console.log('authRouteList', authRouteList);
  res.status(200).send({
    code: 0,
    msg: 'ok',
    data: authRouteList
  });
});

app.listen(PORT, () => {
  console.log(`服务启动，端口号 ${PORT}`);
})
