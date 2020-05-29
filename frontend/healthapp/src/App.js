import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import logo from './logo.svg';
import Login from "./Login";
import Register from "./Register";
import LandingPage from "./LandingPage";
import PatientPortal from "./PatientPortal";
import Profile from "./profile";

import './App.css';

class App extends Component {
  render(){
    return(
     <Router>
       <Route exact path="/" component={LandingPage}/>
       <Route exact path="/register" component={Register}/>
       <Route exact path="/login" component={Login}/>
       <Route exact path="/PatientPortal" component={PatientPortal}/>
       <Route exact path="/profile" component={Profile}/>
     </Router>
    );
  }
}


export default App;
