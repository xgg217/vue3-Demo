import express from 'express';
import { routes, users } from "./data/index"
import type { IRoute } from "./data/index"

const app = express();
const PORT = 8081;

app.use(express.urlencoded({extended: false}));
app.use(express.json());

interface IBody {
  uid: number
}

// 获取所有路由
app.post('/user_router_list', (req, res)=>{
  console.log('post请求体传参',req.body);

  const { uid } = req.body as IBody;

  if(!uid) {
    return res.send('uid不能为空');
  }
  const userInfo = users.find(item => item.id === uid);

  if(userInfo) {
    const { auth } = userInfo
    const authRouteList: IRoute[] = []
    auth.map(item => {
      routes.map(route => {
        route.id === item
      })
    })
  }

  res.send('post请求测试');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})
