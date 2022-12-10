const express = require('express')

const app = express()

const port = 8080

app.use((req, res, next) => {
  console.log(req.url)

  next()
})

app.use('/about*', (req, res, next) => {
  console.log('About middleware')
  next()
})

// app.use((req, res, next) => {
//   throw new Error('Custom error')
// })

app.get('/', (req, res) => {
  //   throw new Error('Home page error')
  res.send('Hello')
})

app.get('/about', (req, res) => {
  res.status(202).send('About Us')
})

app.get('/api', (req, res) => {
  return res.json({ name: 'Ali' })
  console.log('salam')
})

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
