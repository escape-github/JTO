/*
  Home.js
  - Header, Profile, Overview, Status
*/

import React, { Component, Fragment } from 'react';
import { Grid, Message } from 'semantic-ui-react';

import SideCourseList from '../components/SideCourseList';
import Header from '../components/Header';

class JuanDev extends Component {
    state = {
        hover: {
            title: "과목명",
        }
    }

    _onLoggedIn(user){
        this.setState({
            user
        });
    }

    _onCourseSelected(course){

    }

    _onCourseHover(course){
        this.setState({
            hover: course
        });
    }

    render() {
        return (
            <Fragment style={{overflow: 'hidden'}}>
                <Header _onLoggedIn={this._onLoggedIn.bind(this)} />
                <Grid>
                    <Grid.Column width={4}>
                        <SideCourseList _onCourseSelected={this._onCourseSelected.bind(this)} _onCourseHover={this._onCourseHover.bind(this)} />
                    </Grid.Column>

                    <Grid.Column width={11} style={{marginTop: 40}}>
                        <Message>
                            <Message.Content>
                                <Message.Header>{this.state.hover.title}</Message.Header>
                                {this.state.hover.code}, {this.state.hover.department}, {this.state.hover.category}, {this.state.hover.credit}학점
                            </Message.Content>
                        </Message>
                    </Grid.Column>
                </Grid>
            </Fragment>
        );
    }
}

export default JuanDev;
