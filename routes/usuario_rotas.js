const app = require('express')
const router = app.Router();
const {registro, validacaoRegistro, login, validacaoLogin} = require('../controllers/usuario_controller')



router.post('/registro', validacaoRegistro, registro)
router.post('/login', login, validacaoLogin)
module.exports = router;