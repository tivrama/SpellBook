
var _ = {};

// Returns whatever value is passed as the argument. This function doesn't
// seem very useful, but remember it--if a function needs to provide an
// iterator when the user does not pass one in, this will be handy.
_.identity = function(val) {
  return val;
};

/**
 * COLLECTIONS
 * ===========
 *
 * In this section, we'll have a look at functions that operate on collections
 * of values; in JavaScript, a 'collection' is something that can contain a
 * number of values--either an array or an object.
 *
 *
 * IMPORTANT NOTE!
 * ===========
 *
 * The .first function is implemented for you, to help guide you toward success
 * in your work on the following functions. Whenever you see a portion of the
 * assignment pre-completed, be sure to read and understand it fully before
 * you proceed. Skipping this step will lead to considerably more difficulty
 * implementing the sections you are responsible for.
 */
//---------------------------------------------------------------------------------
// Return an array of the first n elements of an array. If n is undefined,
// return just the first element.
_.first = function(array, n) {
  if(n === undefined){
    return array[0];
  }
  else{
    return array.slice(0, n);
  }
  // return n === undefined ? array[0] : array.slice(0, n);
};

//---------------------------------------------------------------------------------
// Like first, but for the last elements. If n is undefined, return just the
// last element.
_.last = function(array, n) {
  if(n === undefined){
    return array[array.length-1];
  }
  else if (n > array.length-1){
    return array;
  }
  else if (n === 0){
    return [];
  }
  else{
    return array.slice(n-1, array[array.length-1]);
  }
  // return n === undefined ? array[array.length-1] : array.slice(n-1, array[array.length-1]);
};

//---------------------------------------------------------------------------------
// Call iterator(value, key, collection) for each element of collection.
// Accepts both arrays and objects.
//
// Note: _.each does not have a return value, but rather simply runs the
// iterator function over each item in the input collection.
_.each = function(collection, iterator) {
  if(Array.isArray(collection)){
    for(var i = 0; i < collection.length; i++){
      iterator(collection[i], i, collection);
    };
  }
  else if (typeof collection === 'object'){
    for(var key in collection){
      iterator(collection[key], key, collection);
    };
  }
};



//=================Investigate this one ================================//

// Returns the index at which value can be found in the array, or -1 if value
// is not present in the array.
_.indexOf = function(array, target){
  // TIP: Here's an example of a function that needs to iterate, which we've
  // implemented for you. Instead of using a standard `for` loop, though,
  // it uses the iteration helper `each`, which you will need to write.
  var result = -1;
  _.each(array, function(item, index) {
    if (item === target && result === -1) {
      result = index;
    }
  });
  return result;
};
// console.log(_.indexOf(['cat', 'hamster','pig','dog'], 'hamster'));

//---------------------------------------------------------------------------------
// Return all elements of an array that pass a truth test.
_.filter = function(collection, test) {
  var results = [];
  _.each(collection, function(val){
    if(test(val)){
      results.push(val);
    }
  });
  return results;
};

//---------------------------------------------------------------------------------
// Return all elements of an array that don't pass a truth test.
_.reject = function(collection, test) {
  // TIP: see if you can re-use _.filter() here, without simply
  // copying code in and modifying it
  var results = [];
  _.each(collection, function(val){
    if(!test(val)){
      results.push(val);
    }
  });
  return results; 
};


// Solution from solutions video using _.filter
//   return _.filter(collection, function(val){
//     return !test(val);
//   });
// };


//---------------------------------------------------------------------------------
// Produce a duplicate-free version of the array.
_.uniq = function(array) {
  //create some type of storage to store uniq values
  var obj = {};
  var uniqValues = [];
  //iterate over array
  for(var i = 0; i< array.length; i++){
    //if current iteration matechs an objects's value
    if(array[i] !== obj[array[i]]){
       obj[array[i]] = array[i];
       uniqValues.push(array[i]);
    }
  }
  return uniqValues;
};

//--------------------------

  // This one works
//   var results = [];
//   _.each(array, function(val1, val2){
//     if(_.indexOf(array, val1) === val2){
//       results.push(val1);
//     }
//   });
//   return results;
// };

