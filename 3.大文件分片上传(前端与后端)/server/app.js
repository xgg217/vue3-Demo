const express = require('express')
const bodyParser = require('body-parser')
const uploader = require('express-fileupload')
const { extname, resolve } = require('path')
const { existsSync, appendFileSync, writeFileSync } = require('fs')

const app = express()

const PORT = 8000;

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(uploader())
app.use('/', express.static('upload_temp'))

// 允许跨域
app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild')
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS')

  if (req.method == 'OPTIONS') {
    res.send(200)
  } else {
    next()
  }
})

app.post('/upload_video', (req, res) => {

  const {
    name,
    type,
    size,
    fileName,
    uploadSize,
  } = req.body

  const { file } = req.files;

  console.log(req.body);

  if(!file) {
    res.send({
      msg: '请选择文件',
      code: -1
    })
    return;
  }

  // 类型判断

  const filename = fileName + extname(name);
  const filePath = resolve(__dirname, './upload_temp', filename);

  // 非第一次上传
  if(uploadSize !== '0') {
    // 文件不存在
    if(!existsSync(filePath)) {
      res.send({
        msg: '文件不存在',
        code: -1
      })
      return;
    }

    // 追加文件
    appendFileSync(filePath, file.data);

    res.send({
      msg: '文件追加成功',
      code: 0,
      data: {
        url: `http://localhost:${PORT}/${filename}`
      }
    })

    return
  }

  // 写文件
  writeFileSync(filePath, file.data);

  res.send({
    msg: '文件创建成功',
    code: 0
  })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
