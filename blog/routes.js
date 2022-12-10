import { home, about, contact } from './controller'
import express from 'express'

const router = express.Router()

router.get('/', home)
router.get('/about', about)
router.get('/contact', contact)

export default router
