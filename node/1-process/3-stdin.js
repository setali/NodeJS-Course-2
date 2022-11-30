// ls | node 3-stdin.js
// cat names.txt | node 3-stdin.js
// node 3-stdin.js < names.txt

process.stdin.on('data', data => {
  console.log(data)
  console.log(data.toString())
})
