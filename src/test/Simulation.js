/*
    Simulation.js
    - Simulation

    Originally Written by Minkyu Kim
    Created by Juan Lee
*/

/*
    class Condition
    - subconditions: array contains conditions(recursively) or Course(s) (base condition)
    - requiredNumber: number of conditions should be taken
    - requiredCredit: number of credits should be taken
*/
export class Condition {
    constructor({subconditions, number, credit, max}){
        this.subconditions = subconditions;
        this.requiredNumber = number;
        this.requiredCredit = credit;
        this.max = max;
    }

    /*
        function getCredit
        - return the maximum satisfying credit of subconditions
    */
    getCredit(taken){
        var credit = 0;
        this.subconditions.forEach(cond => {
            if(cond.check(taken) && credit < cond.credit){
                credit = cond.credit;
            }
        });
        if (this.max){
            return Math.min(credit, this.max);
        }
        return credit;
    }

    /*
        function check
        - return true if the condition satisfied, or false
    */
    check(taken){
        // need to satisfy number condition
        if(this.requiredNumber > 0){
            var cntSatisfied = this.subconditions.filter(cond => cond.check(taken)).length;
            if(cntSatisfied < this.requiredNumber){
                return false;
            }
        }
        // need to satisfy credit condition
        if(this.requiredCredit > 0){
            var sumSatisfied = 0;
            this.subconditions.forEach(cond => {
                if(cond.check(taken)){
                    sumSatisfied += cond.getCredit();
                }
            });
            if(sumSatisfied < this.requiredCredit){
                return false;
            }
        }

        return true;
    }
}

/*
    class Course
    - name: course name
    - code: course code
    - credit: course credit

    e.g., {"name":"introduction to programming", "code":"CS101", "credit":3}
*/
export class Course{
    constructor({name, code, credit}){
        this.name = name;
        this.code = code;
        this.credit = credit;
    }

    /*
        function compare
        - return true if this and given course are identical, or false
    */
    compare(other){
        return (this.name === other.name && this.code === other.code && this.credit === other.credit);
    }

    /*
        function check
        - return true if the course is in taken list, or false
    */
    check(taken){
        for(var i = 0; i < taken.length; i++){
            if(this.compare(taken[i]))
                return true;
        }
        return false;
    }

    /*
        function getCredit
        - return credit
    */
    getCredit = ()=>this.credit;
}

export default function parseScript(fscript, taken){
    var json = require(`./${fscript}`);
    var { courses, imports, groups, conditions } = json;

    // parse Courses from script
    // - TODO: need to change some target-specified fields
    var parsed_courses = [];
    var raw_courses = [];
    if(courses){
        courses.forEach(jsonfile => {
            var courseFile = require(`./${jsonfile}`);
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
            var result = [];
            if(group.constructor === Object){
                result = raw_courses;
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
                            var exclude_group = parsed_groups[code];
                            result = result.filter(course => exclude_group.indexOf(course) === -1)
                        }
                        else{
                            result = result.filter(course => course !== code);
                        }
                    });
                }
                result = result.filter((course, pos) => result.indexOf(course) === pos); // remove duplicates
                parsed_groups[key] = result;
            }
            else if(group.constructor === Array){
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
    
            parsed_conditions[key] = new Condition(candidates, condition.number, condition.credit, condition.max);
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