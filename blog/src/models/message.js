import { sequelize, BaseModel, DataTypes } from '../config/database'
import User from './user'

class Message extends BaseModel {}

Message.init(
  {
    message: {
      type: DataTypes.TEXT,
      allowNull: null
    },
    from: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: 'id'
      }
    },
    to: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: 'id'
      }
    }
  },
  { sequelize, modelName: 'message' }
)

export default Message
