import React, { Component } from 'react'
import ReactHighcharts from 'react-highcharts'

const config = {
    chart: {
        type: 'column',
        height: "30%"
    },
    xAxis: {
        categories: ['1/Spring', '1/Fall',  '2/Spring',  '2/Fall', 'Seasonal'],
        gridLineWidth: 0,
        tickLength: 0
    },
    yAxis: {
        min: 0,
        title: {
            text: ''
        },
        stackLabels: {
            enabled: true,
            style: {
                fontWeight: 'bold',
                color: 'black'
            }
        },
        labels : "",
        gridLineWidth: 0
    },
    legend: {
        align: 'center',
        verticalAlign: 'top',
        floating: true,
        backgroundColor:'white',
        borderColor: '#CCC',
        borderWidth: 1,
        shadow: false
    },
    tooltip: {
        headerFormat: '<b>{point.x}</b><br/>',
        pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
    },
    plotOptions: {
        column: {
            stacking: 'normal',
            dataLabels: {
                enabled: false,
                color: 'white'
            }
        }
    },
    series: [{
        name: 'Major',
        data: [0, 3, 9, 10, 7,0,0,0,0,0]
    }, {
        name: 'General',
        data: [3,3,1,1, 7,0,0,0,0,0]
    }, {
        name: 'Basic',
        data: [17, 12,3,3, 7,0,0,0,0,0]
    }]
};

export default class CourseChart extends Component {
    render() {
        return (
            <ReactHighcharts config={config} />
        )
    }
}