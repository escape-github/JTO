import _ from 'lodash'
import React, { Component } from 'react'
import { Search } from 'semantic-ui-react'
import course from '../course.json'

const source = course

const resultRenderer = ({ 과목명, 과목코드 }) => <div>[{과목코드}] {과목명}</div>

export default class SearchExampleCategory extends Component {
  
  componentWillMount() {
    this.resetComponent()
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
        source,
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

          <Search
            category
            loading={isLoading}
            onResultSelect={this.handleResultSelect}
            onSearchChange={_.debounce(this.handleSearchChange, 500, { leading: true })}
            results={results}
            value={value}
            resultRenderer={resultRenderer}
            {...this.props}
          />

    )
  }
}