import React, { Component, Fragment } from 'react'
import { Divider, Pagination, Header, Segment } from 'semantic-ui-react'
import Database from '../utils/Database';

/* class Taken */
export default class Taken extends Component{
    // default states
    state = {
        courses: [],
        page: 1,
    }

    constructor(props){
        super(props);

        this.itemsPerPage = 7;
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
    
    handlePageChange = (e, {activePage}) => {
        this.setState({page:activePage})
    }

    render() {
        var {page, courses} = this.state
        var totPages = Math.ceil(courses.length / this.itemsPerPage)
        return(
            <Fragment>
                {this.takenList(courses.slice((page-1)*this.itemsPerPage, Math.min(page*this.itemsPerPage, courses.length)))}
                <Pagination totalPages={totPages} onPageChange={this.handlePageChange}/>
            </Fragment>
        )
    }
}