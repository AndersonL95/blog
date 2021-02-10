import {Helmet} from 'react-helmet';

const NotFound = () => {
    return(
         <div className="notFound">
        <Helmet>
            <title>404 Not Found</title>
            <meta name="description" content="Pagina não encontrada!" />
        </Helmet>
        <div className="notFound_container">
            <h1 className="notFound_container_h1">404</h1>
            <p className="notFound_container_p">
                Oops! Pagina não encontrada!
            </p>
        </div>
    </div>
    );
}
export default NotFound;