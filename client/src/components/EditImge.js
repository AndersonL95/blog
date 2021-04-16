import Helmet from 'react-helmet';
import {useState} from 'react'
import {useParams} from 'react-router-dom'
const EditImage = () => {
    const{id} = useParams();
    const[state, setState] = useState({
        image: '',
        imagePreview:'',
        imageName: 'Escolha a imagem',
    })
    const fileHandle = (e) => {
        if(e.target.files.length !== 0) {
            setState({...state, image: e.target.files[0], imageName: e.target.files[0].name})
        }
        const reader = new FileReader();
        reader.onloadend = () => {
            setState({...state, imagePreview: reader.result})
        }
        reader.readAsDataURL(e.target.files[0])
    }
    return(
        <div className='container mt-100' >
            <Helmet>
                <title>Editar imagem</title>
                <meta name="description" content="Edição de imagem" />
            </Helmet>
            <div className='row'>
                <div className='col-6'>
                    <div className='card'>
                        <h3 className='card__h3'>Editar imagem</h3>
                        <form>
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