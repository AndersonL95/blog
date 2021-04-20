import {Helmet} from 'react-helmet';
import {useState, useEffect} from 'react'
import {useSelector, useDispacth} from 'react-redux'
import SideBar from './SideBar'
const UpdateName = () => {
    const [userName, setUserName] = useState('')
    const {
        user: {name},
    } = useSelector((user) => user.AuthReducer)
    useEffect(() => {
        setUserName(name)
    }, [])
    return (
        <div className='container mt-100'>
            <Helmet>
                <title>Alterando nome</title>
                <meta name="descrição" content="Alterando o nome" />
            </Helmet>
            <div className='row ml-minus-15 mr-minus-15'>
                <div className='col-3 p-15'>
                    <SideBar />
                </div>
                <div className='col-9 p-15'>
                    <div className='card'>
                        <h3 className='card__h3'>Mudar Nome</h3>
                        <form>
                            <div className='group'>
                                <input type='text' 
                                name='' 
                                className='group_control' 
                                placeholder='Nome...' 
                                onchange={(e) => setUserName(e.target.value)} value={userName}/>
                            </div>
                            <div className='group'>
                                <input 
                                    type='submit' 
                                    value='Alterar o Nome'
                                    className='btn btn-default btn-block' />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default UpdateName