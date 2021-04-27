import {useState, useEffect} from 'react'
import SideBar from "./SideBar"
import {Helmet} from 'react-helmet';
import {useDispatch, useSelector} from 'react-redux'
import {useHistory} from 'react-router-dom'
import {updatePasswordAction} from '../store/asyncMethods/ProfileMethods'
import Loader from './Loader'
import {RESET_PROFILE_ERRORS} from '../store/tipos/ProfileTipos'
import toast, {Toaster} from 'react-hot-toast';



const ChangePassword = () => {
    const {push} = useHistory()
    const [state, setState] = useState({
        atual: '',
        novaSenha: '',
        userId: null
    })
    const dispatch = useDispatch()
    const {loading, redirect} = useSelector((state) => state.PostReducer)
    const {updateErrors} = useSelector((state) => state.updateName)
    const {
        user: {_id},
    } = useSelector((state) => state.AuthReducer)

    const updatePassword = (e) => {
        e.preventDefault()
        dispatch(updatePasswordAction({atual: state.atual, novaSenha: state.novaSenha, userId: _id}))
    }
    useEffect(() => {
        if(updateErrors.length !==0){
            updateErrors.map((error) => toast.error(error.msg))
            dispatch({type: RESET_PROFILE_ERRORS})
    }
}, [updateErrors])
useEffect(() => {
    if(redirect) {
        push('/dashboard');
    }
},[redirect]);
    return !loading ? (
        <div className='container mt-100'>
            <Helmet>
                <title>Alterando a senha</title>
                <meta name="description" content="Alterando a senha" />
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
                        <h3 className='card__h3'>Mudar a senha</h3>
                        <form onSubmit={updatePassword}>
                            <div className='group'>
                                <input 
                                    type='password' 
                                    name='' 
                                    className='group_control' 
                                    placeholder='Senha atual'
                                    onChange={(e) => setState({...state, atual: e.target.value})}
                                    value={state.atual}
                                />
                            </div>
                            <div className='group'>
                                <input 
                                    type='password' 
                                    name='' 
                                    className='group_control' 
                                    placeholder='Nova Senha'
                                    onChange={(e) => setState({...state, novaSenha: e.target.value})}
                                    value={state.novaSenha}
                                />
                            </div>
                            <div className='group'>
                                <input 
                                    type="submit" 
                                    value='Mudar a senha' 
                                    className='btn btn-default btn-block' 
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    ) : ( 
        <Loader />
    )
}
export default ChangePassword