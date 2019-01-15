import _ from 'lodash'
import React, {Component} from 'react'
import {Search} from 'semantic-ui-react'
import course from './course.json'

const source = course

class SearchCourse extends Component {

    state = {
        "isLoading":false,
        "results": [],
        "value": ''
    }

    componentWillMount() {
        this.resetComponent()
    }
    
    resetComponent = () => this.setState({ isLoading: false, results: [], value: '' })

    resultSelectHandler = (e, { result }) => this.setState({ value: result.title })

    searchChangeHandler = (e, { value }) => {
        this.setState({ isLoading: true, value })
    
        setTimeout(() => {
          if (this.state.value.length < 1) return this.resetComponent()
    
          const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
          const isMatch = result => re.test(result.title)
    
          this.setState({
            isLoading: false,
            results: _.filter(source["2018_Fall"], isMatch)
          })
        }, 300)
      }

    render() {
        const { isLoading, value, results } = this.state
        return (
          <>
          <Search
            loading={isLoading}
            onResultSelect={this.resultSelectHandler}
            onSearchChange={_.debounce(this.searchChangeHandler, 500, { leading: true })}
            results={results}
            value={value}
            {...this.props}
          />
          </>
        )
    }
}

export default SearchCourse;