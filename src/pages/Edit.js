import React, { Component } from 'react'
import { Table, Image, Input, Button, Confirm } from 'semantic-ui-react'

export default class Update extends Component{

    state = {
        img: "https://t1.daumcdn.net/brunch/static/img/sticker/frodo/10.png",
        name: "Username",
        major: "Major",
        school: "School",
        status: "lorem ipsum status",
        open: false
    }

    open = () => this.setState({ open: true })
    close = () => this.setState({ open: false })

    render() {

        const {img, name, major, school, status} = this.state

        return(
            <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell colSpan="2">Infomation Update</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
        
            <Table.Body>
              <Table.Row>
                <Table.Cell collapsing>Profile</Table.Cell>
                    <Table.Cell>
                        <Image src={img}></Image>
                        <Input transparent type="file"></Input>
                    </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Name</Table.Cell>
                <Table.Cell><Input placeholder={name} transparent></Input></Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>University</Table.Cell>
                <Table.Cell><Input placeholder={school} transparent></Input></Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Major</Table.Cell>
                <Table.Cell><Input placeholder={major}></Input></Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Status</Table.Cell>
                <Table.Cell><Input placeholder={status}></Input></Table.Cell>
              </Table.Row>
              <Table.Row>
                  <Table.Cell colSpan="2" textAlign="right">
                  <Button color="red" onClick={this.open}>Update</Button>
                  <Confirm open={this.state.open} onCancel={this.close} onConfirm={this.close} />
                  </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        )
    }
}