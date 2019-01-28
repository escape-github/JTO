/*
  Home.js
  - Header, Profile, Overview, Status
*/

import React, { Component, Fragment } from 'react';
import { Grid, Segment, Header } from 'semantic-ui-react';

import SideCourseList from '../components/SideCourseList';
import TopBanner from '../components/Header';

class JuanDev extends Component {
    state = {
        hover: {
            title: "과목명",
            code: "",
            department: "",
            category: "",
            credit: ""
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
            <Fragment>
                <TopBanner _onLoggedIn={this._onLoggedIn.bind(this)} />
                <Grid>
                    <Grid.Column width={4}>
                        <SideCourseList _onCourseSelected={this._onCourseSelected.bind(this)} _onCourseHover={this._onCourseHover.bind(this)} />
                    </Grid.Column>

                    <Grid.Column width={11} style={{marginTop: 40}}>
                        <Segment.Group>
                            <Segment>
                                <Header>
                                    {this.state.hover.title}
                                    <Header.Subheader>{this.state.hover.code}, {this.state.hover.department}, {this.state.hover.category}, {this.state.hover.credit}학점</Header.Subheader>
                                </Header>
                            </Segment>
                            <Segment>Review 1</Segment>
                            <Segment>Review 2</Segment>
                            <Segment>Review 3</Segment>
                        </Segment.Group>
                    </Grid.Column>
                </Grid>
            </Fragment>
        );
    }
}

export default JuanDev;
