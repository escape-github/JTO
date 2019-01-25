import _ from 'lodash'
import React, { Component } from 'react'
import { Search, Button, Grid, Dropdown } from 'semantic-ui-react'
import Database from '../utils/Database';

const resultRenderer = ({ 과목명, 과목코드 }) => <div>[{과목코드}] {과목명}</div>


const depOpt = [
  {
    text: "CS",
    value: "CS"
  },
  {
    text: "MAS",
    value: "MAS"
  },
  {
    text: "EE",
    value: "EE"
  },
  {
    text: "CH",
    value: "CH"
  },
  {
    text: "PH",
    value: "PH"
  },
]

export default class StatusSearch extends Component {
  state = {
    source: {},
    major: null,
    semester: null,
  }
  
  componentWillMount() {
    this.resetComponent()
  }

  componentDidMount() {
    Database.getJSON({}, '/allcourses')
    .then(source => {
      this.source = source;
    })
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
    const { isLoading, value, results, semester } = this.state
    return (
          <Grid columns="equal" padded="horizontally">
            <Grid.Column width={9}>
              <Search
                category
                loading={isLoading}
                onResultSelect={this.handleResultSelect}
                onSearchChange={_.debounce(this.handleSearchChange, 500, { leading: true })}
                results={results}
                value={value}
                resultRenderer={resultRenderer}
                input={{placeholder:"Find courses you took", size:"small", fluid:true}}
              />
            </Grid.Column>
            <Grid.Column>
              <Dropdown multiple selection options={depOpt} />
              <Dropdown text={semester? semester : "Semester"} options={depOpt} button 
                        onChange={(e, {value}) => {this.setState({semester: value})}} />
              <Button color="green">Add new</Button>
            </Grid.Column>
          </Grid>
    )
  }
}