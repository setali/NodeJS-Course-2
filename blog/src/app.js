import path from 'path'
import express from 'express'
import router from './routes'
import errorHandler from './middlewares/error-handler'
import bodyParser from 'body-parser'
import overrideMethod from './middlewares/override-method'
import { sequelize } from './config/database'
import session from 'express-session'
import connectRedis from 'connect-redis'
import Redis from 'ioredis'
import auth from './middlewares/auth'

export async function bootstrap () {
  const app = express()

  app.set('views', path.resolve(__dirname, 'views'))
  app.set('view engine', 'ejs')

  app.use(express.static('public'))
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(overrideMethod)

  const redisClient = new Redis(6372)

  const RedisStore = connectRedis(session)

  const store = new RedisStore({ client: redisClient })

  app.use(
    session({
      store,
      secret: process.env.SECRET,
      resave: false
    })
  )

  app.use(auth)

  await sequelize.authenticate()
  await sequelize.sync({ alter: true })

  app.use(router)

  app.use(errorHandler)

  const port = process.env.PORT

  app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
  })
}
