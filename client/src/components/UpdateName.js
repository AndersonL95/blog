import {Helmet} from 'react-helmet';
import {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {updateNameAction} from '../store/asyncMethods/ProfileMethods'
import toast, {Toaster} from 'react-hot-toast';
import { useHistory } from 'react-router-dom';
import {RESET_PROFILE_ERRORS} from '../store/tipos/ProfileTipos'
import SideBar from './SideBar'


const UpdateName = () => {
    const { push } = useHistory()
    const [userName, setUserName] = useState('')
    const {
        user: {nome, _id},
    } = useSelector((user) => user.AuthReducer)
    const {loading, redirect} = useSelector((state) => state.PostReducer)
    const {updateErrors} = useSelector((state) => state.updateName)
    const dispatch = useDispatch()
    const updateNameMethod = (e) => {
		e.preventDefault();
		dispatch(updateNameAction({ name: userName, id: _id }));
    };
    useEffect(() => {
        setUserName(nome)
    }, [])
    useEffect(() => {
        if(updateErrors.length !==0){
            updateErrors.map((error) => toast.error(error.msg))
            dispatch({type: RESET_PROFILE_ERRORS})
        }
    }, [updateErrors]);
    useEffect(() => {
		if(redirect) {
			push('/dashboard');
		}
	},[redirect]);
    return (
        <div className='container mt-100'>
            <Helmet>
                <title>Alterando nome</title>
                <meta name="description" content="Alterando o nome" />
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
            <div className='row ml-minus-15 mr-minus-15'>
                <div className='col-3 p-15'>
                    <SideBar />
                </div>
                <div className='col-9 p-15'>
                    <div className='card'>
                        <h3 className='card__h3'>Mudar Nome</h3>
						<form onSubmit={updateNameMethod}>
                            <div className='group'>
                                <input 
                                    type='text'
                                    name='' 
                                    className='group_control' 
                                    placeholder='Nome...' 
                                    onChange={(e) => setUserName(e.target.value)} 
                                    value={userName}
                                />
                            </div>
                            <div className='group'>
                                <input 
                                    type='submit' 
                                    value='Mudar Nome'
                                    className='btn btn-default btn-block' 
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default UpdateName