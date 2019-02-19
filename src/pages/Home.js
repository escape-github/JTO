/*
  Home.js
  - Header, Profile, Overview, Status
*/

import React, { Component } from 'react';
import { Grid, Segment, Button } from 'semantic-ui-react';

import SideCourseList from '../components/CourseList';
import Header from '../components/Header';
import StatusChartSemester from "../components/StatusChartSemester";
import StatusChartCategory from '../components/StatusChartCategory';
import CourseFilter from '../components/CourseFilter';
import { CourseDB } from '../utils/Database';
import AddTaken from '../components/AddTaken'

import "../css/Home.css";

class Home extends Component {
    state = {
        active: false
    }

    componentWillMount(){
        CourseDB.get('data').getJSON([])
        .then(courses => {
            this.courses = courses;
            this.setState({
                filtered: courses
            })
        });
    }

    render() {
        console.log(this.state.filtered)
        return (
            <div>
                <Header _onLoggedIn={user => this.setState({user})} />
                
                <div className="side">
                    <SideCourseList filtered={this.state.filtered} _onCourseSelected={selected_course => this.setState({selected_course})}/> 
                    <div className="searchPad">
                        <div className="searchPad">
                            {this.state.active ? <CourseFilter courses={this.courses} _onFiltered={filtered => this.setState({filtered})} />: null}
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
                                <Segment><AddTaken selected={this.state.selected_course}/></Segment>
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
