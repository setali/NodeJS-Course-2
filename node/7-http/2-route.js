const http = require('http')
const path = require('path')
const fs = require('fs')

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    return res.end('Home Page')
  }

  if (req.url === '/about') {
    const filePath = path.resolve(__dirname, 'about.html')
    const data = fs.readFileSync(filePath)

    return res.end(data)
  }

  if (req.url === '/favicon.ico') {
    return res.end(fs.readFileSync(path.resolve(__dirname, 'favicon.ico')))
  }

  res.statusCode = 404
  res.end('Not Found')
})

server.listen(3000, () => {
  console.clear()
  console.log('Server running on port 3000')
})
