const { workerData, parentPort } = require('worker_threads')

console.log(process.pid) // It's same as parent

// parentPort.on('message', data => {
//   console.log('Parent say: ', data)
// })

parentPort.postMessage('Aleyk')

// setTimeout(() => {
//   parentPort.postMessage('terminate')
// }, 3000)

const result = (workerData.a ** workerData.b).toString().length

parentPort.postMessage(result)
