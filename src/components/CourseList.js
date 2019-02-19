/*
  Home.js
  - Header, Profile, Overview, Status
*/

import React, { Component } from 'react';
import { List, Loader } from "semantic-ui-react";

class CourseList extends Component {
    _onHover(course){
        if(this.props._onCourseHover){
            this.props._onCourseHover(course);
        }
    }

    _onCourseSelected(course){
        this.props._onCourseSelected(course);
    }

    render() {
        var courses = this.props.filtered;
        if(!courses){
            return (
                <Loader inverted>Loading</Loader>
            )
        }

        return (
            <List selection animated verticalAlign="middle" style={{background: "#F8F9FA", width: "100%", margin: 0}}>
                {
                    courses.map((course, i) => (
                        <List.Item key={i} onMouseEnter={()=>this._onHover(course)} onClick={()=>this._onCourseSelected(course)}>
                            <List.Content style={{margin: 10, width: "100%"}}>
                                <List.Header><div style={{color: "black"}}>{course.title}</div></List.Header>
                                {course.code}, {course.department}, {course.category}, {course.credit}학점
                            </List.Content>                                
                        </List.Item>
                    ))
                }
            </List>
        );
    }
}

export default CourseList;
