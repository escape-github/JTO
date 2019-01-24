/*
    Profile.js
    - user profile components

    Image, Name, Description, Status
*/

import React, { Component } from "react"
import { Image, Card, Input } from 'semantic-ui-react'
import Database from "../utils/Database";

/* class Profile */
export default class Profile extends Component {
    // default states
    state = {
        img: "https://t1.daumcdn.net/brunch/static/img/sticker/frodo/10.png",
        name: "Username",
        major: "Major",
        school: "School",
        status: "lorem ipsum status",

        editProfilePhoto: false,
        editProfileName: false,
        editProfileDescription: false,
        editProfileStatus: false,
    }

    // just after created
    componentDidMount(){
        // get user data from database
        Database.get("user").getJSON({})
        .then(user => {
            this.setState({...user});
        });
    }

    _onNameClicked = ()=>{this.setState({editProfileName: true})};
    _onNameEntered = (e)=>{
        if(e.key === 'Enter'){
            this.setState({editProfileName: false});
        }
    }

    _onDescriptionClicked = ()=>{this.setState({editProfileDescription: true})};
    _onDescriptionEntered = (e)=>{
        if(e.key === 'Enter'){
            this.setState({editProfileDescription: false});
        }
    }

    _onStatusClicked = ()=>{this.setState({editProfileStatus: true})};
    _onStatusEntered = (e)=>{
        if(e.key === 'Enter'){
            this.setState({editProfileStatus: false});
        }
    }

    // update the screen
    render(){
        const {img, name, major, school, status} = this.state;

        return(
            <Card>
                <Image src={img} />
                <Card.Content>
                    {this.state.editProfileName ? <Input placeholder={name} onKeyPress={this._onNameEntered} /> : <Card.Header onClick={this._onNameClicked}> {name} </Card.Header>}
                    {this.state.editProfileDescription ? <Input placeholder={major + " @ " + school} onKeyPress={this._onDescriptionEntered} /> : <Card.Meta onClick={this._onDescriptionClicked}> {major + " @ " + school} </Card.Meta>}
                    {this.state.editProfileStatus ? <Input placeholder={status} onKeyPress={this._onStatusEntered} /> : <Card.Description onClick={this._onStatusClicked}> {status} </Card.Description>}
                </Card.Content>
            </Card>
        )
    }
}