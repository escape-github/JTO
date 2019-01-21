/*
    Body.js
    - body of main page
    - including search bar, selection bar, profile, etc

    Created by Juan Lee <juanlee@kaist.ac.kr>
    Originally Written by Kihoon Kwon
*/

import React, { Component } from 'react';
import { Grid, Menu } from 'semantic-ui-react';


import Profile from "./Profile";
import Overview from "./tabs/Overview";
import Takens from "./tabs/taken/Taken";
import Reviews from "./tabs/Reviews";
import Update from "./tabs/Update";

/*
    Body Component
    - returns a grid of components
*/

const bodyStyle = {
    minWidth: "1200px",
};

export default class Body extends Component {

    state = {
        bodyBar : "Takens"
    }

    handleItemClick = (e, {name}) =>  {
        this.setState({bodyBar: name})
    }
    
    render() {
        const {bodyBar} = this.state
        return(
            <Grid centered container columns="equal" style={bodyStyle}>
                <Grid.Column width={3}>
                    <Profile />
                </Grid.Column>

                <Grid.Column width={12}>
                    <Grid.Row>
                        <Menu pointing secondary size="large" color="orange">
                            <Menu.Item
                                name='Overview'
                                active={bodyBar === "Overview"}
                                onClick={this.handleItemClick} />
                            <Menu.Item
                                name='Takens'
                                active={bodyBar === "Takens"}
                                onClick={this.handleItemClick}
                            />
                            <Menu.Item
                                name='Reviews'
                                active={bodyBar === "Reviews"}
                                onClick={this.handleItemClick}
                            />
                            <Menu.Item
                                name='Update'
                                active={bodyBar === "Update"}
                                onClick={this.handleItemClick}
                            />
                        </Menu>
                    </Grid.Row><br/>
                    <Grid.Row>
                        {bodyBar === "Overview" ? <Overview /> : null }
                        {bodyBar === "Takens" ? <Takens /> : null }
                        {bodyBar === "Reviews" ? <Reviews /> : null }
                        {bodyBar === "Update" ? <Update /> : null }
                    </Grid.Row>
                </Grid.Column>
            </Grid>
        )
    }
}