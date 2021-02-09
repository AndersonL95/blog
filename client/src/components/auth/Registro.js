import BgImage from './BgImage';
import {useState, useEffect} from 'react'
import {Helmet} from 'react-helmet';
import {useDispatch, useSelector} from 'react-redux';
import toast, {Toaster} from 'react-hot-toast';
import {postRegistro} from '../../store/asyncMethods/AuthMethods';

const Registro = (props) =>{
    const [state, setState] = useState({

        nome: '',
        email: '',
        senha: ''
    });
    const {loading, registerErrors, user} = useSelector((state) => state.AuthReducer);

    const dispatch = useDispatch();
    const handleInputs = (e) =>{
        setState({
            ...state,
            [e.target.name]: e.target.value,
        });
    };
    const registroUsuario = async (e) => {
        e.preventDefault();
        dispatch(postRegistro(state))
    };
    useEffect(() => {
		if (registerErrors && registerErrors.length > 0) {
			registerErrors.map((error) => toast.error(error.msg));
		}
       
    }, [registerErrors, user]);
    return (
        <>
            <Helmet>
                <title>Cadastro do usuario</title>
                <meta name="descrição" content="Cadastro do usuario" />
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
                            <form onSubmit ={registroUsuario}>
                            <h3 className="form-heading">Registro</h3>
                                <div className="group">
                                    <input type="text" name="nome" className="group_control" placeholder="Digite o nome" value={state.nome} onChange={handleInputs}/>
                                </div>
                                <div className="group">
                                    <input type="email" name="email" className="group_control" placeholder="Digite o email" value={state.email} onChange={handleInputs}/>
                                </div>
                                <div className="group">
                                    <input type="password" name="senha" className="group_control" placeholder="Crie uma senha!" value={state.senha} onChange={handleInputs}/>
                                </div>
                                <div className="group">
                                    <input type="submit" name="" className="btn btn-default btn-block" value={loading ? '...' : 'Registro'}/>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default Registro;