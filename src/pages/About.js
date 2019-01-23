import React, { Component } from 'react';

class About extends Component {
    componentWillMount(){
        window.location = "https://github.com/escape-github/JTO";
    }

    render() {
        return (
            <p>Redirecting...</p>
        );
    }
}

export default About;
