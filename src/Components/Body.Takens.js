import React, { Component } from 'react'
import { Divider, Grid, Button, Container, Header, Label } from 'semantic-ui-react'
import SearchCourse from "./Body.SearchCourse";

const courses = [
    {title:"Data Structure", type:"Major Required", department:"School of Computing"},
    {title:"Digital System and Lab", type:"Major Elective", department:"School of Computing"}
]

export default class Takens extends Component{

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
                        <Label>{e.department}</Label><Label>{e.type}</Label><Label>2nd Semester</Label>
                    </Container>
                </Grid.Column>
                <Grid.Column>
                    <Button color="blue">A0</Button>
                    <Button color="orange">review?</Button>
                </Grid.Column>
            </Grid>
            <Divider />
            </>
            )
        })
    } 

    render() {
        console.log(this.takenList(courses))
        return(
            <>
            <SearchCourse searched_course={course => this.setState({course})}/>
            <Divider />
            {this.takenList(courses)}
            </>
        )
    }
}