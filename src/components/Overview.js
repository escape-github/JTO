/*
    Overview.js
    - show the result of simulation, and additional information to be satisfied.
*/

import React, { Component } from 'react'
import { Card, Container } from 'semantic-ui-react';

/* class Overview */
// TODO:
// - Connect the algorithms
// - Expand when the button show requirements is clicked
// - Show the satisfied status with bar graph
export default class Overview extends Component{

    render() {
        if(this.props.user){
            var name = this.props.user.profile.username;
        }
        return(
            <Card>
                <Card.Content>
                    <Card.Header>Overview</Card.Header>
                    <Card.Description>{name}</Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <Container textAlign='center'>Show Requirements</Container>
                </Card.Content>
            </Card>
        )
    }
}