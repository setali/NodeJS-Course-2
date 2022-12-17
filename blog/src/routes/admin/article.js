import express from 'express'
import ArticleController from '../../controllers/admin/article'

const router = express.Router()

router.get('/', ArticleController.list)
// router.get('/:id([0-9]+)', ArticleController.get)
router.get('/:id(\\d+)', ArticleController.get)
router.get('/create', ArticleController.create)
router.post('/', ArticleController.add)
router.get('/:id(\\d+)/edit', ArticleController.edit)
router.put('/:id(\\d+)', ArticleController.update)
router.delete('/:id(\\d+)', ArticleController.remove)

export default router

// RESTFUL API

// /article       GET        Show list articles
// /article/:id   GET        Show single article
// /article       POST       Create an article
// /article/:id   PUT        Update an article
// /article/:id   DELETE     Delete an article
