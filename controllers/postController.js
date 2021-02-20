const formidable = require('formidable');
const { v4: uuidv4} = require('uuid');
const fs = require('fs');
const Post = require('../models/Post');
module.exports.createPost = (req , res) => {
    const form = formidable({multiples: true});
    form.parse(req, async (error, fields, files) =>{
        const {title, body, description, slug, id, nome} = fields;
            const errors = [];
            if(title===''){
                errors.push({msg: 'Titulo é requerido'});
            }
            if(body===''){
                errors.push({msg: 'Corpo do texto é requerido'});
            }
            if(description===''){
                errors.push({msg: 'Descriçãa é requerida'});
            }
            if(slug===''){
                errors.push({msg: 'Post Url é requerido'});
            }
            if(Object.keys(files).length ===0){
             errors.push({msg: 'Imagem é requerida'});
            }else {
                const {type} = files.image;
                const split = type.split('/')
                const extension = split[1];
                if(extension !== 'jpg' && extension !== 'jpeg' && extension !== 'png'){
                    errors.push({msg: `extenção ${extension} não é valida`})
                }else{
                    files.image.name = uuidv4() + '.' + extension;
                    
                }
            }
            const checkSlug = await Post.findOne({slug})
            if(checkSlug){
                errors.push({msg: 'Por favor selecione um unico slug?URL'})
            }
            if(errors.length !==0){
                return res.status(400).json({errors, files});
            }else{
                const newPath = __dirname + `/../client/public/imagens/${files.image.name}`
                    fs.copyFile(files.image.path, newPath, async (error) => {
                        if(!error){
                            try {
                                const response = await Post.create({
                                    title,
                                    body,
                                    image: files.image.name,
                                    description,
                                    slug,
                                    userName: 'nome',
                                    userId: id,
                                });
                                return res.status(200).json({msg: 'Seu post foi criado com suceso!',response,})
                            } catch (error) {
                                return res.status(500).json({errors:error, msg: error.menssage})
                                
                            }
                        }
                    })
            }
            
    })
}
module.exports.fetchPost = async (req, res) => {
    const id = req.params.id;
    try {
        const response = await Post.find({userId: id});
        return res.status(200).json({response: response});
    } catch (error) {
     return res.status(500).json({ errors: error, msg: error.menssage})   
    }
};