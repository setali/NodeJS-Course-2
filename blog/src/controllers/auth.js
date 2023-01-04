import {BadRequestError} from '../utils/errors'
import User from '../models/user'

class AuthController {
    loginPage(req, res) {
        res.render('auth/login', {
            title: 'Login'
        })
    }

    async login(req, res) {
        const {username, password} = req.body

        if (!username || !password) {
            throw new BadRequestError('username and password are required')
        }

        const user = await User.findOne({where: {username}})


        if (!user) {
            throw new BadRequestError('Credential error')
        }

        if (user.password !== password) {
            throw new BadRequestError('Credential error')
        }

        res.json(user)
    }

    registerPage(req, res) {
        res.render('auth/register', {
            title: 'Register'
        })
    }

    async register(req, res) {

        const {username, password, email} = req.body

        if (!username || !email || !password) {
            throw new BadRequestError('username and email and password are required!')
        }

        let user
        try {
            user = await User.create({username, email, password})
        }
        catch (error) {
            if (error.original.code === 'ER_DUP_ENTRY') {
                if (error.fields.username) {
                    throw new BadRequestError('username is duplicate')
                }
                else if (error.fields.email) {
                    throw new BadRequestError('email is duplicate')
                }
            }
        }

        res.json(user)
    }
}

export default new AuthController()