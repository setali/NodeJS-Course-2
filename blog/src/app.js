import path from 'path'
import express from 'express'
import 'express-async-errors'
import router from './routes'
import errorHandler from './middlewares/error-handler'
import bodyParser from 'body-parser'
import overrideMethod from './middlewares/override-method'
import { sequelize } from './config/database'
import session from 'express-session'
import connectRedis from 'connect-redis'
import auth from './middlewares/auth'
import socketIO from 'socket.io'
import http from 'http'
import chatApp from './chat'
import { redisClient } from './config/redis'

export async function bootstrap () {
  const app = express()

  app.set('views', path.resolve(__dirname, 'views'))
  app.set('view engine', 'ejs')

  app.use(express.static('public'))
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(express.json())
  app.use(overrideMethod)

  const RedisStore = connectRedis(session)

  const store = new RedisStore({ client: redisClient })

  const sessionMiddleware = session({
    store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true
  })

  app.use(sessionMiddleware)

  app.use(auth)

  await sequelize.authenticate()
  // await sequelize.sync()
  await sequelize.sync({ alter: true })

  app.use(router)

  app.use(errorHandler)

  const server = http.createServer(app)

  const io = new socketIO.Server(server)

  io.use((socket, next) => {
    sessionMiddleware(socket.request, {}, next)
  })

  io.use((socket, next) => {
    auth(socket.request, {}, next)
  })

  io.on('connection', socket => chatApp(io, socket))

  return server
}
