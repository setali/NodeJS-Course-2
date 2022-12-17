class ArticleController {
  list (req, res) {
    res.render('admin/article/list', {
      title: 'Article list',
      articles: []
    })
  }

  create (req, res) {
    res.render('admin/article/create', {
      title: 'Create Article'
    })
  }

  add (req, res) {
    console.log(req.body)
    res.send('salam')
  }
}

export default new ArticleController()
