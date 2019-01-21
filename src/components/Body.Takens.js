import React, { Component } from 'react'
import { Divider, Grid, Button, Container, Header, Label } from 'semantic-ui-react'
import SearchCourse from "./Body.SearchCourse";
import Database from '../database/Database';

export default class Takens extends Component{
    state = {
        courses: []
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

    render() {
        return(
            <>
            <SearchCourse searched_course={course => this.setState({course})}/>
            <Divider />
            {this.takenList(this.state.courses)}
            </>
        )
    }
}