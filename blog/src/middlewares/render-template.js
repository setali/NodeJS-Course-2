import path from 'path'
import fs from 'fs'

export default function renderTemplateMiddleware (req, res, next) {
  res.renderTemplate = function (filename, params) {
    const filePath = path.resolve(__basedir, 'views', `${filename}.html`)

    let view = fs.readFileSync(filePath, 'utf-8')

    const entries = Object.entries(params)

    entries.forEach(([key, value]) => {
      view = view.replace(`#${key}#`, value)
    })

    res.send(view)
  }

  next()
}
