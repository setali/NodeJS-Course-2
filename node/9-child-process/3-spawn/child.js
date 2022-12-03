process.title = 'Node - Child'

console.log('Child inside id', process.pid)
console.log('Parent inside id', process.ppid)

const intervalId = setInterval(() => {
  console.log('salam')
}, 1000)

// setTimeout(() => {
//   throw new Error('My Error')
// }, 6000)

// setTimeout(() => {
//   clearInterval(intervalId)
// }, 5000)

// setTimeout(() => {
//   process.exit()
// }, 5000)
