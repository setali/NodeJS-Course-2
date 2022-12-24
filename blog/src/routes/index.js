import { NotFoundError } from '../utils/errors'
import express from 'express'
import general from './general'
import admin from './admin'
import article from './article'

const router = express.Router()

router.use('/', general)
router.use('/article', article)

router.use('/admin', admin)

router.all('*', (req, res) => {
  throw new NotFoundError()
})

export default router
