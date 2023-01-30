const express = require('express')
const bodyParser = require('body-parser')
const uploader = require('express-fileupload')

const app = express()

const PORT = 8000;

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(uploader())

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
  res.send({
    msg: 'ok',
    code: 0
  })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
