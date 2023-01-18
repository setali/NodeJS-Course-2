import express from 'express'
import fileController from '../../controllers/file'
import acl from '../../middlewares/acl'
import uploader from '../../middlewares/uploader'

const router = express.Router()

router.use(
  '/upload',
  acl('WRITER'),
  uploader.single('file'),
  fileController.upload
)

export default router
