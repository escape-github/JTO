import React, { Component } from 'react'
import { Divider, Grid, Button, Container, Header, Label, Pagination } from 'semantic-ui-react'
import SearchCourse from "./Body.SearchCourse";
import Database from '../database/Database';

const itemsPerPage = 7

export default class Takens extends Component{
    
    state = {
        courses: [],
        page: 1,
    }
    
    componentDidMount(){
        Database.getJSON([], '/courses')
        .then(courses => {
            this.setState({
                courses
            });
        });

        /*
        Database.putJSON([
            {title:"Data Structure", type:"Major Required", department:"School of Computing", semester: "2nd Semester", gpa: "A0"},
            {title:"Digital System and Lab", type:"Major Elective", department:"School of Computing", semester: "2nd Semester", gpa: "A0"}
        ], '/courses');
        */
    }

    takenList = (courses) => {
        return courses.map(e => {
            return(
                <>
                <Grid padded columns="equal">
                <Grid.Column width={12}>
                    <Container text>
                        <Header as="h2" color="blue">
                            {e.title}                                
                        </Header>
                        <Label>{e.department}</Label><Label>{e.type}</Label><Label>{e.semester}</Label>
                    </Container>
                </Grid.Column>
                <Grid.Column>
                    <Button color="blue">{e.gpa}</Button>
                    <Button color="orange">review?</Button>
                </Grid.Column>
            </Grid>
            <Divider />
            </>
            )
        })
    }
    
    handlePageChange = (e, {activePage}) => {
        this.setState({page:activePage})
    }

    render() {
        var {page, courses} = this.state
        var totPages = Math.ceil(courses.length / itemsPerPage)
        return(
            <>
            <SearchCourse searched_course={course => this.setState({course})}/>
            <Divider />
            {this.takenList(courses.slice((page-1)*itemsPerPage, Math.min(page*itemsPerPage, courses.length)))}
            <Pagination totalPages={totPages} onPageChange={this.handlePageChange}/>
            </>
        )
    }
}