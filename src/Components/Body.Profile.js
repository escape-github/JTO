import React from "react"
import { Image, Card, Icon } from 'semantic-ui-react'

function Profile({name, img, school, major}){
    return(
        <Card fluid>
            <Image src={img} />
            <Card.Content>
                <Card.Header>
                    {name}
                </Card.Header>
                <Card.Description>
                <Icon name="building"/>{school}
                <br/><Icon name="book"/>{major}
                </Card.Description>
            </Card.Content>
        </Card>
    )
}

export default Profile;