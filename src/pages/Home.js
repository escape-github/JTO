/*
  Home.js
  - Header, Profile, Overview, Status
*/

import React, { Component, Fragment } from 'react';
import { Grid } from 'semantic-ui-react';

import Header from '../components/Header';
import Profile from '../components/Profile';
import Overview from '../components/Overview';
import Status from '../components/Status';

class Home extends Component {
  state = {
    loggedIn: null,
  }

  constructor(props){
    super(props);

    this._onLoggedIn = this._onLoggedIn.bind(this);
  }

  _onLoggedIn(user){
    this.setState({
      loggedIn: user
    });
  }

  render() {
    return (
      <Fragment>
        <Header />
        <Grid centered container columns="equal" style={{minWidth: "1200px", marginTop: 20}}>
          <Grid.Column width={3}>
            <Grid.Row>
                <Profile _onLoggedIn = {this._onLoggedIn} />
            </Grid.Row>
            <Grid.Row style={{marginTop: 10}}>
                <Overview user={this.state.loggedIn} />
            </Grid.Row>
          </Grid.Column>

          <Grid.Column width={12}>
            <Status user={this.state.loggedIn} />
          </Grid.Column>
        </Grid>
      </Fragment>
    );
  }
}

export default Home;
