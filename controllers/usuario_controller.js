const {body, validationResult} = require('express-validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const User = require("../models/User")
require('dotenv').config();
const createToken = (user) => {
    return jwt.sign({user},process.env.SECRET,{
        expiresIn: '7d',
    });
};

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
                const token = createToken(user);
                return res.status(200).json({msg: 'Sua conta foi criada!', token});
            } catch(error) {
            return res.status(500).json({errors: error});
            
            }
        } catch (error) {
            return res.status(500).json({ errors: error });
    }
};
module.exports.validacaoLogin = [
    body("email").not().isEmpty().trim().withMessage("Preencha o campo!"),
    body("senha").not().isEmpty().withMessage("Preencha o campo!")
];
module.exports.login = async (req, res) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array})
    }
    const {email, senha} = req.body;
    try{
        const user = await User.findOne({email})
        if(user){
            const equiparar = await bcrypt.compare(senha, user.senha)
            if(equiparar){
                const token = createToken(user);
                return res.status(200).json({msg:'Login feito com sucesso!', token})
            }else{
                return res.status(401).json({errors:[{msg: "Senha incorreta!"}]})
            }
        }else{
            return res.status(404).json({errors:[{msg: "email não encontrado!"}]})
        }
    }catch (error){
        return res.status(500).json({errors: error})
    }
};