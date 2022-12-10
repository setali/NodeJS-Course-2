const fs = require('fs')
const path = require('path')

function config (filename = '.env') {
  const filePath = path.resolve(__dirname, filename)

  const data = fs.readFileSync(filePath, 'utf-8')

  data
    .split('\n')
    .filter(el => el)
    .map(el => el.split('='))
    .forEach(([key, value]) => {
      process.env[key] = value
    })
}

module.exports = {
  config
}
