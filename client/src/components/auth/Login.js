import BgImage from './BgImage';
import React from 'react';
import {Helmet} from 'react-helmet';
const Login = () =>{
    return (
        <>
            <Helmet>
                <title>Login do usuario</title>
                <meta name="descrição" content="Login do usuario" />
            </Helmet>

            <div className='row mt-80'>
                <div className="col-8">
                    <BgImage />
                </div>
                <div className="col-4"></div>
                    <div className="account">
                        <div className="account_section">
                            <form>
                                    
                                <div className="group">
                                    <h3 className="form-heading">Login</h3>
                                    <input type="email" name="" className="group_control" placeholder="Digite o email"/>
                                </div>
                                <div className="group">
                                    <input type="password" name="" className="group_control" placeholder="Crie uma senha!"/>
                                </div>
                                <div className="group">
                                    <input type="submit" name="" className="btn btn-default btn-block" value='Login'/>
                                </div>
                            </form>
                        </div>
                    </div>
            </div>
        </>
    );
};
export default Login;