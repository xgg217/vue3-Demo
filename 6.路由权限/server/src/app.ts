import express from 'express';

const app = express();
const PORT = 8081;

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.post('/postTest', (req, res)=>{
  console.log('post请求体传参',req.body);
  res.send('post请求测试');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})
