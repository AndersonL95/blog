const User = require('../models/User')
const jwt = require('jsonwebtoken')

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