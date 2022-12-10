function home (req, res) {
  res.send('Home Page')
}

function about (req, res) {
  res.send('About us')
}

function contact (req, res) {
  res.send('Contact us')
}

module.exports = {
  home,
  about,
  contact
}
