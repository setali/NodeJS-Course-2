import express from 'express'
import admin from './admin'
import auth from './auth'

const router = express.Router()

router.use('/admin', admin)
router.use('/', auth)

export default router
