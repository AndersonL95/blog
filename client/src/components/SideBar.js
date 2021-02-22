import { Link } from 'react-router-dom';
const SideBar = () =>{
    return(
        <div className='sidebar'>
            <div className='sidebar_element'>
                <h3>Configurações</h3>
            </div>
            <div className='sidebar_element'>
                <Link>Mude a senha</Link>
            </div>
            
            <div className='sidebar_element'>
                <Link>Mude o nome</Link>
            </div>
        </div>
    )
}
export default SideBar;