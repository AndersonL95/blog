const {body, validationResult} = require('express-validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const User = require("../models/User")
require('dotenv').config();

module.exports.validacaoRegistro = [
    body("nome").not().isEmpty().trim().withMessage("Preencha o campo!"),
    body("email").not().isEmpty().trim().withMessage("Preencha o campo!"),
    body("senha").isLength({min:6}).withMessage("Preencha o campo com no minimo 6 caracteres!")
];
module.exports.registro = async (req, res) =>{
    const{nome, email, senha} = req.body;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array() });
    }
    try{
        const checkUser = await User.findOne({email})
            if(checkUser){
                return res.status(400).json({errors: [{msg: 'Email ja existe!'}]})
            }
            const salt = await bcrypt.genSalt(10)
            const hash = await bcrypt.hash(senha, salt);
            try{
                const user = await User.create({
                    nome,
                    email,
                    senha: hash,
                });
                const token = jwt.sign({user},process.env.SECRET,{
                    expiresIn: '7d',
                });
                return res.status(200).json({msg: 'Sua conta foi criada!', token});
            } catch(error) {
            return res.status(500).json({errors: error});
            
            }
        } catch (error) {
            return res.status(500).json({ errors: error });
    }
};