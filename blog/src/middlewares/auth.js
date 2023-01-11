import jwt from 'jsonwebtoken'
import User from '../models/user'
import { BadRequestError } from '../utils/errors'

export default (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(' ')[1]

    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, (error, payload) => {
        if (error) {
          throw new BadRequestError(error)
        }

        User.find(payload.id).then(user => {
          req.user = user
          next()
        })
      })
    }
  } else {
    req.user = req.session.user
    next()
  }
}
