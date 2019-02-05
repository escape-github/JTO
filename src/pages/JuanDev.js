/*
  Home.js
  - Header, Profile, Overview, Status
*/

import React, { Component, Fragment } from 'react';
import { Grid, Segment } from 'semantic-ui-react';
import ReactHighcharts from 'react-highcharts'

import SideCourseList from '../components/SideCourseList';
import TopBanner from '../components/Header';
import CourseChart from "../components/StatusChart";

class JuanDev extends Component {
    state = {
        hover: {
            title: "과목명",
            code: "",
            department: "",
            category: "",
            credit: ""
        }
    }

    _onLoggedIn(user){
        this.setState({
            user
        });
    }

    _onCourseSelected(course){

    }

    _onCourseHover(course){
        this.setState({
            hover: course
        });
    }

    render() {
        return (
            <Fragment>
                <TopBanner _onLoggedIn={this._onLoggedIn.bind(this)} />
                <Grid>
                    <Grid.Column width={3} style={{paddingRight:0}}>
                        <SideCourseList _onCourseSelected={this._onCourseSelected.bind(this)} _onCourseHover={this._onCourseHover.bind(this)} />
                    </Grid.Column>

                    <Grid.Column width={13} style={{marginTop: 40, padding:0}}>
                        <Grid stretched>
                            <Grid.Row>
                                <Grid.Column width={12} style={{paddingRight:0}}>
                                    <CourseChart />
                                </Grid.Column>
                                <Grid.Column width={3}>
                                    <ReactHighcharts config={{
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
                                            data: [107, 102, 64],
                                            showInLegend: false
                                        }]
                                        }} />
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column width={12} style={{paddingRight:0}}>
                                    <Segment />
                                </Grid.Column>
                                <Grid.Column width={3}>
                                    <Segment></Segment>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>                    
                    </Grid.Column>


                </Grid>
            </Fragment>
        );
    }
}

export default JuanDev;
