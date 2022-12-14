import express from 'express'
import general from './general'

const router = express.Router()

router.use('/', general)

router.all('*', (req, res) => {
  res.status(404).send('Not found')
})

export default router
