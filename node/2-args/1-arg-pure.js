// node 1-arg-pure.js name=ali family=mousavi

const args = process.argv.splice(2)

const tuples = args.map(el => el.split('='))

console.log(tuples)

const result = Object.fromEntries(tuples)

console.log(result)
console.log(result.name)
