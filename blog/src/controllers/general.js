import { NotFoundError, BadRequestError } from '../utils/errors'

export function home (req, res) {
  console.log(ali)
  // throw new BadRequestError()

  res.render('index', {
    title: 'Home Page',
    content: 'This is homepage'
  })
}

export function about (req, res) {
  res.render('about', {
    title: 'About us',
    content: 'This is About us page'
  })
}

export function contact (req, res) {
  res.render('contact', {
    title: 'Contact us',
    content: 'This is Contact us page'
  })
}
