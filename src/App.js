import React, { Component } from 'react';
import logo from "./logo.svg";
import './App.css';
import Profile from './Profile.js'
import prodo from './prodo.png'

class App extends Component {
  render() {
    return (
      <>
      <div class="header">
        <div class="Main-logo"><a href="localhost:3000"><img src={logo} alt=""></img></a></div>
        <div class="Main-title">JTO:Jol업Tl뮬레Ol터</div>
        <nav>
          <ul class="navigator">
            <li class="nav-item"><a href="localhost:3000">About</a></li>
            <li class="nav-item"><a href="http://naver.com">Naver</a></li>
            <li class="nav-item"><a href="http://google.com">Google</a></li>
          </ul>
        </nav>
      </div>
      <div class="body">
        <div class="profile">
          <Profile name="권기훈"
                   img={prodo}
                   school="KAIST"
                   major="전산학부"/>
        </div>
        <div class="course">
          <div class="search"><h2>search</h2></div>
          <div class="list"><h2>list</h2></div>
        </div>
      </div>
      </>
    );
  }
}

export default App;
