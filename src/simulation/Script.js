/*
    Script.js
    - parse script and make a condition hierarchy

    Created by Juan Lee
*/

var Course = require("./Course.js");        // import Course
var Condition = require("./Condition.js");  // import Condition
var fs = require("fs");                     // import fs

/*
    function parseScript
    - fscript: a script file to read
    - taken: a course code list to parse
*/
function parseScript(fscript, taken){
    fscript = fscript;

    var json = JSON.parse(fs.readFileSync(fscript, "utf8"));
    var { courses, imports, groups, conditions } = json;

    // parse Courses from script
    // - TODO: need to change some target-specified fields
    var parsed_courses = [];
    var raw_courses = [];
    if(courses){
        courses.forEach(jsonfile => {
            var courseFile = JSON.parse(fs.readFileSync(jsonfile, "utf8"));
            raw_courses = courseFile["2018_Fall"];
            raw_courses.forEach(course => {
                parsed_courses.push(new Course({
                    name: course["과목명"], 
                    code: course["과목번호"], 
                    credit: course["강:실:학"]["학점"]
                }));
            });
        });
    }

    // parse imports
    var parsed_conditions = {};
    var parsed_groups = {};
    if(imports){
        Object.keys(imports).forEach(key => {
            var parsed = parseScript(imports[key], []);
            var conditions = parsed.conditions;
            var groups = parsed.groups;
            Object.keys(conditions).forEach(cond => {
                var newkey = "@" + key + "/" + cond.substr(1);
                parsed_conditions[newkey] = conditions[cond];
            });
            Object.keys(groups).forEach(group => {
                var newkey = "#" + key + "/" + group.substr(1);
                parsed_groups[newkey] = groups[group];
            });
        });
    }

    // parse Functions from script
    if(groups){
        Object.keys(groups).forEach(key => {
            var group = groups[key];
            if(group.constructor == Object){
                var result = raw_courses;
                if(group.filter){    // filter
                    Object.keys(group.filter).forEach(field => {
                        result = result.filter(course => course[field] === group.filter[field]);
                    });
                    result = result.map(value => value["과목번호"]);
                }
                if(group.include){   // include
                    group.include.forEach(code => {
                        if(code.charAt(0) === "#"){
                            result.push.apply(result, parsed_groups[code]);
                        }
                        else{
                            result.push(code);
                        }
                    });
                }
                if(group.exclude){  // exclude
                    group.exclude.forEach(code => {
                        if(code.charAt(0) === "#"){
                            exclude_group = parsed_groups[code];
                            result = result.filter(course => exclude_group.indexOf(course) == -1)
                        }
                        else{
                            result = result.filter(course => course !== code);
                        }
                    });
                }
                result = result.filter((course, pos) => result.indexOf(course) == pos); // remove duplicates
                parsed_groups[key] = result;
            }
            else if(group.constructor == Array){
                var result = [];
                group.forEach(code => {
                    if(code.charAt(0) === "#"){
                        result.push.apply(result, parsed_groups[code]);
                    }
                    else{
                        result.push(code);
                    }
                });
                parsed_groups[key] = result;
            }
        });
    }

    // make conditions
    if(conditions){
        Object.keys(conditions).forEach(key => {
            var condition = conditions[key];
    
            var candidates = [];
            condition.candidates.forEach(code => {
                if(code.charAt(0) === "#"){ // group
                    parsed_groups[code].forEach(code => {
                        var filtered = parsed_courses.filter(course => course.code === code);
                        if(filtered.length > 0){
                            candidates.push(filtered[0]);
                        }
                    });
                }
                else if(code.charAt(0) === "@"){ // condition
                    candidates.push(parsed_conditions[code]);
                }
                else{
                    var filtered = parsed_courses.filter(course => course.code === code);
                    if(filtered.length > 0){
                        candidates.push(filtered[0]);
                    }
                }
            });
    
            parsed_conditions[key] = new Condition(candidates, condition.number, condition.credit);
        });
    }

    // parse taken
    var parsed_taken = [];
    taken.forEach(code => {
        var filtered = parsed_courses.filter(course => course.code === code);
        if(filtered.length > 0){
            parsed_taken.push(filtered[0]);
        }
    });

    return {
        "courses": parsed_courses,
        "groups": parsed_groups,
        "conditions": parsed_conditions,
        "taken": parsed_taken
    };
}

module.exports = parseScript;   // export function parseScript