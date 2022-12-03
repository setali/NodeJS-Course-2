const { spawn } = require('child_process')
const path = require('path')

process.title = 'Node - parent'

console.log('Parent id', process.pid)

const controller = new AbortController()

// const { signal } = controller

const child = spawn('node', [path.resolve(__dirname, 'child.js')], {
  signal: controller.signal
})

console.log('Child id', child.pid)

child.stdout.on('data', data => {
  console.log('stdout', data.toString())
})

child.stderr.on('data', data => {
  console.error(`stderr: ${data}`)
})

child.on('close', code => {
  console.log(`Child process exited with code ${code}`)
})

setTimeout(() => {
  controller.abort(code => console.log(code))
}, 5000)

setTimeout(() => {
  console.log('Parent timeout')
}, 20000)
