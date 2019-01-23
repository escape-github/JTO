import React, { Component } from "react"
import { Image, Card, Button } from 'semantic-ui-react'
import Database from "../../utils/Database";

export default class Profile extends Component {
    state = {
        img: "https://t1.daumcdn.net/brunch/static/img/sticker/frodo/10.png",
        name: "Username",
        major: "Major",
        school: "School",
        status: "lorem ipsum status"
    }

    componentDidMount(){
        Database.getJSON({}, '/user')
        .then(user => {
            this.setState({...user});
        });

        /*
        Database.putJSON({
            name: "Kihoon Kwon",
            major: "SoC",
            school: "KAIST",
            status: "Hi, I am Kihoon!"
        }, '/user'); */
    }

    render(){
        return(
            <Card>
                <Image src={this.state.img} />
                <Card.Content>
                    <Card.Header> {this.state.name} </Card.Header>
                    <Card.Meta>
                        {this.state.major} @ {this.state.school}
                    </Card.Meta>
                    <Card.Description>
                        {this.state.status}
                    </Card.Description>
                </Card.Content>
                <Button onClick={()=>window.location.href="/edit"}>Edit</Button>
            </Card>
        )
    }
}