import {BrowserRouter as Router, Route, Switch} from "react-router-dom"; 
import Home from "./components/Home";
import './main.scss'
import Navbar from "./components/Navbar";
import Registro from "./components/auth/Registro";
import Login from "./components/auth/Login";
import Store from './store/index';
import {Provider} from "react-redux";
import Dashboard from './components/Dashboard';
import PrivateRoute from './privado/PrivateRoute';
import RouteLinks from './privado/RouteLinks';
import NotFound from './components/NotFound';
import Create from './components/Create';
import Edit from './components/Edit';
import EditImage from "./components/EditImge";


function App() {
  return (
		<Provider store={Store}>
			<Router>
				<Navbar />
				<Switch>
					<Route path='/' exact component={Home} />
					<RouteLinks path='/register' exact component={Registro} />
					<RouteLinks path='/login' exact component={Login} />
					<PrivateRoute path='/dashboard/:page?' exact component={Dashboard} />
					<PrivateRoute path='/create' exact component={Create} />
					<PrivateRoute path='/edit/:id' exact component={Edit} />
					<PrivateRoute path='/updateImage/:id' exact component={EditImage} />
					<Route component={NotFound} />
				</Switch>
			</Router>
		</Provider>
	);
}

export default App;
