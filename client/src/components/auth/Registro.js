import BgImage from './BgImage';
import React from 'react';
import {Helmet} from 'react-helmet';
const Registro = () =>{
    return (
        <React.Fragment>
            <Helmet>
                <title>Cadastro do usuario</title>
                <meta name="descrição" content="Cadastro do usuario" />
            </Helmet>
            <div className='row mt-80'>
                <div className="col-8">
                    <BgImage />
                </div>
                <div className="col-4">
                    <div className="account">
                        <div className="account_section">
                            <form>
                            <h3 className="form-heading">Registro</h3>
                                <div className="group">
                                    <input type="text" name="" className="group_control" placeholder="Digite o nome" />
                                </div>
                                <div className="group">
                                    <input type="email" name="" className="group_control" placeholder="Digite o email"/>
                                </div>
                                <div className="group">
                                    <input type="password" name="" className="group_control" placeholder="Crie uma senha!"/>
                                </div>
                                <div className="group">
                                    <input type="submit" name="" className="btn btn-default btn-block" value='Registro'/>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};
export default Registro;