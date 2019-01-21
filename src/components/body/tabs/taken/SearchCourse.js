import _ from 'lodash'
import React, { Component } from 'react'
import { Search, Button, Grid } from 'semantic-ui-react'
import Database from '../../../../utils/Database';

const resultRenderer = ({ 과목명, 과목코드 }) => <div>[{과목코드}] {과목명}</div>

export default class SearchCourse extends Component {
  state = {
    source: {}
  }
  
  componentWillMount() {
    this.resetComponent()
  }

  componentDidMount() {
    Database.getJSON({}, '/allcourses')
    .then(source => {
      console.log(source);
      this.source = source;
    })

    /*
    Database.putJSON({
      "전산학부":{
          "name":"전산학부",
          "results":[
              {
                  "title": "",
                  "과목명": "이산구조",
                  "과목코드": "CS204",
                  "과목구분": "전공필수"
              },
              {
                  "title": "",
                  "과목명": "프로그래밍기초",
                  "과목코드": "CS101",
                  "과목구분": "기초필수"
              }
      
      ]
      },
  
      "수리과학과":{
          "name":"수리과학과",
          "results":[
              {
                  "title": "",
                  "과목명": "이산수학",
                  "과목코드": "MAS260",
                  "과목구분": "전공필수"
              }
      ]
      }
  
    }, '/allcourses'); */
  }

  resetComponent = () => this.setState({ isLoading: false, results: [], value: '' })

  handleResultSelect = (e, { result }) => {
    this.props.searched_course(result)
    this.setState({ value: result["과목명"] })
  }

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value })

    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent()

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
      const isMatch = result => re.test(result["과목명"])

      const filteredResults = _.reduce(
        this.source,
        (memo, data, name) => {
          const results = _.filter(data.results, isMatch)
          if (results.length) memo[name] = { name, results }

          return memo
        },
        {},
      )

      this.setState({
        isLoading: false,
        results: filteredResults,
      })
    }, 300)
  }

  render() {
    const { isLoading, value, results } = this.state
    return (
          <Grid columns="equal" padded="horizontally">
            <Grid.Column width={8}>
              <Search
                category
                loading={isLoading}
                onResultSelect={this.handleResultSelect}
                onSearchChange={_.debounce(this.handleSearchChange, 500, { leading: true })}
                results={results}
                value={value}
                resultRenderer={resultRenderer}
                input={{placeholder:"Find courses you took", size:"small", fluid:true}}
                {...this.props}
              />
            </Grid.Column>
            <Grid.Column>
              <Button>Major:CS</Button>
              <Button>Semester:2</Button>
              <Button color="green">Add new</Button>
            </Grid.Column>
          </Grid>
    )
  }
}