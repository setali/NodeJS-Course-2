export const loginSchema = {
  body: {
    type: 'object',
    properties: {
      username: {
        type: 'string',
        required: true
      },
      password: {
        type: 'string',
        required: true
      }
    }
  }
}
