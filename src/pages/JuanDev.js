/*
  Home.js
  - Header, Profile, Overview, Status
*/

import React, { Component } from 'react';
import SideCourseList from '../components/SideCourseList';

class JuanDev extends Component {
    render() {
        return (
            <div style={{width: "400px"}}>
                <SideCourseList />
            </div>
        );
    }
}

export default JuanDev;
