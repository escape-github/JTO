/*
  Home.js
  - Header, Profile, Overview, Status
*/

import React, { Component } from 'react';
import { Segment, Label, Divider, Input, Dropdown, Header } from 'semantic-ui-react';

import "../css/Home.css";

class CourseFilter extends Component {
    state = {
        hover: {
            title: "과목명",
            code: "",
            department: "",
            category: "",
            credit: ""
        }
    }
 
    constructor(props){
        super(props);

        this.state = {
            courses: [],
            searchPad: false,
            searchText: '',
            category: {'전체': true},
            department: {'전체': true},
            grade: {'전체': true},
        }

        this.category = {'전체':"", '공통':"공통필수", '교필':'교양필수', '기선':'기초선택', '기필':'기초필수', '석박':'선택(석/박사)', '인선':"인문사회선택", '자선':'자유선택', '전선':'전공선택', '전필':'전공필수', '기타':''};
        this.department = {'전체':'', '인문':'인문사회과학부', '건환':'건설및환경공학과', '기경':'기술경영학부', '기계':'기계공학과', '물리':'물리학과', '바공':'바이오및뇌공학과', '산공':'산업및시스템공학과', '산디':'산업디자인학과', '생명':'생명과학과', '수리':'수리과학과', '원양':'원자력및양자공학과', '전자':'전기및전자공학부', '전산':'전산학부', '항공':'항공우주공학과', '화학':'화학과', '생화공':'생명화학공학과', '신소재':'신소재공학과', '기타':''};
        this.grade = {'전체':'', '1학년':'1', '2학년':'2', '3학년':'3', '4학년':'4', '기타':''};

        this.options = [
            { key: 'title', text: '과목명', value: 'title' },
        ]

        this.props._onFiltered(this.props.courses);
    }

    _onUpdateList(){
        var filtered = this.props.courses;
        if(!this.state.category['전체']){
            Object.keys(this.category).forEach(key => {
                if(this.category[key].trim().length > 0 && !this.state.category[key]){
                    filtered = filtered.filter(course => course.category !== this.category[key]);
                }
            });
            if(!this.state.category['기타']){
                filtered = filtered.filter(course => Object.values(this.category).includes(course.category));
            }
        }
        if(!this.state.department['전체']){
            Object.keys(this.department).forEach(key => {
                if(this.department[key].trim().length > 0 && !this.state.department[key]){
                    filtered = filtered.filter(course => course.department !== this.department[key]);
                }
            });
            if(!this.state.department['기타']){
                filtered = filtered.filter(course => Object.values(this.department).includes(course.department));
            }
        }
        if(!this.state.grade['전체']){
            Object.keys(this.grade).forEach(key => {
                if(this.grade[key].trim().length > 0 && !this.state.grade[key]){
                    filtered = filtered.filter(course => course.code.charAt(course.code.length-3) !== this.grade[key]);
                }
            });
            if(!this.state.grade['기타']){
                filtered = filtered.filter(course => Object.values(this.grade).includes(course.code.charAt(course.code.length-3)));
            }
        }
        filtered = filtered.filter(course => course.title.includes(this.state.searchText))
        this.props._onFiltered(filtered);
    }

    _onSearchChanged(e){
        this.setState({
            searchText: e.target.value
        });
        this._onUpdateList();
    }

    _innerOnCategoryClick(elem){
        var category = this.state.category;
        category[elem] = !category[elem];
        if(elem === '전체'){
            category = {'전체':true};
        }
        else{
            category['전체'] = false;
        }
        this.setState({category});
        this._onUpdateList();
    }

    _innerOnDepartmentClick(elem){
        var department = this.state.department;
        department[elem] = !department[elem];
        if(elem === '전체'){
            department = {'전체':true};
        }
        else{
            department['전체'] = false;
        }
        this.setState({department});
        this._onUpdateList();
    }

    _innerOnGradeClick(elem){
        var grade = this.state.grade;
        grade[elem] = !grade[elem];
        if(elem === '전체'){
            grade = {'전체':true};
        }
        else{
            grade['전체'] = false;
        }
        this.setState({grade});
        this._onUpdateList();
    }

    render() {
        return (
            <Segment raised onKeyDown={e=>{if(e.keyCode===27){this.setState({searchPad:false})}}}>
                <Header>Filter?</Header>
                <Label color="green">구분</Label>
                {Object.keys(this.category).map((elem, i) => {
                    return this.state.category[elem] ? 
                    (<Label key={i} style={{margin: 1}} onClick={()=>this._innerOnCategoryClick(elem)} color='blue' as='a'>{elem}</Label>)
                    : (<Label key={i} style={{margin: 1}} onClick={()=>this._innerOnCategoryClick(elem)} as='a'>{elem}</Label>);
                })}

                <br/><Label style={{marginTop: 15}} color="green">학과</Label>
                {Object.keys(this.department).map((elem, i) => {
                    return (this.state.department[elem] ? 
                        (<Label key={i} style={{margin: 1}} onClick={()=>this._innerOnDepartmentClick(elem)} color='blue' as='a'>{elem}</Label>)
                        : (<Label key={i} style={{margin: 1}} onClick={()=>this._innerOnDepartmentClick(elem)} as='a'>{elem}</Label>));
                })}

                <br/><Label style={{marginTop: 15}} color="green">학년</Label>
                {Object.keys(this.grade).map((elem, i) => {
                    return (this.state.grade[elem] ? 
                        (<Label key={i} style={{margin: 1}} onClick={()=>this._innerOnGradeClick(elem)} color='blue' as='a'>{elem}</Label>)
                        : (<Label key={i} style={{margin: 1}} onClick={()=>this._innerOnGradeClick(elem)} as='a'>{elem}</Label>));
                })}

                <Divider />

                <Input
                    action={<Dropdown button basic floating options={this.options} defaultValue='title' />}
                    style={{marginTop: 15}}
                    fluid
                    placeholder="검색"
                    onChange={this._onSearchChanged.bind(this)}
                />
            </Segment>
        );
    }
}

export default CourseFilter;
