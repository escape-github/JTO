import React from 'react';
import ReactDOM from 'react-dom';
import Router from './Router';

require("./test/simulation.test")

// REACT
ReactDOM.render(<Router />, document.getElementById('root'));