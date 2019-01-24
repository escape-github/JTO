import React, { Component, Fragment } from 'react'
import { Divider, Header, Segment } from 'semantic-ui-react'
import Scrollbar from 'react-scrollbars-custom'
import Database from '../utils/Database';

/* class Taken */
export default class Taken extends Component{
    // default states
    state = {
        courses: [],
    }
    
    componentDidMount(){
        Database.get("courses").getJSON([])
        .then(courses => {
            this.setState({
                courses
            });
        });
    }

    takenList = (courses) => {
        return courses.map(e => {
            return(
                <Fragment>
                    <Segment basic floated="right">
                        <p>Something</p>
                    </Segment>
                    <Segment basic>
                        <Header>{e.title}</Header>
                        <p>Description</p>
                    </Segment>
                    <Divider />
                </Fragment>
            )
        })
    }

    render() {
        var {courses} = this.state
        courses = [
            {
                title: "test",
            },
            {
                title: "test2"
            },
            {
                title: "test",
            },
            {
                title: "test2"
            },
            {
                title: "test",
            },
            {
                title: "test2"
            },
            {
                title: "test",
            },
            {
                title: "test2"
            },
            {
                title: "test",
            },
            {
                title: "test2"
            },
        ]

        return(
            <Fragment>
                <Scrollbar style={{width: "100%", height: "100%", minHeight: window.innerHeight - 420}}>
                    {this.takenList(courses)}
                </Scrollbar>
            </Fragment>
        )
    }
}