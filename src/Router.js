import React, { Component } from 'react';
import { Route, Switch, BrowserRouter } from "react-router-dom";

// pages
import Home from "./pages/_Home";
import About from './pages/About';
import Edit from "./pages/Edit";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/about" component={About}/>
          <Route exact path="/edit" component={Edit}/>
          <Route path="/" component={Home}/>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;