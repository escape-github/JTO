import React, { Component } from 'react';
import { Form, Modal, Button, Message } from "semantic-ui-react";
import Database from '../utils/Database';

class SignIn extends Component {
  state = {
    signup: false,
    email_error: false,
    password_error: false,
    open: true
  }

  constructor(props){
    super(props);

    this._onButtonClicked = this._onButtonClicked.bind(this);
    this.setState({
      open: this.props.state
    });
  }

  _onButtonClicked = () => {
    if(this.state.signup){
      Database.get("users").getJSON([])
      .then(users => {
        var found = users.filter(user => user.email === this.email);
        if(found.length > 0){
          this.setState({
            email_error: "Email Already Exists"
          });
        }
        else{
          if(this.password !== this.password_again){
            this.setState({
              password_error: "Passwords Are NOT Same"
            });
          }
          else{
            users.push({
              email: this.email,
              password: this.password
            });
            Database.get("users").putJSON(users)
            .then(() => {
              this.props._onFinished(this.email);
              this.setState({
                open: false
              })
            })
          }
        }
      });
    }
    else{
      // signin
      Database.get("users").getJSON([])
      .then(users => {
        var found = users.filter(user => user.email === this.email);
        if(found.length < 1){
          this.setState({
            signup: true,
            email_error: false,
            password_error: false
          });
        }
        else{
          if(found[0].password === this.password){
            this.props._onFinished(this.email);
            this.setState({
              open: false,
            })
          }
          else{
            this.setState({
              password_error: "Wrong Password"
            });
          }
        }
      });
    }
  }

  _onEmailChanged = (e) => {
    this.email = e.target.value;
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
        <Modal.Content>
          <Form>
            <Form.Input onChange = {this._onEmailChanged.bind(this)} label='Email' placeholder='enter@your.email' />
            {this.state.email_error ? <Message negative header="Invalid Email" content={this.state.email_error} /> : null}
            <Form.Input onChange = {this._onPasswordChanged.bind(this)} label='Password' placeholder='Password here' type="password" />
            {this.state.signup ? <Form.Input onChange = {this._onPasswordChangedAgain } label='Password Again' placeholder='Password here' type="password" /> : null}
            {this.state.password_error ? <Message negative header="Invalid Email" content={this.state.password_error} /> : null}
            <Button onClick={this._onButtonClicked} fluid basic>{this.state.signup ? "Nice to meet you!" : "Sign In or Sign Up!"}</Button>
          </Form>
        </Modal.Content>
      </Modal>
    );
  }
} 

export default SignIn;
