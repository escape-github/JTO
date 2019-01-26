/*
    main.js
    - test code for Graduation Algorithm

    Created by Juan Lee
*/

var parseScript = require("../src/utils/Simulation.js");   // import parseScript

var taken = [
    "CS204", "CS206", "CS300", "CS311", "CS320", "CS330", "CS408",
    "CS202", "CS230", "CS310", "CS341", "CS350", "CS360", "CS376", "CS409", "CS420"
];    // stored somewhere in user data
var script = parseScript("script.json", taken);

var CSMajorMand = script.conditions["@CSMajorMand"];
var CSMajorOpt = script.conditions["@CSMajorOpt"];
var CSMajor = script.conditions["@CSMajor"];
var parsedTaken = script.taken;

console.log("Mand: " + CSMajorMand.check(parsedTaken));
console.log("Opt : " + CSMajorOpt.check(parsedTaken));
console.log("CS  : " + CSMajor.check(parsedTaken));