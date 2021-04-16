import {Link} from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux';
import {LOGOUT} from '../store/tipos/userTypes'; 
const Navbar = () =>{
    const {user} = useSelector(state => state.AuthReducer);
    const dispatch = useDispatch();
    const logout = () =>{
        localStorage.removeItem('myToken')
        dispatch({type: LOGOUT});
    }
    const Links = user ? (
        <div className="navbar_right">
            <li>
                <Link to ='/create'>Criar postagem</Link>
            </li>
            
            <li>
                <Link to= '/dashboard/1'>{user.nome}</Link>
            </li>
            <li>
                <span onClick={logout}>Logout</span>
            </li>
            </div> 
    ) : ( 
            <div className="navbar_right">
                
                    <li>
                        <Link to='/login'>Login</Link>
                    </li>
                    <li>
                        <Link to='/registro'>Registro</Link>   
                    </li>
                </div>
    );    
    return (
        <nav className="navbar">
            <div className="container">
                <div className="navbar_row">
                    <div className="navbar_left">
                        <Link to='/'>
                            <img src="/imagens/logo.png" alt="" />
                        </Link>
                    </div>
                   {Links}
                </div>
            </div>
        </nav>
    );
}
export default Navbar;