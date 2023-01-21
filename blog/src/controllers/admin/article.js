import { BadRequestError, NotFoundError } from '../../utils/errors'
import Article from '../../models/article'
import log from '../../utils/logger'

class ArticleController {
  async list (req, res) {
    const data = await Article.findPaginate(req.query.page, {
      include: ['user']
    })

    res.json(data)
  }

  async get (req, res) {
    const { id } = req.params

    const article = await Article.find(+id, { include: ['user'] })

    if (!article) {
      throw new NotFoundError('Article not found')
    }

    res.json(article)
  }

  async add (req, res) {
    const { title, text, image } = req.body

    const article = new Article({ title, text, image, userId: req.user.id })

    await article.save()

    log({
      message: 'article:create',
      metadata: { article: article.dataValues, user: req.user.dataValues }
    })

    res.json(article)
  }

  async update (req, res) {
    const { id } = req.params

    const { title, text, image } = req.body

    const article = await Article.find(+id)

    if (!article) {
      throw new NotFoundError('Article not found')
    }

    article.title = title
    article.text = text
    article.image = image

    await article.save()

    log({
      message: 'article:update',
      metadata: { article: article.dataValues, user: req.user.dataValues }
    })

    res.json(article)
  }

  async remove (req, res) {
    const { id } = req.params

    const article = await Article.find(+id)

    if (!article) {
      throw new NotFoundError('Article not found')
    }

    await article.remove()

    log({
      message: 'article:remove',
      metadata: { article: article.dataValues, user: req.user.dataValues }
    })

    res.json(article)
  }
}

export default new ArticleController()
