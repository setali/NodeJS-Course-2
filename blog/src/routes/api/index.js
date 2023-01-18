import express from 'express'
import admin from './admin'
import auth from './auth'
import file from './file'

const router = express.Router()

router.use('/admin', admin)
router.use('/file', file)
router.use('/', auth)

export default router
