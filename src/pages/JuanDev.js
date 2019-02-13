/*
  Home.js
  - Header, Profile, Overview, Status
*/

import React, { Component, Fragment } from 'react';
import { Grid, Segment } from 'semantic-ui-react';

import SideCourseList from '../components/SideCourseList';
import TopBanner from '../components/Header';
import StatusChartSemester from "../components/StatusChartSemester";
import StatusChartCategory from '../components/StatusChartCategory';

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
        console.log('render')
        return (
            <Fragment>
                <TopBanner _onLoggedIn={this._onLoggedIn.bind(this)} />
                <Grid>
                    <Grid.Column width={3} style={{paddingRight:0}}>
                        <SideCourseList _onCourseSelected={this._onCourseSelected.bind(this)}/>
                    </Grid.Column>

                    <Grid.Column width={13} style={{marginTop: 40, padding:0}}>
                        <Grid stretched>
                            <Grid.Row>
                                <Grid.Column width={12} style={{paddingRight:0}}>
                                    <StatusChartSemester />
                                </Grid.Column>
                                <Grid.Column width={3}>
                                    <StatusChartCategory />
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column width={12} style={{paddingRight:0}}>
                                    <Segment />
                                </Grid.Column>
                                <Grid.Column width={3}>
                                    <Segment></Segment>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>                    
                    </Grid.Column>


                </Grid>
            </Fragment>
        );
    }
}

export default JuanDev;
