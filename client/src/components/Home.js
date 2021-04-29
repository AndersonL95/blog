import {Helmet} from "react-helmet";
import {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {homePosts} from '../store/asyncMethods/PostMethods'
import {useParams, Link} from 'react-router-dom'
import Loader from './Loader';
import moment from 'moment';
import 'moment/locale/pt';
import {htmlToText} from 'html-to-text'
import Pagination from './Pagination'

const Home = () =>{
    

    let {page} = useParams()
    if(page === undefined){
        page = 1
    }
    const {loading} = useSelector((state) => state.PostReducer)
    const {posts, count, perPage} = useSelector((state) => state.FetchPosts)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(homePosts(page))
    }, [page])
    

    return (
        <>
            

            <Helmet>
                <title>Titulo temporario</title>
                <meta name="description" content="Titulo temporario"/>
            </Helmet>
            <div className='container'>
                <div className='row mt-100' style={{marginBottom: '30px'}}>
                    <div className='col-8 home'>
                        {!loading ? (
                            posts.length > 0 ? (
                                posts.map((post) => (
                                    <div className='row post-style' key={post._id}>
                                        <div className='col-8'>
                                            <div className='post'>
                                                <div className='post_header'>
                                                    <div className='post_header_avator'>
                                                        {post.userName[0]}
                                                    </div>
                                                    <div className='post_header_user'>
                                                        <span>{post.userName} </span>
                                                        <span>{moment().format('l')}</span>
                                                    </div>
                                                </div>
                                                <div className='post_body'>
                                                    <h1 className='post_body_title'><Link to={`/details/${post._id}`}>{post.title}</Link></h1>
                                                </div>
                                                <div className='post_body_details'>
                                                    {htmlToText(post.body.slice(0, 500))}
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-4'>
                                            <div className='post_image'>
                                                <img src={`/imagens/${post.image}`} alt={post.image} />
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                'No posts'
                            )
                        ) : (
                            <Loader />
                        )}
                    </div>
                </div>
                <div className='row'>
                    <div className='col-9'>
                    <Pagination path='home' page={page} perPage={perPage} count={count} />
                </div>
                </div>
            </div>

        </>
    )
}
export default Home;