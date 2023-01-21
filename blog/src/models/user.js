import { sequelize, BaseModel, DataTypes } from '../config/database'
import Article from './article'

class User extends BaseModel {}

User.init(
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false
      // unique: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
      // unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'USER'
    }
  },
  {
    sequelize,
    modelName: 'user',
    defaultScope: {
      attributes: {
        exclude: ['password']
      }
    },
    scopes: {
      withPassword: {}
    }
  }
)

User.hasMany(Article)
Article.belongsTo(User)

export default User
