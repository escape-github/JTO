/*
    Body.js
    - body of main page
    - including search bar, selection bar, profile, etc

    Created by Juan Lee <juanlee@kaist.ac.kr>
    Originally Written by Kihoon Kwon
*/

import React, { Component } from 'react';
import { Grid, Menu } from 'semantic-ui-react';

import Profile from "./Body.Profile";
import Takens from "./Body.Takens";

import prodo from "../prodo.png";

/*
    Body Component
    - returns a grid of components
*/
export default class Body extends Component {

    state = {
        bodyBar : "Takens"
    }

    handleItemClick = (e, {name}) =>  {
        //console.log(name)
        this.setState({bodyBar: name})
    }
    
    render() {
        const {bodyBar} = this.state
        return(
            <Grid centered container columns="equal">
                <Grid.Column width={3}>
                    <Profile name="권기훈" img={prodo} school="KAIST" major="SoC" />
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
                        <Takens />
                    </Grid.Row>
                </Grid.Column>
            </Grid>
        )
    }
}