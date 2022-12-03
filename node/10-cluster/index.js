const cluster = require('cluster')
const http = require('http')
const cpuCounts = require('os').cpus().length

// console.log(cluster.isMaster)
if (cluster.isMaster) {
  console.log('Master is running on', process.pid)
  for (let i = 0; i < cpuCounts; i++) {
    cluster.fork()
  }
} else {
  // Workers cane share any TCP connection
  http
    .createServer((req, res) => {
      res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500')
      res.end(process.pid + '')
    })
    .listen(3000)

  console.log(`Worker ${process.pid} started`)
}
