/*
	User.js
	- User data

	Created by Minkyu Kim
*/

import parseScript from './Simulation';

/*
	Class User
	- taken : Course array
	- track : Array contains data about 4 track
	
	e.g., CS major, EE minor : ["CS", "EE", null, null, null]
*/

export class User {
    constructor(taken, track){
		this.taken = taken;
		
		var {major, minor, doubleMajor, advanced, individual} = track;
		this.major = major;
		this.minor = minor;
		this.doubleMajor = doubleMajor;
		this.advanced = advanced;
		this.individual = individual;
	}

	checkMajor(){
		var script = parseScript(`script_${this.major}.json`, this.taken);

		var Major = script.conditions[`@${this.major}Major`];
		var parsedTaken = script.taken;

		return Major.check(parsedTaken);
	}
}