import React, { Component } from 'react'
import ReactHighcharts from 'react-highcharts'
import {UserDB} from '../utils/Database'

var credits = [0, 0, 0, 0, 0, 0, 0, 0, 0]

const config = {
    chart: {
        type: 'column',
        height: "30%"
    },
    title : {
        text: " "
    },
    xAxis: {
        categories: ['1/spring', '1/fall',  '2/spring',  '2/fall', '3/spring', '3/fall',  '4/spring',  '4/fall','Seasonal'],
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
        name: '학점',
        data: credits
    }]
};

export default class StatusChartSemester extends Component {

    render() {
        UserDB.get("juan/taken").getJSON([])
        .then(takens => {
            var s1 = takens.filter(course => course["semester"] = {"season":"spring","year":1})
            var c1 = 0
            s1.forEach(course => {
                c1 += course["credit"]
            })
            credits[0] = c1
        })
        return (
            <ReactHighcharts config={config} />
        )
    }
}