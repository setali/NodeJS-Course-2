import './config/loadEnv'
import { bootstrap } from './app'

bootstrap().then(server => {
  const port = process.env.PORT

  server.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
  })
})
