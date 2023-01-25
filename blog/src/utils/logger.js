import winston from 'winston'
import 'winston-mongodb'

export const mongoTransport = new winston.transports.MongoDB({
  db: process.env.MONGO_URL,
  collection: process.env.MONGO_COLLECTION,
  options: {
    useUnifiedTopology: true
  }
})

export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    mongoTransport
  ]
})

function log (options) {
  logger.log({ level: 'info', ...options })
}

export default log
