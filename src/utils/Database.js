/*
    Database.js
    - handle data remotely

    Author @ Juan Lee (juanlee@kaist.ac.kr)
*/

// class Database
export default class DatabaseClass{
    constructor(endpoint){
        this.endpoint = endpoint;
    }

//---------------------------------------------------------------------------
// BASIC FUNCTIONS FOR JSON HANDLING
//---------------------------------------------------------------------------

    // getJSON: def -> Promise
    // - return <Promise> of json
    async getJSON(def){
        var data = await fetch(this.endpoint)
        .then(res => res.json())
        .then(json => json.result);

        // if data is null and default value is set up
        if(!data && def){
            return def;
        }
        return data;
    }

    // putJSON: json -> Promise
    // - return <Promise> after putting the json
    putJSON(json){
        return fetch(this.endpoint, {
            headers: {
                'Content-type': 'application/json',
            },
            method: 'PUT',
            body: JSON.stringify(json),
        });
    }

    // clearJSON: json -> void
    // - clear jsonstore at ENDPOINT
    clearJSON(){
        this.putJSON(null);
    }

//---------------------------------------------------------------------------
// SUB-DATABASE HANDLING
//---------------------------------------------------------------------------

    get(category){
        return new DatabaseClass(this.endpoint + "/" + category);
    }
}

export var UserDB = new DatabaseClass(process.env.REACT_APP_USER_ENDPOINT);
export var CourseDB = new DatabaseClass(process.env.REACT_APP_COURSE_ENDPOINT);