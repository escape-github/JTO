import React, { Component } from 'react';
import { Form, Modal, Button, Message } from "semantic-ui-react";
import { UserDB } from '../utils/Database';

class SignIn extends Component {
	state = {
		signup: false,
		username_error: false,
		password_error: false,
		open: true
	}

	constructor(props){
		super(props);

		this._onButtonClicked = this._onButtonClicked.bind(this);
	}

	async _signUp(){
		if(this.password !== this.password_again){
			this.setState({
				password_error: "Passwords are NOT same"
			});
			return;
		}

		var user = await UserDB.get(this.username).getJSON(null);
		if(user){	// user already exists
			this.setState({
				password_error: "Email Already Exists"
			});
			return;
		}

		// create new user
		var newuser = {
			profile:{
				photo: "https://scontent-icn1-1.xx.fbcdn.net/v/t31.0-8/21457408_1888298358155545_9010337620078324880_o.png?_nc_cat=109&_nc_ht=scontent-icn1-1.xx&oh=bd109c658a6dc0138683a7590c63f628&oe=5CBA6F69",
				name: this.username,
				username: this.username,
				status: "nubjuk today",
				school: "KAIST",
				email: "escape@kaist.ac.kr",
				major: "SoC",
				password: this.password,
				updatedAt: new Date()
			},
			taken: [],
			createdAt: new Date(),
			lastLogin: new Date()
		};

		UserDB.get(this.username).putJSON(newuser)
		.then(()=>{
			this.props._onFinished(newuser);
			this.setState({
				open: false
			});
			localStorage.setItem("auth", JSON.stringify({
				username: newuser.profile.username,
				password: newuser.profile.password,
				createdAt: new Date(),
			}));
		});
	}

	async _signIn(){
		var user = await UserDB.get(this.username).getJSON(null);
		if(user){	// if user already exists
			if(user.profile.password === this.password){	// correct
				this.props._onFinished(user);
				this.setState({
					open: false
				});
				UserDB.get(this.username).get("lastLogin").putJSON(new Date());
				localStorage.setItem("auth", JSON.stringify({
					username: user.profile.username,
					password: user.profile.password,
					createdAt: new Date(),
				}));
			}
			else{
				this.setState({
					password_error: "Wrong Password"
				});
			}
		}
		else{	// user does not exist
			this.setState({
				signup: true,
				username_error: false,
				password_error: false
			});
		}
	}

	_onButtonClicked = () => {
		if(this.state.signup){
			this._signUp();
		}
		else{
			this._signIn();
		}
	}

	_onUsernameChanged = (e) => {
		this.username = e.target.value;
	}

	_onPasswordChanged = (e) => {
		this.password = e.target.value;
	}

	_onPasswordChangedAgain = (e) => {
		this.password_again = e.target.value;
	}

	render() {
		return (
			<Modal size="mini" open={this.state.open} style={{padding: 10}} closeOnEscape={true} closeOnDimmerClick={true} onClose={()=>{this.setState({open: false}, this.props._onFinished(null))}}>
				<Modal.Header>{this.state.signup ? "You need to sign up first!" : "Welcome Back!"}</Modal.Header>
				<Modal.Content style={{margin: 0}}>
					<Form>
						<Form.Input onChange = {this._onUsernameChanged.bind(this)} label='Username' placeholder='Username here' />
						{this.state.username_error ? <Message negative header="Invalid Username" content={this.state.username_error} /> : null}
						<Form.Input onChange = {this._onPasswordChanged.bind(this)} label='Password' placeholder='Password here' type="password" />
						{this.state.signup ? <Form.Input onChange = {this._onPasswordChangedAgain } label='Password Again' placeholder='Password here' type="password" /> : null}
						{this.state.password_error ? <Message negative header="Invalid Password" content={this.state.password_error} /> : null}
						<Button onClick={this._onButtonClicked} fluid basic>{this.state.signup ? "Nice to meet you!" : "Sign In or Sign Up!"}</Button>
					</Form>
				</Modal.Content>
			</Modal>
		);
	}
} 

export default SignIn;
