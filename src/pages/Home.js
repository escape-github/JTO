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
  render() {
    return (
      <Fragment>
        <Header />
        <Grid centered container columns="equal" style={{minWidth: "1200px", marginTop: 20}}>
          <Grid.Column width={3}>
            <Grid.Row>
                <Profile />
            </Grid.Row>
            <Grid.Row style={{marginTop: 10}}>
                <Overview />
            </Grid.Row>
          </Grid.Column>

          <Grid.Column width={12}>
            <Status />
          </Grid.Column>
        </Grid>
      </Fragment>
    );
  }
}

export default Home;
