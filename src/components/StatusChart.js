import React, { Component } from 'react'
import { BarChart } from "react-easy-chart";

export default class StatusChart extends Component{

    render() {
        return(
            <BarChart
                colorBars
                width={300}
                margin={{top: 10, right: 0, bottom: 0, left: 30}}
                data={[
                {x: 'A', y: 20},
                {x: 'B', y: 30},
                {x: 'C', y: 40},
                {x: 'D', y: 20},
                {x: 'E', y: 40},
                {x: 'F', y: 25},
                {x: 'G', y: 5}
                ]}
            />
        )
    }
}