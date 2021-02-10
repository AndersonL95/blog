import BgImage from './BgImage';
import React from 'react';
import {useState, useEffect} from 'react';
import {Helmet} from 'react-helmet';
import {postLogin} from '../../store/asyncMethods/AuthMethods';
import {useSelector ,useDispatch} from 'react-redux'
import toast, {Toaster} from 'react-hot-toast';


const Login = () =>{
    const dispatch = useDispatch();
    const { loginErrors, loading} = useSelector((state) => state.AuthReducer);
    const [state, setState] = useState({
        email: '',
        senha: ''
    })
    const handleInputs = e =>{
        setState({
            ...state,
            [e.target.name]: e.target.value,
        
        })
    };
    const userLogin = (e) => {
        e.preventDefault();
        dispatch(postLogin(state));
    }
    useEffect(()=>{
        if(loginErrors.length > 0){
            loginErrors.map((error) => toast.error(error.msg))
        }
    },[loginErrors]);
    return (
        <>
            <Helmet>
                <title>Login do usuario</title>
                <meta name="descrição" content="Login do usuario" />
            </Helmet>

            <div className='row mt-80'>
                <div className="col-8">
                    <BgImage />
                    <Toaster 
                    position='top-right' 
                    reverseOrder={false}
                    toastOptions={{
                        style: {
                           fontSize: '14px',
                        },
                    }}
                    />
                </div>
                <div className="col-4">
                    <div className="account">
                        <div className="account_section">
                            <form onSubmit={userLogin}>
                                    
                                <div className="group">
                                    <h3 className="form-heading">Login</h3>
                                    <input type="email" name="email"value={state.email} onChange={handleInputs} className="group_control" placeholder="Digite o email"/>
                                </div>
                                <div className="group">
                                    <input type="password" name="senha"value={state.senha} onChange={handleInputs} className="group_control" placeholder="Digite sua senha!"/>
                                </div>
                                <div className="group">
                                    <input type="submit" name="" className="btn btn-default btn-block" value={loading ? '...' : 'Login'}/>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default Login;