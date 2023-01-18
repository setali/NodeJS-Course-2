import express from 'express'
import ArticleController from '../../../controllers/admin/article'
import acl from '../../../middlewares/acl'
import { validate } from 'express-jsonschema'
import { articleSchema as schema } from '../../../validators/article'

const router = express.Router()

router.get('/', acl('WRITER'), ArticleController.list)
router.get('/:id(\\d+)', acl('WRITER'), ArticleController.get)
router.post('/', acl('WRITER'), validate(schema), ArticleController.add)
router.put(
  '/:id(\\d+)',
  acl('MODERATOR'),
  validate(schema),
  ArticleController.update
)
router.delete('/:id(\\d+)', acl('ADMIN'), ArticleController.remove)

export default router

// RESTFUL API

// /article       GET        Show list articles
// /article/:id   GET        Show single article
// /article       POST       Create an article
// /article/:id   PUT        Update an article
// /article/:id   DELETE     Delete an article
