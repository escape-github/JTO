/*
    Database.js
    - handle data remotely

    Author @ Juan Lee (juanlee@kaist.ac.kr)
*/

// class Database
class Database{
    constructor(endpoint){
        this.endpoint = endpoint || process.env.REACT_APP_JSON_ENDPOINT;
    }

//---------------------------------------------------------------------------
// BASIC FUNCTIONS FOR JSON HANDLING
//---------------------------------------------------------------------------

    // getJSON: def -> Promise
    // - return <Promise> of json
    async getJSON(def, endpoint){
        var data = await fetch(endpoint ? this.endpoint + endpoint : this.endpoint)
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
    putJSON(json, endpoint){
        return fetch(endpoint ? this.endpoint + endpoint : this.endpoint, {
            headers: {
                'Content-type': 'application/json',
            },
            method: 'PUT',
            body: JSON.stringify(json),
        });
    }

    // clearJSON: json -> void
    // - clear jsonstore at ENDPOINT
    clearJSON(endpoint){
        this.putJSON(null, endpoint);
    }

//---------------------------------------------------------------------------
// SUB-DATABASE HANDLING
//---------------------------------------------------------------------------

    get(category){
        return new Database(this.endpoint + "/" + category);
    }
}

export default new Database();