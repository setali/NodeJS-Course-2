import path from 'path'
import fs from 'fs'
import express from 'express'
import router from './routes/index.js'
import errorHandler from './middlewares/error-handler'

const app = express()

app.use(express.static('public'))

app.engine('ali', (filePath, params, callback) => {
  let view = fs.readFileSync(filePath, 'utf-8')

  const entries = Object.entries(params)

  entries.forEach(([key, value]) => {
    if (typeof value === 'string') {
      view = view.replace(`#${key}#`, value)
    }
  })

  return callback(null, view)
})

app.set('views', path.resolve(__dirname, 'views'))
app.set('view engine', 'ali')

const port = 8080

app.use(router)

app.use(errorHandler)

app.listen(port, () => {
  console.clear()
  console.log(`Server is running on port: ${port}`)
})
