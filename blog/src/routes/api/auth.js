import express from 'express'
import authController from '../../controllers/apiAuth'
import { loginSchema as schema } from '../../validators/login'
import { validate } from 'express-jsonschema'

const router = express.Router()

router.use('/login', validate(schema), authController.login)
router.use('/user', authController.user)

export default router
