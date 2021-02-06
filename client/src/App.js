import {BrowserRouter as Router, Route, Switch} from "react-router-dom"; 
import Home from "./components/Home";
import './main.scss';
import Navbar from "./components/Navbar";
import Registro from "./components/auth/Registro";
import Login from "./components/auth/Login";
import Store from './store/index';
import {Provider} from "react-redux";

function App() {
  return (
    <Provider store={Store}>
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/registro" exact component={Registro} />
        <Route path="/login" exact component={Login} />
      </Switch>

    </Router>
    </Provider>
   
  );

}


export default App;
