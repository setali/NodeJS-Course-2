import express from 'express'
import general from './general'
import admin from './admin'

const router = express.Router()

router.use('/', general)

router.use('/admin', admin)

router.all('*', (req, res) => {
  res.status(404).send('Not found')
})

export default router
