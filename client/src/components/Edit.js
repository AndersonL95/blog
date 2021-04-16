import { useState, useEffect } from 'react';
import Helmet from 'react-helmet';
import { useParams } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPost } from '../store/asyncMethods/PostMethods';
import { POST_RESET } from '../store/tipos/PostTypes';

const Edit = () => {
	const { id } = useParams();
	const [value, setValue] = useState('');
	const [state, setState] = useState({
		title: '',
		description: '',
	});
	const dispatch = useDispatch();
	const { loading } = useSelector((state) => state.PostReducer);
	const { post, postStatus } = useSelector((state) => state.FetchPost);
	useEffect(() => {
		if (postStatus) {
			setState({
				title: post.title,
				description: post.description,
			});
			setValue(post.body);
			dispatch({ type: POST_RESET });
		} else {
			dispatch(fetchPost(id));
		}
	}, [post]);
    console.log(post)
    return(
        <div className='mt-100'>
            <Helmet>
                <title>Edit Post</title>
                <meta name="descrição" content="Edição do post" />
            </Helmet>
            <div className='container'>
                <div className='row'>
                    <div className='col-6'>
                        <div className='card'>
                            <h3 className='card_h3'>Editar Post</h3>
                            <form>
                                <div className='group'>
                                    <label htmlFor='title'>Titulo do Post</label>
                                    <input 
                                        type='text' 
                                        name='title' 
                                        id='title' 
                                        className='group_control' 
                                        placeholder='Titulo do Post' 
                                        value={state.title}
                                        onChange={(e) => setState({...state, title: e.target.value})}
                                    />
                                </div>
                                <div className='group'>
                                    <label htmlFor='body'>Corpo da postagem</label>
                                        <ReactQuill 
                                            theme='snow' 
                                            id='body'
                                            placeholder='Corpo do Texto'
                                            value={value} 
                                            onChange={setValue} 
                                        />
                                </div>
                                <div className='group'>
                                    <label htmlFor='description'>Meta Descrição</label>
                                        <textarea 
                                            name='description' 
                                            id='description' 
                                            cols='30' 
                                            rows='10' 
                                            defaultValue={state.description}
                                            onChange={(e) => 
                                                setState({...state, description: e.target.value})}
                                            className='group_control'
                                            placeholder='Meta descirção...'
                                            maxLength='150'>
                                        </textarea>
                                            <p className='length'>  
                                            {state.description ? state.description.length : 0}</p> 
                                </div>
                                <div className='group'>
                                    <input type='submit' value='Editar' className='btn btn-default btn-block'/>

                                </div>
                            </form>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
export default Edit;