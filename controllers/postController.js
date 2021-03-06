const formidable = require('formidable');
const { v4: uuidv4} = require('uuid');
const fs = require('fs');
const Post = require('../models/Post');
const {body, validationResult} = require("express-validator");
const {htmlToText} = require('html-to-text');
const CommentSchema = require('../models/Comment')

module.exports.createPost = (req , res) => {
    const form = formidable({multiples: true});
    form.parse(req, async (error, fields, files) =>{
        const {title, body, description, slug, id, name} = fields;
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
                                    userName: name,
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
module.exports.fetchPosts = async (req, res) => {
    const id = req.params.id;
    const page = req.params.page;
    const perPage = 3;
    const skip = (page - 1) * perPage;
    try {
        const count = await Post.find({userId: id}).countDocuments();
        const response = await Post.find({userId: id}).skip(skip).limit(perPage).sort({updateAt: -1});
        return res.status(200).json({response: response, count, perPage});
    } catch (error) {
     return res.status(500).json({ errors: error, msg: error.message})   
    }
};
module.exports.fetchPost = async (req, res) =>{ 
    const id = req.params.id;
    try {
        const post = await Post.findOne({_id: id})
        return res.status(200).json({post})
    } catch (error) {
        return res.status(500).json({ errors: error, msg: error.message})   

    }
};
module.exports.updateValidations = [
    body('title').notEmpty().trim().withMessage('Titulo é requerido!'),
    body('body').notEmpty().trim().custom(value =>{
        let bodyValue = value.replace(/\n/g, '');
        if(htmlToText(bodyValue).trim().length === 0){
            return false
        }else{
            return true
        }
    }).withMessage('Texto é requedio!'),
    body('description').notEmpty().trim().withMessage('Descrição é requerida!')

]
module.exports.updatePost = async(req, res) => {
    const {title, body, description, id} = req.body
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array()})
    }else {
        try {
            const response = await Post.findByIdAndUpdate(id, {
                title,
                body,
                description,
            })
            return res.status(200).json({msg: 'Seu post foi alterado com Sucesso!'})
        } catch (error) {
            return res.status(500).json({ errors: error, msg: error.message})   

        }
    }
}
module.exports.updateImage = (req, res) => {
    const form = formidable({multiples: true})
        form.parse(req, (errors, fields, files) =>{
            const {id} = fields
            const imageErrors = []
            if(Object.keys(files).length === 0){
                imageErrors.push({msg: 'Por favor insira uma imagem!'})
            }else{
                const {type} = files.image
                const split = type.split('/')
                const extension = split[1].toLowerCase()
                if(extension !== 'jpg' && extension !== 'jpeg' && extension !== 'png'){
                    imageErrors.push({msg: `${extension} essa extenção não é valida!`})
                }else{
                    files.image.name = uuidv4() + '.' + extension;

                }
            }
            if(imageErrors.length !==0){
                return res.status(400).json({ errors: imageErrors})
            }else{
                const newPath = __dirname + `/../client/public/imagens/${files.image.name}`
                fs.copyFile(files.image.path, newPath, async(error) => {
                    if(!error){
                        try {
                            const response = await Post.findByIdAndUpdate(id, {image: files.image.name})
                            return res.status(200).json({msg: 'Sua imagem foi alterada com sucesso!'})
                        } catch (error) {
                            return res.status(500).json({ errors: error, msg: error.message})   

                            
                        }
                    }
                })
            }
        })
}
module.exports.deletePost = async(req, res) => {
    const id = req.params.id
    try {
        const response = await Post.findByIdAndRemove(id)
        return res.status(200).json({msg: 'Seu Post foi apagado com sucesso!'})
    } catch (error) {
        return res.status(500).json({ errors: error, msg: error.message})   

    }
}
module.exports.home = async(req, res) => {
    page = req.params.page
    const perPage = 6
    const skip = (page -1) * perPage
    try {
        const count = await Post.find({}).countDocuments()
        const posts = await Post.find({}).skip(skip).limit(perPage).sort({updateAt: -1})
        return res.status(200).json({response: posts, count, perPage})
    } catch (error) {
        return res.status(500).json({ errors: error, msg: error.message})   

        
    }
}
module.exports.postDetails = async (req, res) => {
    const id = req.params.id
    try {
        const post = await Post.findOne({slug: id})
        const comments = await CommentSchema.find({postId: post._id}).sort({
            updateAt: -1,
        })
        return res.status(200).json({post, comments})
    } catch (error) {
        return res.status(500).json({ errors: error, msg: error.message})   

    }
}
module.exports.postComment = async (req, res) => {
	const {id, comment, userName} = req.body
	try {
		const response = await CommentSchema.create({
            postId: id,
            comment,
            userName,
        })
        return res.status(200).json({msg: 'Seu comentario foi publicado...'})
	} catch (error) {
        return res.status(500).json({ errors: error, msg: error.message})   

	}
}