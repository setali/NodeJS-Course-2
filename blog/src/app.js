import path from 'path'
import express from 'express'
import router from './routes'
import errorHandler from './middlewares/error-handler'
import bodyParser from 'body-parser'
import overrideMethod from './middlewares/override-method'
import { sequelize } from './config/database'

export async function bootstrap () {
  const app = express()

  app.use(express.static('public'))
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(overrideMethod)

  app.set('views', path.resolve(__dirname, 'views'))
  app.set('view engine', 'ejs')

  const port = 8080

  await sequelize.authenticate()
  await sequelize.sync()

  app.use(router)

  app.use(errorHandler)

  app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
  })
}
