import express from 'express'
import ArticleController from '../../controllers/admin/article'

const router = express.Router()

router.get('/', ArticleController.list)
router.get('/create', ArticleController.create)
router.post('/', ArticleController.add)

export default router
