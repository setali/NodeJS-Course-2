const buf = Buffer.from('AliMousavi')

// console.log(buf)
console.log(buf.toString())
// console.log(buf.toString('base64'))
// console.log(buf.toString('hex'))

const buf2 = Buffer.from('Sam')

buf.set(buf2)

console.log(buf.toString())


