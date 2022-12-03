const heavyProcess = require('./heavy-process')
const { fork } = require('child_process')

const subProcess = fork(`${__dirname}/child.js`)
// const subProcess2 = fork(`${__dirname}/child.js`)
// const subProcess3 = fork(`${__dirname}/child.js`)
// const subProcess4 = fork(`${__dirname}/child.js`)

subProcess.on('message', data => {
  console.log('Child say: ', data)
})

subProcess.send({ name: 'Ali' })

setInterval(() => console.log(Date.now()), 1000)

// setTimeout(() => console.log(heavyProcess()), 0)

console.log('salam')
