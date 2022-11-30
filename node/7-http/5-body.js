const http = require('http')
const fs = require('fs')
const path = require('path')
const qs = require('qs')

const server = http.createServer((req, res) => {
  if (req.url === '/login' && req.method === 'GET') {
    const data = fs.readFileSync(path.resolve(__dirname, 'form-post.html'))
    return res.end(data)
  }

  if (req.url === '/login' && req.method === 'POST') {
    const data = []
    req.on('data', chunk => {
      data.push(chunk)
    })

    req.on('end', () => {
      console.log(1)
      const buffer = Buffer.concat(data)
      const str = buffer.toString()
      const body = qs.parse(str)
      res.end(JSON.stringify(body))
    })

    return
  }

  res.statusCode = 404
  res.end('Not found')
})

server.listen(3000, () => {
  console.clear()
  console.log('Server running on port 3000')
})
