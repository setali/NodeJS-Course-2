import { BadRequestError } from '../utils/errors'
import User from '../models/user'
import bcrypt from 'bcrypt'
import log from '../utils/logger'

class AuthController {
  loginPage (req, res) {
    if (req.user) {
      res.redirect('/')
    }

    res.render('auth/login', {
      title: 'Login'
    })
  }

  async login (req, res) {
    if (req.user) {
      res.redirect('/')
    }

    const { username, password } = req.body

    if (!username || !password) {
      throw new BadRequestError('username and password are required')
    }

    const user = await User.scope('withPassword').findOne({
      where: { username }
    })

    if (!user) {
      throw new BadRequestError('Credential error')
    }

    if (!bcrypt.compareSync(password, user.password)) {
      throw new BadRequestError('Credential error')
    }

    delete user.set('password', undefined)

    req.session.user = user

    log({ message: 'user:login', metadata: { user } })

    res.redirect('/')
  }

  registerPage (req, res) {
    if (req.user) {
      res.redirect('/')
    }

    res.render('auth/register', {
      title: 'Register'
    })
  }

  async register (req, res) {
    if (req.user) {
      res.redirect('/')
    }

    const { username, password, email } = req.body

    if (!username || !email || !password) {
      throw new BadRequestError('username and email and password are required!')
    }

    let user
    try {
      const hashedPassword = bcrypt.hashSync(password, 12)
      user = await User.create({ username, email, password: hashedPassword })
    } catch (error) {
      console.log(error)
      if (error.original.code === 'ER_DUP_ENTRY') {
        if (error.fields.username) {
          throw new BadRequestError('username is duplicate')
        } else if (error.fields.email) {
          throw new BadRequestError('email is duplicate')
        }
      }
    }

    res.redirect('/login')
  }

  logout (req, res) {
    req.session.destroy(error => {
      if (!error) {
        res.redirect(req.headers.referer)
      }
    })
  }
}

export default new AuthController()
