import React, { Component } from 'react'
import ReactHighcharts from 'react-highcharts'

const config = {
    chart: {
        type: 'bar'
    },
    title : {
        text: "전체 요약"
    },
    xAxis: {
        categories: ['기초', '전공', '교양'],
        title: {
            text: null
        },
        gridLineWidth: 0,
        tickLength: 0
    },
    yAxis: {
        min: 0,
        title: "",
        labels: "",
        gridLineWidth: 0
    },
    plotOptions: {
        bar: {
            dataLabels: {
                enabled: true
            }
        }
    },
    credits: {
        enabled: false
    },
    series: [{
        data: [107, 102, 64, 12, 12, 12],
        showInLegend: false
    }]
};

export default class StatusChartCategory extends Component {
    render() {
        return (
            <ReactHighcharts config={config} />
        )
    }
}