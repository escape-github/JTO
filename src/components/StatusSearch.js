import _ from 'lodash'
import React, { Component } from 'react'
import { Search, Button, Grid, Dropdown } from 'semantic-ui-react'
import { CourseDB } from '../utils/Database';

const resultRenderer = ({ title, code }) => <div>[{code}] {title}</div>

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
    CourseDB.get('data').getJSON([])
    .then(courses => {
      this.source = this._generateSearchOptions(courses);
      this.departments = Object.keys(this.source).map(dep => ({text: dep, value: dep}));

      this.resetComponent();
    });
  }

  _generateSearchOptions(courses){
    var options = {};
    courses.forEach(course => {
      if(options[course.department]){
        options[course.department].results.push(course);
      }
      else{
        options[course.department] = {
          name: course.department,
          results: [
            course
          ]
        };
      }
    });
    return options;
  }

  resetComponent = () => this.setState({ isLoading: false, results: [], value: '' })

  handleResultSelect = (e, { result }) => {
    this.props.searched_course(result)
    this.setState({ value: result.title })
  }

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value })

    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent()

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
      const isMatch = result => re.test(result.title)

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
    const { isLoading, value, results, semester } = this.state;

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
            <Dropdown basic text={semester? semester : "Major"} options={this.departments} button 
                        onChange={(e, {value}) => {this.setState({semester: value})}} />
              <Dropdown basic text={semester? semester : "Semester"} options={this.departments} button 
                        onChange={(e, {value}) => {this.setState({semester: value})}} />
              <Button color="green">Add new</Button>
            </Grid.Column>
          </Grid>
    )
  }
}