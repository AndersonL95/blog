const app = require('express')
const router = app.Router();
const {registro, validacaoRegistro} = require('../controllers/usuario_controller')
router.post('/registro', validacaoRegistro, registro)
module.exports = router;