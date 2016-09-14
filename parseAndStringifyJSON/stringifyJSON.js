// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

 
var stringifyJSON = function(obj) {
//This works by checking the many types obj could be, and then making a function for each case.  All the solutions are concated into a string

	//this loop works for stringifing arrays and for nested arrays
	//determin if paramiter is an array
	if(Array.isArray(obj)) {
	//declare vars according the if input is array
	    var json = '',
	    	open = '[',
	    	close = ']';
	    // loop through the object
	    for (var property in obj) {
	    	//if it has a property, concat it
        	if (obj.hasOwnProperty(property)) {
        		//check if val is null and return as a string
	            if (obj[property] === null) {
                	json += 'null,';
            	}
        		//if the property is already a string, put string in ""
        		else if (typeof obj[property] === 'string') {
					json += '"' + obj[property] + '",';
		    	}
		    	//or if it is a boolean or number, do not put in ""
		    	else if (typeof obj[property] === 'number' || typeof obj[property] === 'boolean') {
		    		json += obj[property] + ',';
		    	}
				//look for nested object
            	else if (typeof obj[property] === 'object') {
            		//use recursion on nested object
                	json += stringifyJSON(obj[property]) + ',';
            	}
	        }
	    }
	    //turn into an array of chars
	    json = json.split('');;
	    //remove the last comma
	    json.pop()
	    //join the array again
	    json = json.join('');
	    //add the brackets
	    json = open + json + close;
	    return json.toString();

	}
	
	//check if it is a single value that is null
	else if (obj === null) {
	    return 'null';
	}

	//check if it is a single value that is string.  If so, add '""'
	else if (typeof obj === 'string') {

		return '"' + obj + '"';
	}

	//check if it is a number boolean and return as string
	else if (typeof obj === 'number' || typeof obj === 'boolean') {

	    return obj.toString();
	}


	//for all other cases, is must be an object.  This will stringify objects, and nested objects
	else {
		//decalare vars
	    var json = '',
	    	open = '{',
	    	close = '}';
	    // loop through the object
	    for (var property in obj) {
	    	//if it has a property, concat it
	        if (obj.hasOwnProperty(property)) {
		        if (obj[property] === null) {
	                json += '"' + property + '":' + 'null,';
	            }
	        	//if the property is already a string, put string in ""
	        	else if (typeof obj[property] === 'string') {
					json += '"' + property + '":"' + obj[property] + '",';
			    }
			    //or if it is a boolean or number, do not put in ""
			    else if (typeof obj[property] === 'number' || typeof obj[property] === 'boolean') {
			    	json += '"' + property + '":' + obj[property] + ',';
			    }
			    //look for nested object
	            else if (typeof obj[property] === 'object') {
	            	//use recursion on nested object
	                json += '"' + property + '":' + stringifyJSON(obj[property]) + ',';
	            }

	        }
	    }
	    //turn into an array of chars
	    json = json.split('');
	    //remove the last comma
	    json.pop()
	    //join the array again
	    json = json.join('');
	    //add the brackets
	    json = open + json + close;
	    return json.toString();
	}

};



//--* tests *----------------------------------------


var objectTest = [
  9,
  null,
  true,
  false,
  "Hello world",
  [],
  [8],
  ["hi"],
  [8, "hi"],
  [1, 0, -1, -0.3, 0.3, 1343.32, 3345, 0.00011999999999999999],
  [8, [[],3,4]],
  [[[["foo"]]]],
  {},
  {"a": "apple"},
  {"foo": true, "bar": false, "baz": null},
  {"boolean, true": true, "boolean, false": false, "null": null },
  // basic nesting
  {"a":{"b":"c"}},
  {"a":["b", "c"]},
  [{"a":"b"}, {"c":"d"}],
  {"a":[],"c": {}, "b": true}
];


// var test = _.forEach(objectTest, function(test){
// 	console.log("Test result: ", stringifyJSON(test));
// 	console.log("JSON target: ", JSON.stringify(test));
// });
// console.log(test);

// console.log("Test Final result: ", stringifyJSON(objectTest));
// console.log("JSON Final target: ", JSON.stringify(objectTest));
