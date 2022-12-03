const { Worker } = require('worker_threads')
const path = require('path')

const workerPath = path.resolve(__dirname, 'worker.js')

function makeWorker (a, b) {
  const worker = new Worker(workerPath, {
    workerData: { a, b }
  })

  worker.postMessage('salam')

  worker.on('message', data => {
    console.log(data)
    if (data === 'terminate') {
      worker.terminate()
    }
  })

  worker.on('error', console.log)

  worker.on('exit', code => {
    console.log('Worker exited with code:', code)
  })
}

console.log(process.pid)

makeWorker(99999999999n, 999999n)
makeWorker(999999999n, 999999n)
makeWorker(9999999999n, 999999n)
makeWorker(999999n, 999999n)

// console.log((99999999n ** 999999n).toString().length) // block the process

setInterval(() => {
  console.log(Date.now())
}, 1000)
