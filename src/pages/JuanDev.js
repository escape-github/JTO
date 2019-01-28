/*
  Home.js
  - Header, Profile, Overview, Status
*/

import React, { Component, Fragment } from 'react';
import SideCourseList from '../components/SideCourseList';

import Header from '../components/Header';

class JuanDev extends Component {
    render() {
        return (
            <Fragment>
                <Header />
                <div style={{width: "400px", marginTop: 40}}>
                    <SideCourseList />
                </div>
            </Fragment>
        );
    }
}

export default JuanDev;
