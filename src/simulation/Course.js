/*
    Course.js
    - Course Interface & Implementations

    Created by Minkyu Kim
    Edited by Juan Lee
*/

/*
    class Course
    - name: course name
    - code: course code
    - credit: course credit

    e.g., {"name":"introduction to programming", "code":"CS101", "credit":3}
*/
function Course ({name, code, credit}){
    this.name = name;
    this.code = code;
    this.credit = credit;
    this.isCourse = true;

    /*
        function compare
        - return true if this and given course are identical, or false
    */
    this.compare = function(other){
        return (this.name === other.name && this.code === other.code && this.credit === other.credit);
    }

    /*
        function check
        - return true if the course is in taken list, or false
    */
    this.check = function(taken){
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
   this.getCredit = ()=>this.credit;
}

// exports Course
module.exports = Course;