// var numbers = [1, 2, 1, 3, 1, 4];
// console.log(_.uniq([1, 2, 1, 3, 1, 4])); //[1, 2, 3, 4]
// console.log(_.uniq([1, 2, 2, 3, 4, 4])); //[1, 2, 3, 4]
// console.log(_.uniq(numbers), numbers); //[1, 2, 3, 4] [1, 2, 1, 3, 1, 4]



//--------------------------

  // Also works
//   var results = [];
//   for(var i = 0; i < array.length; i++)
//       if(_.indexOf(results, array[i]) === -1)
//           results.push(array[i]);
//   return results;
// };

// // logging the same tests that are in spec.
// var numbers = [1, 2, 1, 3, 1, 4];
// console.log(_.uniq([1, 2, 1, 3, 1, 4])); //[1, 2, 3, 4]
// console.log(_.uniq([1, 2, 2, 3, 4, 4])); //[1, 2, 3, 4]
// console.log(_.uniq(numbers), numbers); //[1, 2, 3, 4] [1, 2, 1, 3, 1, 4]

//---------------------------------------------------------------------------------
// Return the results of applying an iterator to each element.
_.map = function(collection, iterator) {
  // map() is a useful primitive iteration function that works a lot
  // like each(), but in addition to running the operation on all
  // the members, it also maintains an array of results.
  var results = [];
  _.each(collection, function(val){
    results.push(iterator(val));
  });
  return results;
};

/*
 * TIP: map is really handy when you want to transform an array of
 * values into a new array of values. _.pluck() is solved for you
 * as an example of this.
 */

//---------------------------------------------------------------------------------
// Takes an array of objects and returns and array of the values of
// a certain property in it. E.g. take an array of people and return
// an array of just their ages
_.pluck = function(collection, key) {
  // TIP: map is really handy when you want to transform an array of
  // values into a new array of values. _.pluck() is solved for you
  // as an example of this.
  return _.map(collection, function(item){
    return item[key];
  });
};

//---------------------------------------------------------------------------------
// Reduces an array or object to a single value by repetitively calling
// iterator(accumulator, item) for each item. accumulator should be
// the return value of the previous iterator call.
//  
// You can pass in a starting value for the accumulator as the third argument
// to reduce. If no starting value is passed, the first element is used as
// the accumulator, and is never passed to the iterator. In other words, in
// the case where a starting value is not passed, the iterator is not invoked
// until the second element, with the first element as its second argument.
//  
// Example:
//   var numbers = [1,2,3];
//   var sum = _.reduce(numbers, function(total, number){
//     return total + number;
//   }, 0); // should be 6
//  
//   var identity = _.reduce([5], function(total, number){
//     return total + number * number;
//   }); // should be 5, regardless of the iterator function passed in
//          No accumulator is given so the first element is used.
_.reduce = function(collection, iterator, accumulator) {
  if(accumulator === undefined){
    if(Array.isArray(collection)){
      accumulator = collection.shift();
    }
  }
  _.each(collection, function(val, index){
    accumulator = iterator(accumulator, val, index);
  });
  return accumulator;
};
// console.log(_.reduce([2, 3], function(tally, item) {return tally + item * item; }, 0));// 13



//---------------------------------------------------------------------------------
// Determine if the array or object contains a given value (using `===`).
_.contains = function(collection, target) {
  // TIP: Many iteration problems can be most easily expressed in
  // terms of reduce(). Here's a freebie to demonstrate!
  return _.reduce(collection, function(wasFound, item) {
    if (wasFound) {
      return true;
    }
    return item === target;
  }, false);
};


//---------------------------------------------------------------------------------
// Determine whether all of the elements match a truth test.
_.every = function(collection, iterator) {
  // TIP: Try re-using reduce() here.

  var checker = true;

  if(arguments[1] === undefined){
    _.reduce(arguments[0], function(value1, value2){
      if(value2){
        return true;
      }
      else{
        checker = false;
      }
    }, true);
  }

  else{
    _.reduce(collection, function(val1, val2){
      if(iterator(val2)){
        return true;
      }
      else{
        checker = false;
      }
    }, true);
  }

  return checker;
};

