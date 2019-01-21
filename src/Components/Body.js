/*
    Body.js
    - body of main page
    - including search bar, selection bar, profile, etc

    Created by Juan Lee <juanlee@kaist.ac.kr>
    Originally Written by Kihoon Kwon
*/

import React, { Component } from 'react';
import { Grid, Segment } from 'semantic-ui-react';

import Profile from "./Body.Profile";
import SearchCourse from "./Body.SearchCourse";

import prodo from "../prodo.png";

/*
    Body Component
    - returns a grid of components
*/
export default class Body extends Component {
    render() {
        return(
            <Grid centered container columns="equal">
                <Grid.Row stretched>
                    <Grid.Column width={3}>
                        <Profile name="권기훈" img={prodo} school="KAIST" major="SoC" />
                    </Grid.Column>

                    <Grid.Column width={12}>
                        <Grid.Row>
                            <Segment>
                                <SearchCourse searched_course={course => this.setState({course})}/><br></br>
                                {this.state && this.state.course ? <div>[{this.state.course["과목코드"]}] {this.state.course["과목명"]} {this.state.course["과목구분"]}</div> : ""}
                            </Segment>
                        </Grid.Row>

                        <Grid.Row>
                            <Segment></Segment>
                        </Grid.Row>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
}