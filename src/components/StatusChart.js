import React, { Component } from 'react'
import ReactHighcharts from 'react-highcharts'

const config = {
    chart: {
        type: 'column'
    },
    title: {
        text: 'Title'
    },
    xAxis: {
        categories: ['1/Spring', '1/Fall', '2/Spring', '2/Fall', '3/Spring']
    },
    yAxis: {
        min: 0,
        title: {
            text: 'credits'
        },
        stackLabels: {
            enabled: true,
            style: {
                fontWeight: 'bold',
                color: 'gray'
            }
        }
    },
    legend: {
        align: 'right',
        x: -30,
        verticalAlign: 'top',
        y: 25,
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
        data: [5, 3, 4, 7, 2]
    }, {
        name: 'General',
        data: [2, 2, 3, 2, 1]
    }, {
        name: 'Basic',
        data: [3, 4, 4, 2, 5]
    }]
};

export default class CourseChart extends Component {
    render() {
        return (
            <ReactHighcharts config={config} />
        )
    }
}