/*
    Body.js
    - body of main page
    - including search bar, selection bar, profile, etc

    Created by Juan Lee <juanlee@kaist.ac.kr>
    Originally Written by Kihoon Kwon
*/

import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';


import Profile from "./Profile";
import Overview from "./tabs/Overview";
import Takens from "./tabs/taken/Taken";

/*
    Body Component
    - returns a grid of components
*/

const bodyStyle = {
    minWidth: "1200px",
};

export default class Body extends Component {
    
    render() {
        return(
            <Grid centered container columns="equal" style={bodyStyle}>
                <Grid.Column width={3}>
                    <Grid.Row>
                        <Profile />
                    </Grid.Row><br />
                    <Grid.Row>
                        <Overview />
                    </Grid.Row>
                </Grid.Column>

                <Grid.Column width={12}>
                        <Takens />
                </Grid.Column>
            </Grid>
        )
    }
}