import React, { Component, Fragment } from 'react';

import Header from "./Components/Header";
import Body from "./Components/Body";

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
