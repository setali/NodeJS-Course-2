import path from 'path'
import express from 'express'
import router from './routes/index.js'
import errorHandler from './middlewares/error-handler'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import overrideMethod from './middlewares/override-method'

dotenv.config()

const app = express()

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(overrideMethod)

app.set('views', path.resolve(__dirname, 'views'))
app.set('view engine', 'ejs')

const port = 8080

app.use(router)

app.use(errorHandler)

app.listen(port, () => {
  console.clear()
  console.log(`Server is running on port: ${port}`)
})
