/*
    Status.js
    - show overall status & this is main components of the service
    - including Graph & Search bar & Course List
*/

import React, { Component } from 'react';
import Taken from './StatusList';
import CourseChart from './StatusChart';
import { Divider, Segment } from 'semantic-ui-react';
import SearchCourse from './StatusSearch';

export default class Body extends Component {
    
    render() {
        return(
            <Segment raised>
                <CourseChart />
                <Divider />
                <SearchCourse searched_course={course => this.setState({course})}/>
                <Divider />
                <Taken />
            </Segment>
        )
    }
}