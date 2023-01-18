import multer from 'multer'
import { BadRequestError } from '../utils/errors'

const storage = multer.diskStorage({
  destination: './public/uploads/images',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname.replace(/\s/g, '_')}`)
  }
})

const VALID_MIME_TYPES = ['image/png', 'image/jpeg']

function fileFilter (req, file, cb) {
  if (VALID_MIME_TYPES.includes(file.mimetype)) {
    cb(null, true)
  } else {
    cb(new BadRequestError('Invalid type'), false)
  }
}

const uploader = multer({
  limits: {
    fileSize: 5 * 1024 * 1024
  },
  storage,
  fileFilter
})

export default uploader
