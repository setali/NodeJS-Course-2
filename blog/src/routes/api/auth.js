import express from 'express'
import authConstroller from '../../controllers/apiAuth'

const router = express.Router()

router.use('/login', authConstroller.login)
router.use('/user', authConstroller.user)

export default router
