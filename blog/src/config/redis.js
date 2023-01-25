import Redis from 'ioredis'

export const redisClient = new Redis({
  port: process.env.REDIS_PORT,
  keyPrefix: process.env.REDIS_KEY_PREFIX
})
