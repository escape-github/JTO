/*
    Condition.js
    - Condition Interface & Implementations

    Created by Minkyu Kim
    Edited by Juan Lee
*/

/*
    class Condition
    - subconditions: array contains conditions(recursively) or Course(s) (base condition)
    - requiredNumber: number of conditions should be taken
    - requiredCredit: number of credits should be taken
*/
function Condition (subconditions, number, credit){
    this.subconditions = subconditions;
    this.requiredNumber = number;
    this.requiredCredit = credit;

    /*
        function getCredit
        - return the maximum satisfying credit of subconditions
    */
    this.getCredit = function(taken){
        credit = 0;
        this.subconditions.forEach(cond => {
            if(cond.check(taken) && credit < cond.credit){
                credit = cond.credit;
            }
        });
        return credit;
    }

    /*
        function check
        - return true if the condition satisfied, or false
    */
    this.check = function(taken){
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

// exports Condition
module.exports = Condition;