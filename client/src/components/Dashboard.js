import { useEffect} from 'react';
import {Helmet} from 'react-helmet';
import { useSelector, useDispatch} from 'react-redux';
import {REDIRECT_FALSE, REMOVE_MENSSAGE} from '../store/tipos/PostTypes';
import toast, {Toaster} from 'react-hot-toast';
import {fetchPost} from '../store/asyncMethods/PostMethods';
import {Link} from 'react-router-dom';
import {BsPencil, BsArchive} from 'react-icons/bs';
import Loader from './auth/Loader';
import SideBar from './SideBar';

const Dashboard = () => {
    const {redirect, menssage, loading} = useSelector((state) => state.PostReducer)
    const { user: {_id},} = useSelector((state) => state.AuthReducer);
    const {posts} = useSelector(state => state.FetchPost)
    console.log('meus posts:', posts)
    const dispatch = useDispatch()
    useEffect(() => {
        if(redirect){
            dispatch({type: REDIRECT_FALSE});
        }
        if(menssage){
            toast.success(menssage);
            dispatch({type: REMOVE_MENSSAGE});
        }
        dispatch(fetchPost(_id));
    },[])
    return (
    <>
        <Helmet>
            <title>Dashboard</title>
            <meta name="descrição" content="Dashboard do usuario" />
        </Helmet>
        <Toaster 
            position='top-center' 
            reverseOrder={false}
            toastOptions={{
            style: {
            fontSize: '14px',
            },
            }}
        />
        <div className="container mt-100">
            <div className="row ml-minus-15 mr-minus-15">
                <div className='col-3 p-15'>
                    <SideBar />
                </div>
                <div className='col-9 p-15'>
                    {!loading ?(
                         posts.length > 0 ?(
                            posts.map((post) => (
                                <div className='dashboard_posts'key={post._id}>
                                    <div className='dashboard_posts_title'>
                                        <Link to='/'>{post.title}</Link>
                                </div>
                                <div className='dashboard_posts_links'>
                                    <Link to ='/'><BsPencil className='icon'  /></Link>
                                    <BsArchive className='icon'/>
                                </div>
                            </div>
                           
                        ))
                    ) : (
                        'Você não tem nenhuma postagem'
                    )
                    ) : (
                         <Loader />
                    )}
                </div>
            </div>
        </div>
    </>
        )};
export default Dashboard;