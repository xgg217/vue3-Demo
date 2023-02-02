import express from 'express';

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

  res.send('post请求测试');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})
