import winston from 'winston'

export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'all.log' })
  ]
})

function log (options) {
  logger.log({ level: 'info', ...options })
}

export default log
