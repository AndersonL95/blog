import {useEffect} from 'react'
import {useParams, Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {postDetails} from '../store/asyncMethods/PostMethods'
import Loader from './Loader'
import moment from 'moment'
import 'moment/locale/pt-br'
import {htmlToText} from 'html-to-text'


const Details = () => {
    const { id } = useParams()
    const {loading, details} = useSelector(state => state.PostReducer)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(postDetails(id))
    }, [id])
    return (
        <div className='container'>
            <div className='row mt-100'>
                <div className='col-8'>
                    {!loading ? (
                        <div className='post_details'>
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
                            <h1 className='post_body_title'>
                                <Link to={`/details/${details._id}`}
                                >{details.title}</Link>
                            </h1>
                        </div>
                        <div className='post_body_details'>
                            {htmlToText(details.body)}
                        </div>
                        </div>
                    ):(
                         <Loader />
                    )}
                </div>
            </div>
        </div>        
    )
}
export default Details