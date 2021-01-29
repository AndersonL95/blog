const {body, validationResult} = require('express-validator')
module.exports.validacaoRegistro = [
    body("nome").not().isEmpty().trim().withMessage("Preencha o campo!"),
    body("email").not().isEmpty().trim().withMessage("Preencha o campo!"),
    body("senha").isLength({min:6}).withMessage("Preencha o campo com no minimo 6 caracteres!")
];
module.exports.registro = (req, res) =>{
    const{nome, email, senha} = req.body;
    const error = validationResult(req);
    if(!error.isEmpty()){
        res.json(error.array())
    }else{
        res.json('você vai sair!')
    }
}