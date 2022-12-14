import express from 'express'
import router from './routes/index.js'
import errorHandler from './middlewares/error-handler'

const app = express()

app.use(express.static('public'))

const port = 8080

app.use(router)

app.use(errorHandler)

app.listen(port, () => {
  console.clear()
  console.log(`Server is running on port: ${port}`)
})
