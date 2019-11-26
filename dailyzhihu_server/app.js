const express = require('express')
const compression = require('compression')
const app = express()
const https = require('https')
const fs = require('fs')

const options = {
  cert: fs.readFileSync('./full_chain.pem'),
  key: fs.readFileSync('./private.key')
}
// 需要先开启gzip压缩在开放静态资源
app.use(compression())
app.use(express.static('./dist'))

app.listen(80, '0.0.0.0', () => {
  console.log('http://localhost/')
})

// https.createServer(options, app).listen(443, () => {
//   console.log('启动完成')
// })
