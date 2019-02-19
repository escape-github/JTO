import React, { Component } from 'react'

export default class AddTaken extends Component {

    
    render() {
        var selected = this.props.selected
        if(selected){
            var title = selected["title"]
            var department = selected['department']
        }
        return (
            selected ? <div> {title} - {department} </div> : <div>choose course</div>
        )
    }
}