/*
    Profile.js
    - user profile components

    Image, Name, Description, Status
*/

import React, { Component, Fragment } from "react"
import { Image, Card, Input, Button } from 'semantic-ui-react'
import SignIn from "./SignIn";
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

        auth: false,
        open: false
    }

    constructor(props){
        super(props);

        this._onFinishedLogin = this._onFinishedLogin.bind(this);
    }

    _onNameClicked = ()=>{this.setState({editProfileName: true})};
    _onNameEntered = (e)=>{
        if(e.key === 'Enter'){
            Database.get("users").get(this.state.name).get("profile").get("updatedAt").putJSON(new Date());
            Database.get("users").get(this.state.name).get("profile").get("name").putJSON(this.name)
            .then(() => {
                this.setState({
                    editProfileName: false,
                    name: this.name
                });
            })
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
            Database.get("users").get(this.state.name).get("profile").get("updatedAt").putJSON(new Date());
            Database.get("users").get(this.state.name).get("profile").get("status").putJSON(this.status)
            .then(() => {
                this.setState({
                    editProfileStatus: false,
                    status: this.status
                })
            })
        }
    }

    _onFinishedLogin = (user) => {
        if(user){
            this.setState({
                img: user.profile.photo,
                name: user.profile.name,
                major: user.profile.major,
                school: user.profile.school,
                status: user.profile.status,
                auth: true
            });
            this.props._onLoggedIn(user);   // send user info to other components
        }
        else{
            this.setState({
                auth: false,
                open: false
            })
        }
    }

    // update the screen
    render(){
        const {img, name, major, school, status, auth, open} = this.state;

        return(
            <Fragment>
                {open ? <SignIn _onFinished={this._onFinishedLogin} /> : null}
                {auth ? <Card>
                    <Image src={img} />
                    <Card.Content>
                        {this.state.editProfileName ? <Input onChange={(v)=>{this.name=v.target.value}} placeholder={name} onKeyPress={this._onNameEntered} /> : <Card.Header onClick={this._onNameClicked}> {name} </Card.Header>}
                        {this.state.editProfileDescription ? <Input placeholder={major + " @ " + school} onKeyPress={this._onDescriptionEntered} /> : <Card.Meta onClick={this._onDescriptionClicked}> {major + " @ " + school} </Card.Meta>}
                        {this.state.editProfileStatus ? <Input onChange={(v)=>{this.status=v.target.value}} placeholder={status} onKeyPress={this._onStatusEntered} /> : <Card.Description onClick={this._onStatusClicked}> {status} </Card.Description>}
                    </Card.Content>
                </Card> : <Button fluid basic onClick={()=>{this.setState({open: true})}}>Login</Button>}
            </Fragment>
        )
    }
}