// console.log(_.every([true, true, true])); // --> true;
// console.log(_.every([true, true, false])); // --> false;
// console.log(_.every([false, false, false])); // --> false;


//---------------------------------------------------------------------------------
// Determine whether any of the elements pass a truth test. If no iterator is
// provided, provide a default one
_.some = function(collection, iterator) {
  // TIP: There's a very clever way to re-use every() here.

  var checker = false;

  if(arguments[1] === undefined){
    _.reduce(arguments[0], function(value1, value2){
      if(!value2){
        return false;
      }
      else{
        checker = true;
      }
    }, false);
  }

  else{
    _.reduce(collection, function(val1, val2){
      if(!iterator(val2)){
        return false;
      }
      else{
        checker = true;
      }
    }, false);
  }

  return checker;
};



//=============================================================================================
//=============================================================================================


/**
 * OBJECTS
 * =======
 *
 * In this section, we'll look at a couple of helpers for merging objects.
 */

// Extend a given object with all the properties of the passed in
// object(s).
//
// Example:
//   var obj1 = {key1: "something"};
//   _.extend(obj1, {
//     key2: "something new",
//     key3: "something else new"
//   }, {
//     bla: "even more stuff"
//   }); // obj1 now contains key1, key2, key3 and bla
_.extend = function(obj) {
  _.each(arguments, function(val){
    for(var key in val){
      obj[key] = val[key];
    }
  });
  return obj;
};

// var test = {name: 'Joel'};
// console.log(_.extend(test, {date: 'today', time: 'now'}));

//---------------------------------------------------------------------------------
// Like extend, but doesn't ever overwrite a key that already
// exists in obj
_.defaults = function(obj) {
  _.each(arguments, function(val){
    for(var key in val){
      if(obj[key] === undefined){
        obj[key] = val[key];
      }
    }
  });
  return obj;
};


/**
 * FUNCTIONS
 * =========
 *
 * Now we're getting into function decorators, which take in any function
 * and return out a new version of the function that works somewhat differently
 */

//---------------------------------------------------------------------------------
// Return a function that can be called at most one time. Subsequent calls
// should return the previously returned value.
_.once = function(func) {
  // TIP: These variables are stored in a "closure scope" (worth researching),
  // so that they'll remain available to the newly-generated function every
  // time it's called.
  var alreadyCalled = false;
  var result;

  // TIP: We'll return a new function that delegates to the old one, but only
  // if it hasn't been called before.
  return function() {
    if (!alreadyCalled) {
      // TIP: .apply(this, arguments) is the standard way to pass on all of the
      // infromation from one function call to another.
      result = func.apply(this, arguments);
      alreadyCalled = true;
    }
    // The new function always returns the originally computed result.
    return result;
  };
};

//---------------------------------------------------------------------------------
// Memorize an expensive function's results by storing them. You may assume
// that the function only takes primitives as arguments.
// memoize could be renamed to oncePerUniqueArgumentList; memoize does the
// same thing as once, but based on many sets of unique arguments.
//
// _.memoize should return a function that, when called, will check if it has
// already computed the result for the given argument and return that value
// instead if possible.
_.memoize = function(func) {
  // debugger
  var memo = {};

  return function() {
    var args = Array.prototype.slice.call(arguments);
    if (args in memo){
      return memo[args];
    }
    else{
      return (memo[args] = func.apply(this, args));
    }
  }
};

//--------------------------

// //Version from wk2 self assesment:
//   //make an object to hold a functions parameters and results
//   var cashed = {};
//   //make a function to act as a closer and store results in cashed
//   var memorizeAndSave = function() {
    
//     //adding a method to break arguments into a true array
//     var args = Array.prototype.slice.call(arguments);

//     //check if the input args are in cashed already
//     if(args in cashed) {
//         //if so, return the pre-calculated result
//         return cashed[args];
//       }
//     //if not, invoke the function on the args and store in cashed
//     else{
//       var invokeFunc = cashed[args] = func.apply(this, args);
//       return invokeFunc;
//     }
//   }
//   return memorizeAndSave;

// };


//--------------------------


