class FileController {
  upload (req, res) {
    res.json(req.file.path.split('/').splice(1).join('/'))
  }
}

export default new FileController()
