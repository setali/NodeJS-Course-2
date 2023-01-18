import { ForbiddenError, UnauthorizeError } from '../utils/errors'
import { ROLE_HIERARCHY } from '../config/roles'

export default function acl (roleName) {
  return (req, res, next) => {
    if (!req.user) {
      throw new UnauthorizeError()
    }

    const { role } = req.user

    if (role === roleName || ROLE_HIERARCHY[role]?.includes(roleName)) {
      return next()
    }

    throw new ForbiddenError()
  }
}
