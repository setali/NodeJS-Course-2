const http = require('http')
const path = require('path')
const fs = require('fs')

const server = http.createServer((req, res) => {
  const filePath = path.resolve(__dirname, 'music.mp3')

  const stream = fs.createReadStream(filePath, { highWaterMark: 1024 })

  stream.pipe(process.stdout)
  stream.pipe(res)

  setTimeout(() => {
    stream.pause()
    // stream.unpipe()
  }, 300)

  setTimeout(() => {
    stream.resume()
  }, 20000)

  //   const data = fs.readFileSync(filePath)
  //   res.end(data)
})

server.listen(3000, () => {
  console.clear()
  console.log('Server running on port 3000')
})
