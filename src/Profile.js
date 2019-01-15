import React from "react"
import { Image, Card, Icon } from 'semantic-ui-react'
import './Profile.css'

function Profile({name, img, school, major}){
    return(
        <Card fluid>
            <Image src={img} />
            <Card.Content>
                <Card.Header textAlign="center">
                    {name}
                </Card.Header>
                <Card.Description>
                <Icon name="building"/>{school}
                <br></br><Icon name="book"/>{major}
                </Card.Description>
            </Card.Content>
        </Card>
    )
}

export default Profile;