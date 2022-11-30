const http = require('http')
const fs = require('fs')
const path = require('path')

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500')

  if (req.url === '/') {
    console.log('salam')
    res.end('Hello')
  }

  if (req.url === '/front') {
    const filePath = path.resolve(__dirname, 'index.html')
    const data = fs.readFileSync(filePath)

    res.end(data)
  }
})

server.listen(3000, () => console.log('Server is running'))
