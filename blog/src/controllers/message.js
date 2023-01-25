import Message from '../models/message'
import { Op } from 'sequelize'

class MessageController {
  async list (req, res) {
    const { user } = req
    const { selectedUser, messageId } = req.query

    const ids = [selectedUser, user.id]

    const query = {
      where: { from: { [Op.in]: ids }, to: { [Op.in]: ids } },
      limit: 10,
      order: [['id', 'DESC']]
    }

    if (messageId) {
      query.where.id = { [Op.lt]: messageId }
    }

    const message = await Message.findAll(query)

    res.json(message)
  }
}

export default new MessageController()
