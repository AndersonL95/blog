const formidable = require('formidable');
module.exports.createPost = (req , res) => {
    const form = formidable({multiples: true});
    form.parse(req, (error, fields, files) =>{
        const {title, body, description, slug, id, user,} = fields;
            const errors = [];
            if(title===''){
                errors.push({msg: 'Titulo é requerido'})
            }
            if(body===''){
                errors.push({msg: 'Corpo do texto é requerido'})
            }
            if(description===''){
                errors.push({msg: 'Descriçãa é requerida'})
            }
            if(slug===''){
                errors.push({msg: 'Post Url é requerido'})
            }
            if(errors.length !==0){
                return res.status(400).json({errors})
            }
            
    })
}