// console.log(_.memoize(function() { console.log("Hello"); }));


//---------------------------------------------------------------------------------
// Delays a function for the given number of milliseconds, and then calls
// it with the arguments supplied.
//
// The arguments for the original function are passed after the wait
// parameter. For example _.delay(someFunction, 500, 'a', 'b') will
// call someFunction('a', 'b') after 500ms

_.delay = function(func, wait, c, d, e, f, g) {
  //var numOfParams = arguments.length;
  setTimeout(func, wait, c, d, e, f, g);
};
// _.delay(function(){console.log('Test')}, 2000);


/**
 * ADVANCED COLLECTION OPERATIONS
 * ==============================
 */

//---------------------------------------------------------------------------------
// Randomizes the order of an array's contents.
//
// TIP: This function's test suite will ask that you not modify the original
// input array. For a tip on how to make a copy of an array, see:
// http://mdn.io/Array.prototype.slice
_.shuffle = function(array) {
  var result = [];
  var cache = {};
  _.each(array, function (val, index) {
    while (result[index] === undefined) {
      var element = array[Math.floor(Math.random() * ((array.length ) ))];
      if (cache[element] !== true) {
        result[index] = element;
        cache[element] = true;
      } 
    }
  });
  return result;
};




/**
 * EXTRA CREDIT
 * =================
 *
 * Note: This is the end of the pre-course curriculum. Feel free to continue,
 * but nothing beyond here is required.
 */

// Calls the method named by functionOrKey on each value in the list.
// Note: You will need to learn a bit about .apply to complete this.
_.invoke = function(collection, functionOrKey, args) {

  if(typeof functionOrKey === "function"){
    return _.map(collection, function(val){
      // console.log(functionOrKey.apply(val))
      return functionOrKey.apply(val);
    });
  }
  else{  // This else is not working
    return _.map(collection, function(val){
      //not sure how "val[functionOrKey]" works, but it makes method work
      // console.log('val[functionOrKey]: ', val[functionOrKey]);
      var func = val[functionOrKey];
      return func.apply(val);
    });
  }
};


// var reverseit = function(){ return this.split('').reverse().join(''); };
// console.log('#1, Reverse Words: ', _.invoke(['dog', 'cat'], reverseit));
// console.log('#2, To Upper Case: ', _.invoke(['dog', 'cat'], 'toUpperCase'));



//---------------------------------------------------------------------------------
// Sort the object's values by a criterion produced by an iterator.
// If iterator is a string, sort objects by that property with the name
// of that string. For example, _.sortBy(people, 'name') should sort
// an array of people by their name.
_.sortBy = function(collection, iterator) {   //NOT WORKING  
  //make an array to capture resuts
  var sortArray = [];
  //push objects key/value pairs into the return array using a loop
  for (var key in collection){
    sortArray.push(collection[key])
  }

  //check if collection has any undefined
  if(_.contains(sortArray, undefined)) {
    return sortArray.sort();
  }
  //check if function
  if(typeof iterator === 'function') {
    collection.sort(function(a, b){
      return iterator(a, b);
    });
  }
  //check if iterator is length
  else if(iterator === 'length') {
    collection.sort(function(a, b){
      return a.length - b.length;
    }); 
  }

  else {
    return collection.sort();
  }

  return collection;

};


//---------------------------------------------------------------------------------
// Zip together two or more arrays with elements of the same index
// going together.
//
// Example:
// _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
_.zip = function(array1, array2, array3) {
      var zippedArray = [];
  for(var i = 0; i < array1.length; i++){
    zippedArray.push([array1[i], array2[i], array3[i]]);
  };
  return zippedArray;
};
// var arr1 = [2, 3, 4, 5, 6];
// var arr2 = ['hi', 'hello', 'hi again'];
// var arr3 = [true, false];
// var testZip = _.zip(arr1, arr2, arr3);
// console.log(test);
//---------------------------------------------------------------------------------
// Takes a multidimensional array and converts it to a one-dimensional array.
// The new array should contain all elements of the multidimensional array.
//
// Hint: Use Array.isArray to check if something is an array

