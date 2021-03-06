import {Helmet} from 'react-helmet';
import {useState, useEffect} from 'react';
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import {createAction} from '../store/asyncMethods/PostMethods';
import {useDispatch, useSelector} from 'react-redux'
import toast, {Toaster} from 'react-hot-toast';


const Create = (props) =>{
    const { createErrors, redirect } = useSelector((state) => state.PostReducer)
    const [currentImage, setCurentImage] = useState('Escolher Imagem')
    const [imagePreview, setImagePreview]=useState('');
    const dispatch = useDispatch();
    const {user:{_id, nome}} = useSelector((state) => state.AuthReducer)
    const fileHandle = e => {
        if(e.target.files.length!==0){
        setCurentImage(e.target.files[0].name)
        setState({
            ...state,
            [e.target.name]: e.target.files[0]
        })
        const reader = new FileReader();
        reader.onloadend =() => {
            setImagePreview(reader.result);
        }
        reader.readAsDataURL(e.target.files[0]);
        }
    };

    const [state, setState] = useState({
        title: '',
        description: '',
        image: ''
    });
    const handleDescription = (e) =>{
        setState({
            ...state,
            [e.target.name]: e.target.value,
        })

    }
    const [slug, setSlug] = useState('');
    const [slugButton, setSlugButton] = useState(false)
    const slugHandle = (e)  => {
        setSlugButton(true);
        setSlug(e.target.value)
    
    }
    const handleURL = e => {
        setSlug(slug.trim().slipt(' ').join('-'));
        e.preventDefault();
    }
    const handleInput = e => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
    })
    const createSlug = e.target.value.trim().split(' ').join('-');
    setSlug(createSlug);
}
    const [value, setValue] = useState('');
   const createPost = (e) =>{
       e.preventDefault();
       const {title, description, image} = state;
       const formData = new FormData();
       formData.append('title', title);
       formData.append('body', value);
       formData.append('image', image)
       formData.append('description', description)
       formData.append('slug', slug)
       formData.append('name', nome)
       formData.append('id', _id)
       dispatch(createAction(formData))
       
   };
   useEffect(() => {
    if(redirect){
        props.history.push('./dashboard');
    }   
    if (createErrors.length !== 0) {
        createErrors.map((err) => toast.error(err.msg));
    }
}, [createErrors, redirect]);
    
    return (
        <div className='create mt-100'>
            <Helmet>
                <title>Criando novo post</title>
                <meta name="descrição" content="Criação de post" />
            </Helmet>
            <Toaster 
                position='top-right' 
                reverseOrder={false}
                toastOptions={{
                style: {
                fontSize: '14px',
                },
                }}
            />
                <div className='container'>
                <form onSubmit={createPost}>
                    <div className='row ml-minus-15 mr-minus-15'>
                        <div className='col-6 p-15'>
                            <div className='card'>
                                <h3 className='card_h3'>Criando novo Post</h3>
                                
                                    <div className='group'>
                                        <label htmlFor='title'>Titulo do Post</label>
                                        <input type='text'
                                            name='title' 
                                            id='title'
                                            value={state.name}
                                            onChange={handleInput}
                                            className='group_control' 
                                            placeholder='Titulo do post...' />
                                    </div>
                                    <div className='group'>
                                        <label htmlFor='image'
                                            className='image_label'
                                            >{currentImage}
                                        </label>
                                        <input 
                                            type='file' 
                                            name='image'
                                            id='image' 
                                            onChange={fileHandle}  />
                                    </div>
                                    <div className='group'>
                                        <label htmlFor='body'>Corpo do Texto</label>
                                        <ReactQuill 
                                            theme='snow' 
                                            id='body'
                                            placeholder='Corpo do Texto'
                                            value={value} 
                                            onChange={setValue} />
                                    </div>
                                    <div className='group'>
                                        <label htmlFor='description'>Meta Descrição</label>
                                        <textarea 
                                            name='description' 
                                            id='description' 
                                            cols='30' 
                                            rows='10' 
                                            defaultValue={state.description}
                                            onChange={handleDescription}
                                            className='group_control'
                                            placeholder='Meta descirção...'
                                            maxLength='150'>
                                        </textarea>
                                    <p className='length'>  {state.description ? state.description.length : 0}</p> 
                                    </div>
                                </div>
                        </div>
                        <div className='col-6 p-15'>
                            <div className='card'>
                                <div className='group'>
                                    <label htmlFor='slug'>Post URL</label>
                                    <input 
                                        type='text' 
                                        name='slug' 
                                        id='slug' 
                                        value={slug}
                                        onChange={slugHandle}
                                        className='group_control' 
                                        placeholder='Post URL...' 
                                    />
                                </div>
                                <div className='group' >
                                    {slugButton ? (
                                    <button class='btn btn-default' onClick={handleURL}>Update Slug</button> 
                                    ) : ( 
                                        ''
                                    )}
                                </div>
                                <div className='group'>
                                    <div className='imagePreview'>
                                        {imagePreview ? <img src={imagePreview} /> : ''}
                                    </div>
                                </div>
                                <div className='group'>
                                        <input 
                                            type='submit' 
                                            value='Criando Post'
                                            className='btn btn-default btn-block' />
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
export default Create;