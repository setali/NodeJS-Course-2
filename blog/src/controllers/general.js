export function home (req, res) {
  res.renderTemplate('index', {
    title: 'Home Page',
    content: 'This is homepage'
  })
}

export function about (req, res) {
  res.renderTemplate('index', {
    title: 'About us',
    content: 'This is About us page'
  })
}

export function contact (req, res) {
  res.renderTemplate('index', {
    title: 'Contact us',
    content: 'This is About us page'
  })
}
