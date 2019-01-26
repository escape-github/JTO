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
    "EE202"
];
var track = {major: "MSB", minor: "MSB", doubleMajor: null, advanced: null, individual: null};
var user = new User(taken, track);

export default user.checkMajor();