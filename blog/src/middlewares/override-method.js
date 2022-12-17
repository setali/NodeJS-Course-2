import methodOverride from 'method-override'

export default methodOverride((req, res) => {
  if (
    req.method === 'POST' &&
    typeof req.body === 'object' &&
    req.body._method
  ) {

    const method = req.body._method

    delete req.body._method

    return method
  }
})
