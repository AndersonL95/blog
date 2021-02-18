import { useEffect} from 'react';
import {Helmet} from 'react-helmet';
import { useSelector, useDispatch} from 'react-redux';
import {REDIRECT_FALSE, REMOVE_MENSSAGE} from '../store/tipos/PostTypes';
import toast, {Toaster} from 'react-hot-toast';

const Dashboard = () => {
    const {redirect, menssage} = useSelector((state) => state.PostReducer)
    const dispatch = useDispatch()
    useEffect(() => {
        if(redirect){
            dispatch({type: REDIRECT_FALSE});
        }
        if(menssage){
            toast.success(menssage);
            dispatch({type: REMOVE_MENSSAGE});
        }
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
        <h1>Dashboard</h1>
    </>
        )};
export default Dashboard;