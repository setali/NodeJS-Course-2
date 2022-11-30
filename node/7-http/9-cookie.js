const http = require('http')

http
  .createServer((req, res) => {
    if (req.url === '/') {
      const entries =
        req.headers.cookie?.split(';').map(el => el.trim().split('=')) || []

      const cookies = Object.fromEntries(entries)

      console.log(cookies.counter)

      let counter = +cookies.counter || 0

      res.setHeader(
        'Set-Cookie',
        `counter=${++counter}; Max-Age=3000; HttpOnly; Secure`
      )
      res.end('salam')
    }
  })
  .listen(3000, () => console.log('Running'))
