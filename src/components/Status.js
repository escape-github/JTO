/*
    Status.js
    - show overall status & this is main components of the service
    - including Graph & Search bar & Course List
*/

import React, { Component } from 'react';
import StatusList from './StatusList';
import CourseChart from './StatusChartSemester';
import { Divider, Segment } from 'semantic-ui-react';
import SearchCourse from './StatusSearch';

export default class Body extends Component {
    
    render() {
        return(
            <Segment raised>
                <CourseChart user={this.props.user} />
                <Divider />
                <SearchCourse user={this.props.user} searched_course={course => this.setState({course})}/>
                <Divider />
                <StatusList user={this.props.user} />
            </Segment>
        )
    }
}