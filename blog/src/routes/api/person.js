import express from 'express'
import PersonController from '../../controllers/person'
import acl from '../../middlewares/acl'

const router = express.Router()

router.get('/', acl('USER'), PersonController.list)

export default router