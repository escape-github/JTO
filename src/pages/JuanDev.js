/*
  Home.js
  - Header, Profile, Overview, Status
*/

import React, { Component } from 'react';
import { Segment, List, Icon, Divider, Label, Input } from "semantic-ui-react";
import { CourseDB } from '../utils/Database';
import { Scrollbars } from "react-custom-scrollbars";

class JuanDev extends Component {
    constructor(props){
        super(props);

        this.state = {
            courses: [],
            searchPad: false,
            category: {'전체': true},
            department: {'전체': true},
            grade: {'전체': true}
        }
        this.courses = [];

        this.categories = {'전체':"", '공통':"공통필수", '교필':'교양필수', '기선':'기초선택', '기필':'기초필수', '석박':'선택(석/박사)', '인선':"인문사회선택", '자선':'자유선택', '전선':'전공선택', '전필':'전공필수', '기타':''};
        this.department = {'전체':'', '인문':'인문사회과학부', '건환':'건설및환경공학과', '기경':'기술경영학부', '기계':'기계공학과', '물리':'물리학과', '바공':'바이오및뇌공학과', '산공':'산업및시스템공학과', '산디':'산업디자인학과', '생명':'생명과학과', '수리':'수리과학과', '원양':'원자력및양자공학과', '전자':'전기및전자공학부', '전산':'전산학부', '항공':'항공우주공학과', '화학':'화학과', '생화공':'생명화학공학과', '신소재':'신소재공학과', '기타':''};
        this.grade = ['전체', '100', '200', '300', '400', '기타'];
    }

     componentWillMount(){
        CourseDB.getJSON([])
        .then(courses => {
            this.courses = courses.data;
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

    _onUpdateList(){
        var parsed_courses = this.courses;
        if(!this.state.category['전체']){
            
        }
        return parsed_courses;
    }

    render() {
        var scrollbar_style = this.state.searchPad ? {width: "100%", height: "100%", minHeight: window.innerHeight - 390} : {width: "100%", height: "100%", minHeight: window.innerHeight - 80};
        var search_text = this.state.searchPad ? "Hide" : "Search";
        var courses = this._onUpdateList();

        return (
            <Segment style={{width: "400px", background: "#F8F9FA"}} raised>
                <Scrollbars autoHide style={scrollbar_style}>
                    <List divided animated verticalAlign="middle">
                        {
                            courses.map((course, i) => (
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
                    <Label color="green">구분</Label>
                    {Object.keys(this.categories).map(elem => {
                        var color = this.state.category[elem] ? 'blue' : 'white';
                        return(<Label style={{margin: 1}} onClick={()=>{
                            var category = this.state.category;
                            category[elem] = !category[elem];
                            this.setState({category});
                        }} color={color} as='a'>{elem}</Label>);
                    })}

                    <br/><Label style={{marginTop: 15}} color="green">학과</Label>
                    {Object.keys(this.department).map(elem => {
                        var color = this.state.department[elem] ? 'blue' : 'white';
                        return(<Label style={{margin: 1}} onClick={()=>{
                            var department = this.state.department;
                            department[elem] = !department[elem];
                            this.setState({department});
                        }} color={color} as='a'>{elem}</Label>);
                    })}

                    <br/><Label style={{marginTop: 15}} color="green">학년</Label>
                    {this.grade.map(elem => {
                        var color = this.state.grade[elem] ? 'blue' : 'white';
                        return(<Label style={{margin: 1}} onClick={()=>{
                            var grade = this.state.grade;
                            grade[elem] = !grade[elem];
                            this.setState({grade});
                        }} color={color} as='a'>{elem}</Label>);
                    })}

                    <Divider />

                    <Input
                        style={{marginTop: 15}}
                        fluid
                        action={{ color: 'green', labelPosition: 'right', icon: 'search', content: '검색', onClick: ()=>{alert("click")} }}
                        placeholder="제목으로 검색"
                    />
                </Segment>
                : null}
            </Segment>
        );
    }
}

export default JuanDev;
