import path from 'path'
import fs from 'fs'
import express from 'express'
import router from './routes/index.js'
import errorHandler from './middlewares/error-handler'

const app = express()

app.use(express.static('public'))

app.set('views', path.resolve(__dirname, 'views'))
app.set('view engine', 'pug')

const port = 8080

app.use(router)

app.use(errorHandler)

app.listen(port, () => {
  console.clear()
  console.log(`Server is running on port: ${port}`)
})
