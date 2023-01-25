import User from '../models/user'
import { Op } from 'sequelize'

class PersonController {
  async list (req, res) {
    const { user } = req
    const users = await User.findAll({ where: { id: { [Op.ne]: user.id } } })

    res.json(users)
  }
}

export default new PersonController()
