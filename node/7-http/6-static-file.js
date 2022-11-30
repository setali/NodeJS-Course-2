const http = require('http')
const fs = require('fs')
const path = require('path')
const URL = require('url')

const STATIC_DIR = 'public'

function staticServe (req, res) {
  const { pathname } = URL.parse(req.url)

  const filePath = path.resolve(__dirname, STATIC_DIR, ...pathname.split('/'))

  if (fs.existsSync(filePath)) {
    const data = fs.readFileSync(filePath)
    res.end(data)
    return true
  }

  return false
}

const server = http.createServer((req, res) => {
  const { pathname } = URL.parse(req.url)

  if (pathname === '/') {
    const data = fs.readFileSync(path.resolve(__dirname, 'index.html'))
    return res.end(data)
  }

  if (staticServe(req, res)) {
    return
  }

  res.statusCode = 404
  res.end('Not found')
})

server.listen(3000, () => {
  console.clear()
  console.log('Server running on port 3000')
})
