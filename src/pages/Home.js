import React, { Component, Fragment } from 'react';

import Header from "../components/Header";
import Body from "../components/body/Body";

class Home extends Component {
  render() {
    return (
      <Fragment>
        <Header />
        <Body />
      </Fragment>
    );
  }
}

export default Home;
