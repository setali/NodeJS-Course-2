export function home (req, res) {
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
