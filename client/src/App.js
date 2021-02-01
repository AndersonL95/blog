import {BrowserRouter as Router, Route, Switch} from "react-router-dom"; 
import Home from "./components/Home";
import './main.scss'
import Navbar from "./components/Navbar";
import Registro from "./components/auth/Registro";
import Login from "./components/auth/Login";

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/Registro" exact component={Registro} />
        <Route path="/Login" exact component={Login} />
      </Switch>

    </Router>
   
  );

}


export default App;
