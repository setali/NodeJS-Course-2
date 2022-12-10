const express = require('express')
const router = require('./routes')

const app = express()

const port = 8080

app.use(router)

app.all('*', (req, res) => {
  res.status(404).send('Not found')
})

app.use((err, req, res, next) => {
  console.log(err.message)
  res.status(400).send(err.message)
})

app.listen(port, () => {
  console.clear()
  console.log(`Server is running on port: ${port}`)
})
