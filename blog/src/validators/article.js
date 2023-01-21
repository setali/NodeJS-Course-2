export const articleSchema = {
  body: {
    type: 'object',
    properties: {
      title: {
        type: 'string',
        required: true,
        minLength: 5,
        maxLength: 255
      },
      text: {
        type: 'string',
        required: true
      },
      image: {
        type: 'string',
        required: true,
        maxLength: 255
      }
    }
  }
}