_.flatten = function(nestedArray, result) {
  //use reduce to concat each element together
  return _.reduce(nestedArray, function(a, b){
    //check if an element is a nested array
    if(Array.isArray(b)){
      //use recursion to cycle through the nested layers
      return a.concat(_.flatten(b));
    }
    //otherwise, concat
    return a.concat(b); 
  }, []);

};

//this is way ugly.  Try using some kind of loop
//   return _.reduce(nestedArray, function(a, b){
//     if(Array.isArray(b)){
//       b = _.reduce(b, function(c, d){
//         if(Array.isArray(d)){
//           d = _.reduce(d, function(e, f){
//             if(Array.isArray(f)){
//               f = _.reduce(f, function(g, h){
//                 return g.concat(h);
//               }, []);
//             }
//             return e.concat(f);
//           }, []);
//         }
//         return c.concat(d);
//       }, []);
//     }
//     return a.concat(b);
//   }, []);
// }


  //works for one dimention deep
//   return nestedArray.concat().join(',').split(',');
// };

var arrTwoDimen = [1, [2], [3, [[[4]]]]];
var testFlatten = _.flatten(arrTwoDimen);
// console.log(testFlatten); //-->[1, 2, 3, 4]

//---------------------------------------------------------------------------------
// Takes an arbitrary number of arrays and produces an array that contains
// every item shared between all the passed-in arrays.
_.intersection = function(array1, array2, array3) {
  // put all agruments into one array
  var condencedArr = [];
  for(var i = 0; i < arguments.length; i++){
    condencedArr.push(arguments[i]);
  }

  return _.reduce(condencedArr.shift(), function(res, v) {
      if (_.indexOf(res, v) === -1 && _.every(condencedArr, function(a) {
          return _.indexOf(a, v) !== -1;
      })) res.push(v);
      return res;
  }, []);
};

// var array1 = [1, 2, 3, 4, 5, 6, 7];
// var array2 = [4, 5, 6, 7, 8, 9, 10];
// var array3 = [4, 5, 6, 7];
// var testIntersection = _.intersection(array1, array2, array3);
// console.log(testIntersection);


//---------------------------------------------------------------------------------
// Take the difference between one array and a number of other arrays.
// Only the elements present in just the first array will remain.
_.difference = function(array) {
  //make a cashe to store items
  var cashe = array;

  //loop through argument[1]
  for(var i = 0; i < arguments[1].length; i++) {
    //check if arguments are in cashe
    if(_.contains(cashe, arguments[1][i])){
      //loop through cashe to find value and delete
      for(var j = 0; j < cashe.length; j++) {
        if(cashe[j] === arguments[1][i]){
          cashe.splice(j, j); 
        }
      }
    }
  }

  if(arguments.length > 2){
  for(var k = 0; k < arguments[2].length; k++) {
    //check if arguments are in cashe
    if(_.contains(cashe, arguments[2][k])){
      //loop through cashe to find value and delete
      for(var l = 0; l < cashe.length; l++) {
        if(cashe[l] === arguments[2][k]){
          cashe.splice(l, l+1); 
        }
      }
    }
  }
}

  return cashe;

};

// now solve using recursion??





//---------------------------------------------------------------------------------
// Returns a function, that, when invoked, will only be triggered at most once
// during a given window of time.  See the Underbar readme for extra details
// on this function.
//
// Note: This is difficult! It may take a while to implement.
_.throttle = function(func, wait) {
  var cashe = {};

  return function() {
    var args = Array.prototype.slice.call(arguments);
    //check if func is in cashe.  If so, then use delayed timeout
    if(args in cashe){
// console.log(wait);
// console.log(setTimeout((func.apply(this, args)), wait));
      return setTimeout((func.apply(this, args)), wait);
    }
    else {
      //if func is not in cash, then put it in cashe
      cashe[args] = func;
// console.log(cashe);
      //run the function
// console.log(func.apply(this, args));
      return func.apply(this, args);
    }  
  }

};

var throttleTestFunc = function() {
  console.log('hello world');
};

// console.log(_.throttle(throttleTestFunc, 1000));
// console.log(_.throttle(throttleTestFunc, 1000));
// console.log(_.throttle(throttleTestFunc, 1000));