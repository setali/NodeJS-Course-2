const fs = require('fs')
const path = require('path')
const http = require('https')

const filePath = path.resolve(__dirname, 'files.txt')
const data = fs.readFileSync(filePath, 'utf8')

const files = data.split('\n')

const dir = path.resolve(__dirname, 'downloads')

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir)
}

files.forEach(file => {
  const fileUrl = decodeURI(file)
  const fileName = path.basename(fileUrl).replace(/\s/g, '')

  const filePath = path.resolve(dir, fileName)
  const fileStream = fs.createWriteStream(filePath)

  http.get(file, function (response) {
    response.pipe(fileStream)

    response.on('end', () => {
      fileStream.close()
      console.log(`${fileName} Completed`)
    })
  })
})
