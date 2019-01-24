/*
    Profile.js
    - user profile components

    Image, Name, Description, Status
*/

import React, { Component } from "react"
import { Image, Card } from 'semantic-ui-react'
import Database from "../utils/Database";

/* class Profile */
export default class Profile extends Component {
    // default states
    state = {
        img: "https://t1.daumcdn.net/brunch/static/img/sticker/frodo/10.png",
        name: "Username",
        major: "Major",
        school: "School",
        status: "lorem ipsum status"
    }

    // just after created
    componentDidMount(){
        // get user data from database
        Database.get("user").getJSON({})
        .then(user => {
            this.setState({...user});
        });
    }

    // update the screen
    render(){
        const {img, name, major, school, status} = this.state;

        return(
            <Card>
                <Image src={img} />
                <Card.Content>
                    <Card.Header> {name} </Card.Header>
                    <Card.Meta> {major} @ {school} </Card.Meta>
                    <Card.Description> {status} </Card.Description>
                </Card.Content>
            </Card>
        )
    }
}