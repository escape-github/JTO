import React, { Component } from 'react'
import { AreaChart } from "react-easy-chart";

export default class StatusChart extends Component{

    render() {
        return(
            <AreaChart
            interpolate={'cardinal'} 
            height={200}
            width={800}
            data={[
                [
                    { x: 1, y: 20 },
                    { x: 2, y: 30 },
                    { x: 3, y: 25 },
                    { x: 4, y: 40 },
                    { x: 5, y: 35 },
                ]
                ]}
            />
        )
    }
}