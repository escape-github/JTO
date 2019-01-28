/*
    Header.js
    - top header of main page
    - including logo, buttons, options, etc
*/

import React, { Component, Fragment } from 'react';
import { Menu, Icon } from 'semantic-ui-react';
import SignIn from './SignIn';
import { UserDB } from '../utils/Database';

/*
    Header Component
    - returns a menu bar
*/
export default class Header extends Component {
    state = {
        open: false,
    }

    constructor(props){
        super(props);

        var json = JSON.parse(localStorage.getItem("auth"));
        if(json){
            UserDB.get(json.username).getJSON({profile:{}, taken:[]})
            .then(user => {
                this.setState({
                    user,
                    auth: true
                });
                if(this.props._onLoggedIn)
                    this.props._onLoggedIn(user);
            });
        }
    }

    _logout(){
        localStorage.setItem("auth", null);
        this.setState({
            auth: false,
            user: null
        });
    }

    _login(){
        this.setState({
            open: true
        })
    }

    _onFinishedLogin = (user) => {
        if(user){
            this.setState({
                auth: true,
                user
            });
            if(this.props._onLoggedIn)
                this.props._onLoggedIn(user);   // send user info to other components
        }
        else{
            this.setState({
                auth: false,
                open: false
            })
        }
    }

    _onUserClicked(){
        if(this.state.auth){
            this._logout();
        }
        else{
            this._login();
        }
    }

    render(){
        return (
            <Fragment>
                {this.state.open ? <SignIn _onFinished={this._onFinishedLogin} /> : null}
                <Menu inverted borderless fixed="top" size="massive">
                    <Menu.Item>
                        <Icon name="chart pie" /> JTO
                    </Menu.Item>

                    <Menu.Item style={{fontSize: 16}} onClick={this._onUserClicked.bind(this)} position='right' name='user'>
                        {this.state.auth ? "안녕하세요, " + this.state.user.profile.name + "님" : "Sign In"}
                    </Menu.Item>
                </Menu>
            </Fragment>
        )
    }
}