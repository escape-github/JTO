/*
    Search.js
    - a wrapping search bar

    Created by Juan Lee <juanlee@kaist.ac.kr>
*/

import React, { Component } from 'react';
import _ from 'lodash';
import { Search } from 'semantic-ui-react';

export default class SearchBar extends Component {
    // default props
    static defaultProps = {
        source: [],
        resultRenderer: ({과목명, 과목코드}) => <div>[{과목코드}] {과목명}</div>
    }

    // before mounting
    componentWillMount(){
        this._reset();
    }

    _reset(){
        this.setState({
            isLoading: false,
            results: [],
            value: ''
        });
    }

    // when result selected
    _onResultSelected = (e, { result }) => {
        if(this.props.onResultSelected)
            this.props.onResultSelected(result);
        else
            this.setState({
                value: result["과목명"]
            })
    }

    // when query changed
    _onQueryChanged = (e, { value }) => {
        this.setState({ isLoading: true, value });

        setTimeout(() => {
            if(this.state.value.length < 1) return this._reset();

            const re = new RegExp(_.escapeRegExp(this.state.value), 'i');
            const isMatch = result => re.test(result["과목명"]);

            this.setState({
                isLoading: false,
                results: _.filter(this.props.source, isMatch)
            });
        }, 300);
    }

    // render
    render() {
        const {isLoading, value, results} = this.state;

        return (
            <Search
                loading = {isLoading}
                onResultSelect = {this._onResultSelected}
                onSearchChange = {_.debounce(this._onQueryChanged, 500, {leading: true})}
                results = {results}
                value = {value}
                resultRenderer={this.props.resultRenderer}
            />
        )
    }
}