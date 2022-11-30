// node 2-args/2-arg-minimist.js --name ali --family mousavi -a 33  eli qoli

const minimist = require('minimist')

const result = minimist(process.argv.splice(2))

console.log(result)
