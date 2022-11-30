const Stream = require('stream')
const path = require('path')
const fs = require('fs')

const chunks = []

const writableStream = new Stream.Writable({
  write: (chunk, encoding, next) => {
    console.log(chunk.length)
    chunks.push(chunk)
    next()
  }
})

const readableStream = new Stream.Readable({
  read: () => {}
})

readableStream.pipe(writableStream)

readableStream.on('close', () => writableStream.end())
writableStream.on('close', () => {
  console.log('Writable stream ended.!')
  const buffer = Buffer.concat(chunks)
  const newFilePath = path.resolve(__dirname, 'files', 'new-image.jpg')
  fs.writeFileSync(newFilePath, buffer)
})

const filePath = path.resolve(__dirname, 'files', 'image.jpg')

const data = fs.readFileSync(filePath)

const chunkSize = 2 ** 10 // 1KB

const chunkCount = parseInt(data.length / chunkSize) + 1

for (let i = 0; i < chunkCount; i++) {
  const chunk = data.slice(i * chunkSize, (i + 1) * chunkSize)
  readableStream.push(chunk)
}

readableStream.destroy()
