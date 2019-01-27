/*
  Home.js
  - Header, Profile, Overview, Status
*/

import React, { Component } from 'react';
import { Segment, List, Icon, Divider, Label } from "semantic-ui-react";
import { CourseDB } from '../utils/Database';
import { Scrollbars } from "react-custom-scrollbars";

class JuanDev extends Component {
    constructor(props){
        super(props);

        this.state = {
            courses: [],
            searchPad: false,
            category: {},
            department: {},
            grade: {}
        }

        this.categories = ['전체', '공통', '교필', '기선', '기필', '석박', '인선', '자선', '전선', '전필', '기타'];
        this.department = ['전체', '인문', '건환', '기경', '기계', '물리', '바공', '산공', '산디', '생명', '수리', '원양', '전자', '전산', '항공', '화학', '생화공', '신소재', '기타'];
        this.grade = ['전체', '100', '200', '300', '400', '기타'];
    }

     componentWillMount(){
        CourseDB.getJSON([])
        .then(courses => {
            this.setState({
                courses: courses.data
            })
        });
    }

    _onSearchClicked(){
        this.setState({
            searchPad: !this.state.searchPad
        })
    }

    render() {
        var scrollbar_style = this.state.searchPad ? {width: "100%", height: "100%", minHeight: window.innerHeight - 375} : {width: "100%", height: "100%", minHeight: window.innerHeight - 80};
        var search_text = this.state.searchPad ? "Hide" : "Search";

        return (
            <Segment style={{width: "400px", background: "#F8F9FA"}} raised>
                <Scrollbars autoHide style={scrollbar_style}>
                    <List divided animated verticalAlign="middle">
                        {
                            this.state.courses.map((course, i) => (
                                <List.Item key={i}>
                                    <List.Content style={{margin: 10}}>
                                        <List.Header>{course.title}</List.Header>
                                        {course.department}, {course.category}, {course.credit}학점
                                    </List.Content>                                
                                </List.Item>
                            ))
                        }
                    </List>
                </Scrollbars>
                <Divider />
                
                <div 
                    onMouseEnter={() => {
                        document.body.style.cursor = "pointer";
                    }}
                    onMouseLeave={() => {
                        document.body.style.cursor = "default";
                    }}
                    onClick={this._onSearchClicked.bind(this)}>
                    <Icon name="search" /> {search_text}
                </div>
                {this.state.searchPad ? 
                <Segment basic>
                    <strong>구분</strong><br/>
                    {this.categories.map(elem => {
                        var color = this.state.category[elem] ? 'blue' : 'white';
                        return(<Label onClick={()=>{
                            var category = this.state.category;
                            category[elem] = !category[elem];
                            this.setState({category});
                        }} color={color} as='a'>{elem}</Label>);
                    })}

                    <br/><br/><strong>학과</strong><br/>
                    {this.department.map(elem => {
                        var color = this.state.department[elem] ? 'blue' : 'white';
                        return(<Label onClick={()=>{
                            var department = this.state.department;
                            department[elem] = !department[elem];
                            this.setState({department});
                        }} color={color} as='a'>{elem}</Label>);
                    })}

                    <br/><br/><strong>학년</strong><br/>
                    {this.grade.map(elem => {
                        var color = this.state.grade[elem] ? 'blue' : 'white';
                        return(<Label onClick={()=>{
                            var grade = this.state.grade;
                            grade[elem] = !grade[elem];
                            this.setState({grade});
                        }} color={color} as='a'>{elem}</Label>);
                    })}
                </Segment>
                : null}
            </Segment>
        );
    }
}

export default JuanDev;
