export default (err, req, res, next) => {
  console.log(err.message)
  console.log(err.status)

  const status = err.status || 500
  const message =
    status < 500 || process.env.NODE_ENV === 'development'
      ? err.message
      : 'Server Error, Please call to admin'

  res.status(status).render('error', {
    title: `Error: ${status}`,
    content: message,
    user: req.user
  })
}
