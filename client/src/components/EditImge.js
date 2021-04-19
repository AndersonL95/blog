import Helmet from 'react-helmet';
import {useState, useEffect} from 'react'
import {useParams, useHistory} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {updateImageAction} from '../store/asyncMethods/PostMethods'
import toast, {Toaster} from 'react-hot-toast';
import {RESET_UPDATE_IMAGE_ERRORS} from '../store/tipos/PostTypes'


const EditImage = () => {
    const{id} = useParams();
    const {push} = useHistory()
    const dispatch = useDispatch()
    const {updateImageErrors} = useSelector((state) => state.updateImage)
    const {redirect} = useSelector((state) => state.PostReducer)
    const [state, setState] = useState({
        image: '',
        imagePreview:'',
        imageName: 'Escolha a imagem',
    })
    const fileHandle = (e) => {
        if(e.target.files.length !== 0) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setState({...state, imagePreview: reader.result, image: e.target.files[0], imageName: e.target.files[0].name})
            }
            reader.readAsDataURL(e.target.files[0])
        }
    }
        const updateImage = (e) => {
            e.preventDefault();
            const formData = new FormData()
            formData.append('id', id)
            formData.append('image', state.image)
            dispatch(updateImageAction(formData))
        }
        useEffect(() => {
            if(updateImageErrors.length !==0){
                updateImageErrors.map((error) => toast.error(error.msg))
                dispatch({type: RESET_UPDATE_IMAGE_ERRORS})
            }
        },[updateImageErrors])
        useEffect(() => {
            if(redirect){
                push('/dashboard')
            }
        }, [redirect])
        return(
            <div className='container mt-100' >
                <Helmet>
                    <title>Editar imagem</title>
                    <meta name="description" content="Edição de imagem" />
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
                <div className='row'>
                    <div className='col-6'>
                        <div className='card'>
                            <h3 className='card__h3'>Editar imagem</h3>
                            <form onSubmit={updateImage}>
                                <div className='group'>
                                    <label htmlFor='image' className='image_label'>
                                        {state.imageName}
                                    </label>
                                    <input 
                                        type='file' 
                                        name='image'
                                        id='image' 
                                        onChange={fileHandle}  />
                                </div>
                                <div className='group'>
                                    <div className='imagePreview'>
                                        {state.imagePreview ? <img src={state.imagePreview}/> : ''}
                                    </div>
                                    <div className='group'>
                                    <input 
                                        type='submit' 
                                        value='Alterar Imagem'
                                        className='btn btn-default btn-block' />
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    
    }
export default EditImage;