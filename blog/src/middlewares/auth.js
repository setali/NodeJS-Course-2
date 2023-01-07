export default (req, res, next) => {
  req.user = req.session.user

  next()
}
