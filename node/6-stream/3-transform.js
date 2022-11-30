const Stream = require('stream')

const transformStream = new Stream.Transform()

transformStream._transform = (chunk, encoding) => {
  const data = chunk.toString().toUpperCase()
  transformStream.push(data)
}

process.stdin.pipe(transformStream).pipe(process.stdout)
