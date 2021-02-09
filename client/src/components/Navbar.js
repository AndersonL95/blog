import {Link} from "react-router-dom";
import {useSelector} from 'react-redux';
const Navbar = () =>{
    const {user} = useSelector(state => state.AuthReducer);
    const Links = user ? <div className="navbar_right">
    <li>
        <Link to ='/'>{user.nome}</Link>
    </li>
    <li>
        <Link to='/logout'>Logout</Link>
    </li>
    </div> : <div className="navbar_right">
                        <li>
                            <Link to='/login'>Login</Link>
                        </li>
                        <li>
                            <Link to='/registro'>Registro</Link>   
                         </li>
                         </div>;    
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