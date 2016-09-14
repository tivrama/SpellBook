// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };


// But instead we're going to implement it from scratch:
//You should use `document.body`, `element.childNodes`, and `element.classList`
var getElementsByClassName = function(className) {

//--take 1-------------------------------------------

//WORKS
// debugger
	//make an empty array to hold the results
	var results = [];
	//make function that takes the document body as its paramiter
	function checkClasses(body) {
		//check if the user input className is in the body's classlist
		if (_.contains(body.classList, className)) {
			//if so, push the list into the results
			results.push(body);
		}
		//loop through the body's childnodes
		_.forEach(body.childNodes, function(child) {
			//recursivly invoke this function on each childnode
			checkClasses(child);
		});
	}
	//run checkclasses on the body document
	checkClasses(document.body);
	//return results
	return results;

};







//--take 2-------------------------------------------

//ALSO WORKS
 // 	var results = [];
	// function checkClasses(body) {
	// 	if(body.classList){
	// 		if (body.classList.contains(className)) {
	// 			results.push(body);
	// 		}
	// 	}
	// 	_.forEach(body.childNodes, function(child) {
	// 		checkClasses(child);
	// 	});
	// }
	// checkClasses(document.body);
	// return results;

 // };

//--take 3-------------------------------------------

//ALSO WORKS
 // 	var results = [];
	// function checkClasses(body) {
	// 	if (body.classList && body.classList.contains(className)) {
	// 		results.push(body);
	// 	}
	// 	_.forEach(body.childNodes, function(child) {
	// 		checkClasses(child);
	// 	});
	// }

	// checkClasses(document.body);
	// return results;

 // };
