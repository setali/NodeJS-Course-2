const { home, about, contact } = require('./controller')
const express = require('express')

const router = express.Router()

router.get('/', home)
router.get('/about', about)
router.get('/contact', contact)

module.exports = router
