const heavyProcess = require('./heavy-process')
console.log(process.pid, process.ppid)

process.on('message', data => {
  console.log('Parent say', data)
})

process.send({ family: 'Mousavi' })

process.send({ value: heavyProcess() })

setInterval(() => {
  console.log('Child', Date.now())
}, 1000)
