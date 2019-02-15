/*
  Home.js
  - Header, Profile, Overview, Status
*/

import React, { Component } from 'react';
import { Grid, Segment, Button } from 'semantic-ui-react';

import SideCourseList from '../components/CourseList';
import TopBanner from '../components/Header';
import StatusChartSemester from "../components/StatusChartSemester";
import StatusChartCategory from '../components/StatusChartCategory';
import CourseFilter from '../components/CourseFilter';

import "../css/Home.css";

class Home extends Component {
    state = {
        active: false
    }

    render() {
        return (
            <div>
                <TopBanner _onLoggedIn={user => this.setState({user})} />
                
                <div className="side">
                    <SideCourseList _onCourseSelected={selected_course => this.setState({selected_course})}/> 
                    <div className="searchPad">
                        <div className="searchPad">
                            {this.state.active ? <CourseFilter />: null}
                        </div>
                    </div>
                    <div className="searchButton">
                        <Button toggle circular icon='search' active={this.state.active} onClick={()=>{this.setState({active: !this.state.active})}}/>
                    </div>
                </div>

                <div className="content">
                    <Grid stretched>
                        <Grid.Row>
                            <Grid.Column width={12} style={{paddingRight:0}}>
                                <StatusChartSemester />
                            </Grid.Column>
                            <Grid.Column width={4}>
                                <StatusChartCategory />
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column width={12} style={{paddingRight:0}}>
                                <Segment />
                            </Grid.Column>
                            <Grid.Column width={4}>
                                <Segment></Segment>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid> 
                    <br/><br/><br/><br/><br/><br/><br/><br/><br/>action
                    <br/><br/><br/><br/><br/><br/><br/><br/><br/>action
                    <br/><br/><br/><br/><br/><br/><br/><br/><br/>action
                    <br/><br/><br/><br/><br/><br/><br/><br/><br/>action
                    <br/><br/><br/><br/><br/><br/><br/><br/><br/>action
                    <br/><br/><br/><br/><br/><br/><br/><br/><br/>action
                    <br/><br/><br/><br/><br/><br/><br/><br/><br/>action

                </div>
            </div>
        );
    }
}

export default Home;
