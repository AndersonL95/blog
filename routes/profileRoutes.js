const express = require('express')
const router = express.Router()
const {updateName, updatePassword, updatePasswordValidations} = require('../controllers/profileController')
const auth = require('../utils/auth')

router.post('/updateName', auth, updateName)
router.post('/updatePassword', [auth, updatePasswordValidations], updatePassword,)
module.exports = router