import express from 'express'
import router from './routes/index.js'
import errorHandler from './middlewares/error-handler'
import renderTemplate from './middlewares/render-template'

global.__basedir = __dirname

const app = express()

app.use(express.static('public'))

app.use(renderTemplate)

const port = 8080

app.use(router)

app.use(errorHandler)

app.listen(port, () => {
  console.clear()
  console.log(`Server is running on port: ${port}`)
})
