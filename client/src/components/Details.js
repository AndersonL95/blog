import {useEffect, useState} from 'react'
import {useParams, Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {postDetails} from '../store/asyncMethods/PostMethods'
import Loader from './Loader'
import Helmet from 'react-helmet'
import moment from 'moment'
import 'moment/locale/pt-br'
import {htmlToText} from 'html-to-text'


const Details = () => {
    const { id } = useParams();
    const [comment, setComment] = useState('')
    const { user } = useSelector((state) => state.AuthReducer)
    const {loading, details} = useSelector((state) => state.PostReducer)
    const dispatch = useDispatch()
    const addComment = e => {
        e.preventDefault()
        console.log(comment)
    }
    useEffect(() => {
        dispatch(postDetails(id))
    }, [id])
    
    return (
        <div className='container'>
            <div className='row mt-100'>
                <div className='col-8'>
                    {!loading ? (
                        <div className='post_details'>
                            <Helmet>
                                <title>{details.title}</title>
                            </Helmet>
                            <div className='post_header'>
                                <div className='post_header_avator'>
                                    {details.userName ? details.userName[0] : ''}
                                </div>
                                <div className='post_header_user'>
                                    <span>{details.userName} </span>
                                    <span>{moment().format('l')}</span>
                                </div>
                            </div>
                            <div className='post_body'>
                                <h1 className='post_body_title'>{details.title}</h1>
                                <div className='post_body_details'>
                                    {htmlToText(details.body)}
                                </div>
                                <div className='post_body_image'>
                                    <img src={`/imagens/${details.image}`} alt={details.image} />
                                </div>
                            </div>
                            {user ? <div className='post_comment'>
                                <form onSubmit={addComment}>
                                    <input 
                                        type='text' 
                                        className='group_control' 
                                        placeholder='Comentar'
                                        onChange={(e) => setComment(e.target.value)}
                                        value={comment}
                                    />
                                    <div className='group'>
                                        <input 
                                            type='submit' 
                                            value='Comentar' 
                                            className='btn btn-default'
                                        />
                                    </div>
                                </form>
                            </div>: ''}
                        </div>
                    ) : (
                        <Loader />
                    )}
                </div>
            </div>
        </div>        
    )
}
export default Details