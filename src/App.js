import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";

// pages
import Home from "./pages/Home";
import About from './pages/About';
import Edit from "./pages/Edit";
import JuanDev from "./pages/JuanDev";

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/about" component={About}/>
        <Route exact path="/edit" component={Edit}/>
        <Route exact path="/juan" component={JuanDev}/>
        <Route path="/" component={Home}/>
      </Switch>
    );
  }
}

export default App;