// UV_THREADPOOL_SIZE = 10

console.log(process.pid)
console.log(process.ppid)
console.log(process.cwd())

process.title = 'aliaqa'

// console.log(process.config)

console.log(process.env.USER)

console.log(process.uptime())

console.log(process.cpuUsage())
console.log(process.resourceUsage())
console.log(process.memoryUsage())

setTimeout(() => {
  console.log(process.uptime())
}, 2000)

setInterval(() => {
  console.log(Date.now())
}, 1000)

setTimeout(() => {
  //   process.exit()
  process.kill(process.pid)
}, 5000)

process.on('uncaughtException', ex => {
  console.log(ex)
})

throw 'Error'
