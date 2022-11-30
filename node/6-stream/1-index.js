const Stream = require('stream')

const writableStream = new Stream.Writable()

writableStream._write = (chunk, encoding, next) => {
  //   console.log(chunk)
  console.log(chunk.toString())
  //   console.log(encoding)
  next()
}

const readableStream = new Stream.Readable()

readableStream._read = size => {
  console.log('Size => ', size) // 2 ** 14 => 16KB
}

readableStream.pipe(writableStream)

let counter = 1

const intervalId = setInterval(() => {
  console.log(Date.now())
  readableStream.push(String(counter++))
}, 2000)

readableStream.on('close', () => writableStream.end())
writableStream.on('close', () => console.log('Writable stream ended!'))

setTimeout(() => {
  readableStream.destroy()
  clearInterval(intervalId)
}, 10000)
