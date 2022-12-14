export default (err, req, res, next) => {
  console.log(err.message)
  res.status(400).send(err.message)
}
