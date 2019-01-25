import React, { Component } from 'react'
import { BarChart } from "react-easy-chart";
import Database from '../utils/Database';

export default class StatusChart extends Component{
    state = {
        data: [
            {x: "A", y: 1},
            {x: "B", y: 1},
            {x: "C", y: 1},
            {x: "D", y: 1},
            {x: "E", y: 1},
            {x: "F", y: 1},
            {x: "G", y: 1},
            {x: "H", y: 1},
        ]
    }

    _makeChartFromDB(){
        if(this.props.user){
            var preprocess = {};
            Database.get("users").get(this.props.user.profile.username).get("taken").getJSON([])
            .then(courses => {
                courses.forEach(course => {
                    if(preprocess[course.semester]){
                        preprocess[course.semester] += course.credit;
                    }
                    else{
                        preprocess[course.semester] = course.credit;
                    }
                });

                var data = [];
                Object.keys(preprocess).forEach(semester => {
                    var posx = String.fromCharCode('A'.charCodeAt(0) + semester - 1);
                    data.push({x: posx, y: preprocess[semester]});
                });
                this.setState({data});
            });
        }
    }

    render() {
        this._makeChartFromDB();

        var {data} = this.state;
        return(
            <BarChart
                colorBars
                width={300}
                margin={{top: 10, right: 0, bottom: 0, left: 30}}
                data={data}
            />
        )
    }
}