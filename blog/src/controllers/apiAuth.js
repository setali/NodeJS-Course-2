import User from '../models/user'
import { BadRequestError } from '../utils/errors'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

class AuthController {
  async login (req, res) {
    const { username, password } = req.body

    const user = await User.scope('withPassword').findOne({
      where: { username }
    })

    if (!user) {
      throw new BadRequestError('Credential error')
    }

    if (!bcrypt.compareSync(password, user.password)) {
      throw new BadRequestError('Credential error')
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      {
        expiresIn: '10000s'
      }
    )

    res.json({
      ...user.dataValues,
      password: undefined,
      token
    })
  }

  user (req, res) {
    res.json(req.user)
  }
}

export default new AuthController()
