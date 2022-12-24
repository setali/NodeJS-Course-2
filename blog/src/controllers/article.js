import Article from '../models/article'
import { NotFoundError } from '../utils/errors'

class ArticleController {
  list (req, res) {
    const articles = Article.findAll()

    res.render('article/list', {
      title: 'Articles',
      articles
    })
  }

  get (req, res) {
    const { id } = req.params

    const article = Article.find(+id)

    if (!article) {
      throw new NotFoundError('Article not found')
    }

    res.render('article/show', {
      title: article.title,
      article
    })
  }
}

export default new ArticleController()
