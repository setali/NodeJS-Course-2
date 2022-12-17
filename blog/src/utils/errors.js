export class NotFoundError extends Error {
  status = 404

  constructor (message = 'Not Found') {
    super(message)
  }
}

export class NotAUthorizeError extends Error {
  status = 403

  constructor (message = 'Not Authorize') {
    super(message)
  }
}

export class BadRequestError extends Error {
  status = 400

  constructor (message = 'Bad Request') {
    super(message)
  }
}
