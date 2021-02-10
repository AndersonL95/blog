import {BrowserRouter as Router, Route, Switch} from "react-router-dom"; 
import Home from "./components/Home";
import './main.scss';
import Navbar from "./components/Navbar";
import Registro from "./components/auth/Registro";
import Login from "./components/auth/Login";
import Store from './store/index';
import {Provider} from "react-redux";
import Dashboard from './components/Dashboard';
import PrivateRoute from './privado/PrivateRoute';
import RouteLinks from './privado/RouteLinks';
import NotFound from './components/NotFound';


function App() {
  return (
    <Provider store={Store}>
    <Router>
      <Navbar />
      <Switch>
        <RouteLinks path="/" exact component={Home} />
        <RouteLinks path="/registro" exact component={Registro} />
        <RouteLinks path="/login" exact component={Login} />
        <PrivateRoute path="/dashboard" exact component={Dashboard} />
        <Route component={NotFound}/>
      </Switch>

    </Router>
    </Provider>
   
  );

}


export default App;
