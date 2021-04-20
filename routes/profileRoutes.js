const express = require('express')
const router = express.Router()
const {updateName} = require('../controllers/profileController')
const auth = require('../utils/auth')

router.post('updateName', auth, updateName )
module.exports = router