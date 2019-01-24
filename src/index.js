import React from 'react';
import ReactDOM from 'react-dom';
import Router from './Router';
//import Database from './utils/Database';

// Database Configuration
//Database.clearJSON(null);
/*
Database.get("users").get("juan").get("taken").putJSON([
    {
        title: "Test1"
    },
    {
        title: "Test2"
    },
    {
        title: "Test3"
    },
])*/

// REACT
ReactDOM.render(<Router />, document.getElementById('root'));