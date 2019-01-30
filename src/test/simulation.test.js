/*
    main.js
    - test code for Graduation Algorithm

    Created by Juan Lee
*/

import {User} from "./User";

var taken = [
    "CS204", "CS206", "CS300", "CS311", "CS320", "CS330", "CS408",
    "CS202", "CS230", "CS310", "CS341", "CS350", "CS360", "CS376", "CS409", "CS420",
    "MAS212", "MAS241", "MAS311", "MAS321", "MAS331", "MAS341", "MAS355",
    "MAS272", "MAS370", "MAS430", "MAS441", "MAS442", "MAS456", "MAS476", "MAS477", "MAS480",
    "MSB230", "MSB235", "MSB236", "MSB237", "MSB238", "MSB341",
    "MSB201", "MSB337", "MSB338", "MSB354", "MSB370", "MSB401",
    "MSB215", "MSB301", "MSB316",
    "MSB200", "MSB204", "MSB351",
    "EE305", "EE405", "EE201", "EE204", "EE209", "EE202",
    "EE205", "EE210", "EE211", "EE303", "EE304", "EE312", "EE321", "EE326", "EE342", "EE362", "EE403"
];

var track = {major: "EE", minor: "EE", doubleMajor: "EE", advanced: null, individual: null};
var user = new User(taken, track);

console.log(user.checkMajor());
console.log(user.checkMinor());
console.log(user.checkDoubleMajor());