import BgImage from './BgImage';
import React from 'react';
const Login = () =>{
    return (
        <>
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