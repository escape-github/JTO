import React from 'react';
import ReactDOM from 'react-dom';
import Router from './Router';
//import Database from './utils/Database';

// Database Configuration
//Database.clearJSON(null);
/*
Database.get("users").get("juan").get("taken").putJSON([
    {
        title: "Test1",
        semester: 2,
        credit: 3
    },
    {
        title: "Test2",
        semester: 2,
        credit: 4
    },
    {
        title: "Test3",
        semester: 3,
        credit: 3
    },
    {
        title: "Test4",
        semester: 4,
        credit: 3
    },
    {
        title: "Test5",
        semester: 5,
        credit: 4
    },
    {
        title: "Test6",
        semester: 6,
        credit: 3
    },
])*/

// REACT
ReactDOM.render(<Router />, document.getElementById('root'));