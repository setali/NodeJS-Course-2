export class BadRequestError extends Error {
  status = 400

  constructor (message = 'Bad Request') {
    super(message)
  }
}

export class UnauthorizeError extends Error {
  status = 401

  constructor (message = 'Unauthorize') {
    super(message)
  }
}

export class ForbiddenError extends Error {
  status = 403

  constructor (message = 'Forbidden') {
    super(message)
  }
}

export class NotFoundError extends Error {
  status = 404

  constructor (message = 'Not Found') {
    super(message)
  }
}
