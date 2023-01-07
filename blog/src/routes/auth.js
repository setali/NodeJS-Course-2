import express from 'express'
import AuthController from '../controllers/auth'

const router = express.Router()

router.get('/login', AuthController.loginPage)
router.post('/login', AuthController.login.bind(AuthController))
router.get('/register', AuthController.registerPage)
router.post('/register', AuthController.register.bind(AuthController))
router.get('/logout', AuthController.logout)

export default router
