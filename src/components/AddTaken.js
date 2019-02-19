import React, { Component } from 'react'
import {Button} from 'semantic-ui-react'
import {UserDB} from '../utils/Database'


export default class AddTaken extends Component {


    //----- test -----//
    takenEx = {semester :{year:1, season:"spring"}, retake:false, retake_replace:0, createdAt:new Date(), updateAt:0}

    dbUpload = () => {
        var takenInfo = {}
        UserDB.get("juan/taken").getJSON([])
        .then(takens => {

            Object.assign(takenInfo, {id:this.props.selected["id"], credit:this.props.selected["credit"]})
            Object.assign(takenInfo, this.takenEx)
            takens.push(takenInfo)
            
            UserDB.get("juan/taken").putJSON(takens)
            this.props.isUploaded(this.props.selected["id"])
        })

        
    }

    dbClear = () => {
        UserDB.get("juan/taken").clearJSON()
    }

    render() {
        

        var selected = this.props.selected
        if(selected){
            var title = selected["title"]
            var department = selected['department']
        }
        return (
            <div>
                {selected ? <div> {title} - {department} </div> : <div>choose course</div>} 
                <Button onClick={()=>{this.dbUpload()}}> upload </Button>
                <Button onClick={()=>{this.dbClear()}}> clear </Button>
            </div>
        )
    }
}