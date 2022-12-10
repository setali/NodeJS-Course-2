const myEvent = require('./my-event')

myEvent.on('hello', (name, family) => {
  console.log(name, family)
})

myEvent.on('pow', (a, b) => console.log(a ** b))

myEvent.on('mul', (...args) => {
  //   let result = 1

  //   args.forEach(el => {
  //     result *= el
  //   })

  const result = args.reduce((acc, el) => acc * el)
  console.log(result)
})
