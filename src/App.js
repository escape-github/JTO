import React, { Component } from 'react';
import { Menu, Grid, Segment } from 'semantic-ui-react'

import Profile from './Profile.js'
import SearchCourse from './SearchCourse.js'

import logo from "./logo.svg";
import prodo from './prodo.png'
import './App.css';

class App extends Component {

  state = {

  }
  myCallBack = (course) => {
    this.setState({
      course:course
    })
  }

  render() {

    const {course} = this.state
    return (
      <>
      <Menu borderless size="massive">
        <Menu.Item>
          <img src={logo} alt=""/>  JTO:졸업시뮬레이터
        </Menu.Item>
        <Menu.Item name='about'>
          About
        </Menu.Item>
        <Menu.Item name='google' href="http://www.google.com">
          Go to Google
        </Menu.Item>
        <Menu.Item name='naver' href="http://www.naver.com">
          Go to Naver
        </Menu.Item>
      </Menu>

      <Grid centered container columns="equal">
        <Grid.Row stretched>
          <Grid.Column width={3}>
              <Profile name="권기훈"
                      img={prodo}
                      school="KAIST"
                      major="전산학부"/>
          </Grid.Column>
          <Grid.Column width={12}>
            <Grid.Row>
              <Segment>
                <SearchCourse searched_course={this.myCallBack}/><br></br>
                {course ? <div>[{course["과목코드"]}] {course["과목명"]} {course["과목구분"]}</div> : ""}
              </Segment>
            </Grid.Row>
            <Grid.Row>
              <Segment>
              </Segment>
            </Grid.Row>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      </>
    );
  }
}

export default App;
