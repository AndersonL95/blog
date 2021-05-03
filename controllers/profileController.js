const User = require('../models/User')
const jwt = require('jsonwebtoken')
const {body, validationResult} = require('express-validator')
const bcrypt = require('bcrypt')

module.exports.updateName = async (req, res) => {
    const { name, id} = req.body
  if(name === '') {
      return res.status(400).json({ errors: [{msg: 'Digite o nome' }]})
  }else {
      try {
          const user = await User.findOneAndUpdate(
            {_id: id}, 
            {nome: name}, 
            {new: true}
          );
          const token = jwt.sign({user},process.env.SECRET,{
            expiresIn: '7d',
          });
          return res.status(200).json({token, msg: 'Seu nome foi alterado com sucesso'})
      } catch (error) {
          return res.status(500).json({ errors });
        
      }
  }
}
module.exports.updatePasswordValidations = [
	body('atual')
		.not()
		.isEmpty()
		.trim()
		.withMessage('Digite a senha atual'),
	body('novaSenha')
		.isLength({ min: 6 })
		.withMessage('A senha precisa ter 6 digitos ou mais...'),
];
module.exports.updatePassword = async (req, res) => {
	const { atual, novaSenha, userId } = req.body;
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	} else {
		const user = await User.findOne({ _id: userId });
		if (user) {
			const matched = await bcrypt.compare(atual, user.senha);
			if (!matched) {
				return res
					.status(400)
					.json({ errors: [{ msg: 'Digite a senha atual' }] });
			} else {
				try {
					const salt = await bcrypt.genSalt(10);
					const hash = await bcrypt.hash(novaSenha, salt);
					const newUser = await User.findOneAndUpdate(
						{ _id: user },
						{ senha: hash },
						{ new: true }
					);
					return res
						.status(200)
						.json({ msg: 'Senha alterada com sucesso!' });
				} catch (error) {
					return res.status(500).json({ errors });
          }
        }
      }
    }
}
