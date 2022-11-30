const http = require('http')
const { convert } = require('../5-buffer/5-convert')

const server = http.createServer((req, res) => {
  // console.log(req.url)
  // console.log(req.method)
  // console.log(req.httpVersion)
  // console.log(req.headers)
  // console.log(Object.keys(req))

  // res.statusCode = 404

  // res.setHeader('content-type', 'text/plain')
  res.setHeader('content-type', 'text/html')

  const base64 = convert('Ali Mousavi', 'utf8', 'base64')

  const buffer = Buffer.from(base64, 'base64')
  console.log(buffer)

  res.write('<h1>')
  // res.write(base64, 'base64')
  res.write(buffer)
  res.write('</h1>')

  res.end()

  // res.write('ali') // wrong
  console.log("Code work!, you must use return if you don't like it")
})

server.listen(3000, () => {
  console.clear()
  console.log('Server running on port 3000')
})
