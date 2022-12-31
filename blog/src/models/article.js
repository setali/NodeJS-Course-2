import { sequelize, BaseModel, DataTypes } from '../config/database'

class Article extends BaseModel {}

Article.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: 'article'
  }
)

export default Article
