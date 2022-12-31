import { BaseModel, create } from '../store'

class Article extends BaseModel {
  static fields = [
    { name: 'title', type: 'VARCHAR(255)', nullable: false },
    { name: 'text', type: 'TEXT', nullable: false }
  ]

  static entityName = 'articles'
}

export default create(Article)
