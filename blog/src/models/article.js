const articles = []

let autoIncrementId = 0

export default class Article {
  constructor ({ id, title, text }) {
    this.id = id
    this.title = title
    this.text = text
  }

  save () {
    if (this.id) {
      const article = articles.find(el => el.id === this.id)
      article.title = this.title
      article.text = this.text
    } else {
      articles.push({
        id: ++autoIncrementId,
        title: this.title,
        text: this.text
      })
    }
  }

  static findAll () {
    return articles
  }

  static find (id) {
    const data = articles.find(el => el.id === id)

    return data ? new Article(data) : undefined
  }

  static remove (id) {
    const index = articles.findIndex(el => el.id === id)

    if (index >= 0) {
      articles.splice(index, 1)
    }
  }

  remove () {
    if (this.id) {
      Article.remove(this.id)
    }
  }
}
