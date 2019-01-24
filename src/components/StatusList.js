import React, { Component, Fragment } from 'react'
import { Divider, Header, Segment } from 'semantic-ui-react'
import Scrollbar from 'react-scrollbars-custom'
import Database from '../utils/Database';

/* class StatusList */
export default class StatusList extends Component{
    // default states
    state = {
        courses: [],
    }

    _getCourses(){
        if(this.props.user){
            Database.get("users").get(this.props.user.profile.username).get("taken").getJSON([])
            .then(courses=>{
                this.setState({courses});
            });
        }
    }

    takenList = (courses) => {
        return courses.map(e => {
            return(
                <Fragment>
                    <Segment basic>
                        <Header>{e.title}</Header>
                        <p>Description</p>
                    </Segment>
                    <Segment basic floated="right" textAlign="justified">
                        <p>Something</p>
                    </Segment>
                    <Divider />
                </Fragment>
            )
        })
    }

    render() {
        this._getCourses();
        var {courses} = this.state

        return(
            <Fragment>
                <Scrollbar style={{width: "100%", height: "100%", minHeight: window.innerHeight - 420}}>
                    {this.takenList(courses)}
                </Scrollbar>
            </Fragment>
        )
    }
}