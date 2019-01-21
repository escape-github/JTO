import React, { Component, Fragment } from 'react';

import Header from "./components/Header";
import Body from "./components/Body";

class App extends Component {
  render() {
    return (
      <Fragment>
        <Header />
        <Body />
      </Fragment>
    );
  }
}

export default App;
