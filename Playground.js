var obj = {};

var arr = [1, 2, 3, 4, 5, 6, 7, 8],
  arr2 = [2, 4, 6, 8],
  arr3 = [1, 3, 5, 7, 9];

obj.name = 'joel';

obj['(#)'] = 'funny key';

var date = 'date';

obj[date] = 365;

var print = function(pThis){
  console.log(pThis);
};

var sum = function(a, b){
  return a + b;
};

var even  = function(a){
  if(a % 2 === 0){
    return true;
  }
  else{
    return false;
  }
};



var each = function(collection, callback){
  if(Array.isArray(collection)){
    for(var i = 0; i < collection.length; i++){
      callback(collection[i], i, collection);
    };
  }
  else if(typeof collection === 'object'){
    for(var key in collection){
      callback(collection[key], key, collection);
    };
  }
  else{
    console.log('"' + collection + '" is not a collection');
  }
};


var map = function(collection, callback){
  var results = [];
  each(collection, function(val){
    results.push(callback(val));
  });
  return results;
};

var reduce = function(collection, callback, start){
  each(collection, function(val){
    start = callback(start, val)
  });
  return start;
};

// console.log(reduce(arr, function(val1, val2){  // --> works 36
//  return val1 + val2;
// }, 0));

var filter = function(collection, callback){
  var results = [];
  each(collection, function(val){
    if(callback(val)){
      results.push(val);
    }
  });
  return results;
};
// console.log(filter(arr, function(num){
//  if(num % 2 ===0){return true;}
// }));


var every = function(collection, callback){
  var checker = true;
  each(collection, function(val){
    if(!callback(val)){
      checker = false;
    }
  });
  return checker;
};

// console.log(every(arr, even));

var some = function(collection, callback){
  var checker = false;
  each(collection, function(val){
    if(callback(val)){
      checker = true;
    }
  });
  return checker;
};
// console.log(some(arr3, even));


var indexOf = function(array, target){

var result = -1;
each(array, function(item, index) {
  if (item === target && result === -1) {
    result = index;
  }
});
return result;
};



//-----------------------------------------------------------------------------------
// Produce a duplicate-free version of the array.
var uniq = function(array){
    var results = [];
    for(var i = 0; i < array.length; i++){
        if(indexOf(results, array[i]) === -1){
            results.push(array[i]);
        }
    }
    return results;
  };

  // // logging the same tests that are in spec.
  var numbers = [1, 2, 1, 3, 1, 4];
  // console.log(uniq(['green', 'blue', 'yellow', 'blue', 'green', 'red'])); //[1, 2, 3, 4]
  // console.log(uniq([1, 2, 2, 3, 4, 4])); //[1, 2, 3, 4]
  // console.log(uniq(numbers), numbers); //[1, 2, 3, 4] [1, 2, 1, 3, 1, 4]

//-----------------------------------------------------------------------------------
// Memorize an expensive function's results by storing them. You may assume
// that the function only takes primitives as arguments.
// memoize could be renamed to oncePerUniqueArgumentList; memoize does the
// same thing as once, but based on many sets of unique arguments.
//
// _.memoize should return a function that, when called, will check if it has
// already computed the result for the given argument and return that value
// instead if possible.
var memoize = function(){

    var chashed = {};

    var memorizeAndSave = function() {
      if(arguments in chashed){
          return chashed[arguments];
        }
    else{
      return (chashed[arguments] = func.apply(this, arguments));
    }
    }
    return memorizeAndSave;
}

var sumIt = function(a, b){
  return a + b;
}

var test1 = memoize(sumIt(3, 4));
// console.log(test1);
var test2 = memoize(sumIt(3, 4));
// console.log(test2);
//-----------------------------------------------------------------------------------
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
var extend = function(){
    // each(arguments, function(val){
    //   for(var key in val){
    //     obj[key] = val[key];
    //   }
    // });
    // return obj;
    for(var i = 0; i < arguments.length; i++){
      //now go through the obects
      for(var key in arguments[i]){
        //add the argument objects to the original object
        obj[key] = arguments[i][key];
      }
    }
    return obj

};

// var newObjPenny = {name: 'Penny!!'};
// console.log(extend(newObjPenny, {activities: 'running', food: 'kibble'}));


//-----------------------------------------------------------------------------------



// ====================================================

//use reduce to see if any keys in object are undefined

var obj1 = {
  name: 'Joel',
  day: 'today',
  number: 7
};

var obj2 = {
  name: '',
  day: 'today',
  number: 7 
};

var obj3 = {
  name: 'Joel',
  day: '',
  number: 7
};

var obj4 = {
  name: 'Joel',
  day: 'today',
  number: ''
};

var checkUndefinedKeys = function(collection){
  var checker = true;
  reduce(collection, function(val1, val2){
    if(val2){
      return true;
    }
    else{
      checker = false;
    }
  }, true);
  return checker;
};

console.log('checking undefined keys: ', checkUndefinedKeys(obj1));
console.log('checking undefined keys: ', checkUndefinedKeys(obj2));
console.log('checking undefined keys: ', checkUndefinedKeys(obj3));
console.log('checking undefined keys: ', checkUndefinedKeys(obj4));

// ====================================================

// use reduce to find number of same strings in an array

var string = function(array, string){
  return reduce(array, function(val1, val2){
    // console.log(val1, val2);
    if(typeof val1[val2] !== 'undefined'){
      val1[val2]++;
      return val1;
    }
    else{
      val1[val2] = 1;
      return val1;
    }
  }, {});
};
var strColl = ['hello', 'hi', 'bye', 'sup', 'hello', 'yup'];
// console.log(string(strColl, 'hello'));




var fruits = ['apple', 'orange', 'grape', 'apple'].reduce(function(fruitsCount, currentFruit){
    if(typeof fruitsCount[currentFruit] !== "undefined"){
      fruitsCount[currentFruit]++; 
      return fruitsCount;
    } else {
        fruitsCount[currentFruit]=1; 
        return fruitsCount;
    }
}, {});

var fruitsArray = [];
for(var x in fruits){
    fruitsArray.push(x + ": " + fruits[x]);
}

// console.log(fruitsArray);




// ====================================================
// use reduce to sum only even numbers in an array

var sumEvens = function(collection){
  return reduce(collection, function(val1, val2){
    if(val1 % 2 === 0){
      // console.log('val1 in if: ' + val1);
      return val1 + val2;
    }
    else{
      // console.log('val2 in else: ' + val2)
      return val2;
    }
  }, 0);
};

// console.log(sumEvens(arr));

var car = [];
car['gato'] = 'cat';
car['kitty'] = 'cartoon';
car['tiger'] = 'lilly';
car[0] = 'Hello';
car[1] = 'World';


// for(var i = 0; i < car.length; i++){
//  console.log(car[i]);
// };
var fun = function(a, b, c, d, e, f){
  // console.log(arguments.length);

};
fun('hello', 'world');

var testObj = {
  name: 'Joel'
};
testObj['thing'] = testObj;


//  Weird Stuff  ==== This actually works =====================================
    var add = new Function("a", "b", "return a + b;");
    // console.log(add(1, 2));
// ============================================================================

// console.log(Array(2 + 1).join("Hello ")); // Hello Hello

// ============================================================================





// ============================================================================
//constructor:
function Person(firstname, lastname, number, email){
  this.firstname = firstname,
  this.lastname = lastname,
  this.number = number,
  this.email = email
};

Person.prototype.getFullName = function(){
  return this.firstname + ' ' + this.lastname;
};

var joel = new Person('Joel', 'Schoolnik', 5103765679, 'j@s.com');
var penny = new Person('Penny', 'the dog', 5103765679);

// console.log(joel.getFullName());



// ============================================================================

//Allows ineritance of objects.  

// if (typeof Obct.begetObject();

  var range = function(start, stop, step) {
    if (arguments.length <= 1) {
      stop = start || 0;
      start = 0;
    }
    step = arguments[2] || 1;

    var len = Math.max(Math.ceil((stop - start) / step), 0);
    var idx = 0;
    var range = new Array(len);

    while(idx < len) {
      range[idx++] = start;
      start += step;
    }

    return range;
  };

  // console.log(range(1, 5));

// ============================================================================


/*
Recursion
Fibonacci sequence, whereby each element in the sequence is equal to the sum of the two previous elements: 1, 1, 2, 3, 5, 8, 13, 21... 
*/

function growBeanstalk(years) {
  // Base case
  // debugger
  if (years <= 2) {
    return 1;
  } 
  // Recursive case
  return growBeanstalk(years - 1) + growBeanstalk(years - 2); 
}

// Set the height of the beanstalk using your function
var height = growBeanstalk(6);

// console.log(height);

//-------------------------------------------------------

var stack = [];
// 2. Define the function countDown(int) 
var countDown = function(int){
    stack.push(int);
    if(int === 1) {
        return 1;
    }
    countDown(int - 1);
};

// 3. Call countDown() on an integer
// countDown(5);
// And now let's have a look at that stack:
// console.log(stack);

//-------------------------------------------------------

var stack = [];

function countDown(int) {
  stack.push(int);
  if (int === 1) {  
    return 1;
  }
    return countDown(int - 1);
}

function multiplyEach() {
  // Remove the last value of the stack 
  // and assign it to the variable int
  int = stack.pop();
  x = stack.length;
  // Base case
  if (x === 0) {
    return int;
  }
  // Recursive case
  else {
  stack[x - 1] = int * stack[x - 1];
  return multiplyEach();
  }
}

// Call the function countDown(7)
// countDown(7);
// And then print out the value returned by multiplyEach()
// console.log(multiplyEach());


//-------------------------------------------------------

// Our array of messy words
var capitals = ["berlin", "parIs", "MaDRiD"];

// Capitalize function
function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

// Our recursive function
function fixLetterCase(array, i) {    
  // Base case
  if (i === array.length) {
    return;
  } 
  // Action
  array[i] = capitalize(array[i]);
  // Recursive case
  return fixLetterCase(array, i + 1);
}

// Here is our function call
// fixLetterCase(capitals, 0);
// console.log(capitals);

//-------------------------------------------------------

var capitals = [ ["berlin", "parIs", "MaDRiD"], 
                 ["monTEvideo", "BrASiLia"],
                 ["dElhi", "toKYo", "BeiJing"],
                 ["CanBerra"],
                 ["kiGaLi", "pretoRIA"] ];

// Capitalize function
function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

// Our recursive function
function fixLetterCase(array, x, y) {
  if (y === array.length){
    return;
  }
  else if (x === array[y].length) {
    return fixLetterCase(array, 0, y + 1);
  }
  else {
    array[y][x] = capitalize(array[y][x]);
    return fixLetterCase(array, x + 1, y);
  } 
}

// fixLetterCase(capitals, 0, 0);
// console.log(capitals);

//-------------------------------------------------------

function factorial(n) {
  if (n < 0) {
    // Termination condition to prevent infinite recursion
    console.log('help');
    return;
  }
  // Base case
  if (n === 0) {
    return 1;
  }
  // Recursive case
  return n * factorial(n -1);
}

// factorial(-1);
// factorial(5);  //WTF??  Does not really work.  CodeAccademy lies

//-------------------------------------------------------


function guessNumber(number, clue) {
  // Prompt the user for a number using the string value of clue
  
  guess = prompt(clue);
  // Convert their guess to a number using +
  guess = +guess;
  
  while (guess !== number) {
    if (guess < number) {
      guess = prompt("Too low. Guess again.");
    }
    else if (guess > number) {
      guess = prompt("Too high. Guess again.");
    }
    guess = +guess;
  }
  
  console.log("You got it! The number was " + number);
}
// guessNumber(50, 'guess');

//-------------------------------------------------------

// Here is the array we will store results in
var multiples = [];

function multiplesOf(base, i) {
  // Base case
  if (i === 0) {
  // Write the array multiples to the console
  console.log(multiples);
  }
  // Recursive case
  else {
    multiples[i - 1] = base * i;
  // Add a recursive function call
  multiplesOf(base, i-1);
  } 
}

// multiplesOf(2, 4);


//-------------------------------------------------------

var fibonacciNumber= function(n){
  //using loop (from http://www.programmingsimplified.com/c-program-generate-fibonacci-series)
  var counter,
      first = 0,
      second = 1,
      next = 0;

  for(counter = 0; counter < n; counter++) {

    next = first + second;
    first = second;
    second = next;

  }
  return next;
}


  // using recursion - Solved with Albrey on 4/19
//   var count = 0;
//   var fibo = function(n){
    
//     console.log("depth of recursion:", count);
//     console.log("current number", n);
    
//     if(n <= 1){
//       return n;
//     }
//     count++
//     return fibo(n-1) + fibo(n-2);
//   } 
  
//   return fibo(n);
  
// };

//  from CodeAccademy
// var fibonacciNumber = function(n){
//    if(n <= 2) {
//    return 1;
//  }
//  return fibonacciNumber(n-1) + fibonacciNumber(n-2);
// }

// var fibonacciNumber = function(n){
//  if(n === 0) {
//    return 0;
//  }
//  else if(n === 1){
//    return 1;
//  }
//  else {
//    return fibonacciNumber(n-1) + fibonacciNumber(n-2);
//  }
// }


console.log(fibonacciNumber(6));
//Target ==> 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, ... -- so if n = 6,  will === 8
//  Fn = Fn−1 + Fn−2 for n ≥ 2 with F0 = 0, F1 = 1.





















//******************************************************************************************************












//  Make a function that takes an array of accending number, but that skips randome number.  The functions and array with the missing numbers.


function findMissingNumbers(arr){
  var nums = [];
  for(var i = 0; i < arr.length-1; i++){
    if(arr[i] + 1 !== arr[i+1]){
      nums.push(arr[i] + 1);
    }
  };
  for(var i = 0; i < arr.length-1; i++){
    if(arr[i] + 2 !== arr[i+2]){
      nums.push(arr[i] + 2);
    }
  };  
  nums.sort();
  for(var i = 0; i < nums.length-1; i++){
    if(nums[i] === nums[i+1]){
      nums.splice(i,+1);
    }
  }; 
  if(nums[nums.length-1] >= arr[arr.length-1]){
    nums.splice(nums.length-1);
  }
  return nums;  
};

function findMissingNumbers(arr){
  
};

console.log(findMissingNumbers([-3,-2,1,4])); // Works  --> [-1, 0, 2, 3]
console.log(findMissingNumbers([-1,0,1,2,3,4])); //  Works  --> []
console.log(findMissingNumbers([]));  //  Works  --> []
console.log(findMissingNumbers([-18, 19]));  //  Not working
// ===============================================================



var list1 = {value: 1, next: {value: 2, next: {value: 3, next: null}}};
var list2 = {value: "foo", next: {value: "bar", next: null}};

function listToArray(list) {
  // make an array to 
  // for in loop to cycle through the objects. Loop through until next = null 
  for(var key in list){
    if(list['next'] === null){

    }

  }

  // include this in the loop - if list['next'] = null, return array


};



console.log(listToArray(list1));  //  --> [1, 2, 3]
console.log(listToArray(list2));  //  --> ["foo", "bar"]





// ============================================================
function XO(str) {
    return str.toLowerCase().split('x').length === str.toLowerCase().split('o').length;
};

function XO(str) {
    //make arrays to capture x & o and compare length
    var xX = [];
    var oO = [];
    //break string into array of chars
    var testArr = str.split('');
    //loop array and push o, O into an array for O
    for(var i = 0; i < testArr.length; i++){
      if(testArr[i] === 'o' || testArr[i] === 'O'){
        oO.push(testArr[i]);
      }
    };
    //loop array and push x or X into array for X
    for(var i = 0; i < testArr.length; i++){
      if(testArr[i] === 'x' || testArr[i] === 'X'){
        xX.push(testArr[i]);
      }
    };    
    //if langth of O array matches that of X array, the it is true
    if(xX.length === oO.length){
      return true;
    }
    else{
      return false;
    }
};
console.log(XO('xo'));  //  should be true
console.log(XO("xxOo"));
console.log(XO("xxxm"));
console.log(XO("Oo"));
console.log(XO("ooom"));





// ===============================================================

// Return the nth triangular number.  If n doesn't work, return 0.  
// triangular(4); -> 10
//****
//***
//**
//*
function triangular( n ) {
  return (n > 0) ? ((n * n) + n) / 2 : 0;
};

function triangular( n ) {
  if(n < 1){
    return 0;
  };
  var t = 0
  while(n > 0){
    t += n;
  n--;
  };
  return t;
};

triangular(4);

// ===============================================================

// See if a string has a number

function hasNumber(myString) {
  return (/\d/.test(myString));
};

hasNumber('ddhr4hrhch');





// ===============================================================


var containers = [
  {container: 'TGHU8568573', line: 'MOL', bol: 'MOLU1122334455', vessel: 'APL Mumbai', available: '',lfd: ''}, 
  {container: 'HDMU9871256', line: 'HUD', bol: 'HDMU1122334455', vessel: 'NYK Atlanta', available: '', lfd: ''},
  {container: 'NYKU5647382', line: 'NYK', bol: 'NYKU1122334455', vessel: 'NYK Atlanta', available: '', lfd: ''}
];



// ===============================================================

var arr = [1, 2, 3, 4, 5, 6, 7, 8],
    arrEven = [2, 4, 6, 8, 10],
    arrOdd = [1, 3, 5, 7, 9],
    obj = {
      name: 'Joel',
      date: 'Today',
      learning: true
    };

var addTogether = function(a, b){
  return a + b;
};

var doubleIt = function(a){
  return a * 2;
};

var isItEven = function(a){
  if(a % 2 === 0){
    return true;
  }
  else{
    return false;
  }
};

var each1 = function(collection, callback){
  if(Array.isArray(collection)){
    for(var i = 0; i < collection.length; i++){
      callback(collection[i]);
    };
  }
  else if(typeof collection === 'object'){
    for(var key in collection){
      callback(collection[key])
    };
  }
  else{
    console.log('First parameter is not a collection');
  }
}

var each2 = function(collection, callback){
  if(collection.length){
    for(var i = 0; i < collection.length; i++){
      callback(collection[i]);
    };
  }
  else{
    for(var key in collection){
      callback(collection[key])
    };
  }
}

var filter1 = function(collection, callback){
  var filtered = [];
  each1(collection, function(val){
    if(callback(val)){
      filtered.push(val);    
    }
  });
  return filtered;
};

var map1 = function(collection, callback){
  var newCopy = [];
  each1(collection, function(val){
    newCopy.push(callback(val));
  });
  return newCopy;
};

console.log(map1(arr, doubleIt));

var reduce1 = function(collection, callback, start){
  each1(collection, function(val){
    start = callback(start, val)
  });
  return start;
};

console.log(reduce1(arr, addTogether, 0));

var some1 = function(collection, callback){
  var checker = false;
  each1(collection, function(val){
    if(callback(val)){
      checker = true;
    }
  });
  return checker;
};

console.log(some1(arr, isItEven));
console.log(some1(arrOdd, isItEven));

var every1 = function(collection, callback){
  var checker = true;
  each1(collection, function(val){
    if(callback(val) !== true){
      checker = false;
    }
  });
  return checker;
};

console.log(every1(arr, isItEven));
console.log(every1(arrEven, isItEven));


var largestNumber = function(arr){
  var largest = 0;
  each1(arr, function(val){
    if(val > largest){
      largest = val;
    }
  });
    return largest;
};

console.log(largestNumber(arr)); 


// ============= MORE PRACTICE ==================

function each(collection, callback){
  if(collection.length){
    for(var i = 0; i < collection.length; i++){
      callback(collection[i]);
    }
  } 
  else if(typeof collection === 'object'){
    for(var key in collection){
      callback(collection[key]);
    }
  }
  else {
    console.log('first parameter is not a collection');
  }
}

function map(array, callback){
  var newArray = [];
  each(array, function(val){
    newArray.push(callback(val));
  });
  return newArray;
};

function reduce(collection, callback, start){
  each(collection, function(val){
    start = callback(start, val);
  });
  return start;
};

function filter(collection, callback){
  var results = [];
  each(collection, function(val){
    if(callback(val)){
      results.push(callback(val));
    }
  });
  return results;
};

function some(collection, callback){
  var checker = false;
  each(collection, function(val){
    if(callback(val)){
      checker = true;
    }
  });
  return checker;
};

function every(collection, callback){
  var checker = true;
  each(collection, function(val){
    if(!callback(val)){
      checker = false;
    }
  });
  return checker;
};

//=================================================================

// Video Library Array

  var newReleases = [
      {
        "id": 70111470,
        "title": "Die Hard",
        "boxart": "http://cdn-0.nflximg.com/images/2891/DieHard.jpg",
        "uri": "http://api.netflix.com/catalog/titles/movies/70111470",
        "rating": 4.0,
        "bookmark": []
      },
      {
        "id": 654356453,
        "title": "Bad Boys",
        "boxart": "http://cdn-0.nflximg.com/images/2891/BadBoys.jpg",
        "uri": "http://api.netflix.com/catalog/titles/movies/70111470",
        "rating": 5.0,
        "bookmark": [{ id:432534, time:65876586 }]
      },
      {
        "id": 65432445,
        "title": "The Chamber",
        "boxart": "http://cdn-0.nflximg.com/images/2891/TheChamber.jpg",
        "uri": "http://api.netflix.com/catalog/titles/movies/70111470",
        "rating": 4.0,
        "bookmark": []
      },
      {
        "id": 675465,
        "title": "Fracture",
        "boxart": "http://cdn-0.nflximg.com/images/2891/Fracture.jpg",
        "uri": "http://api.netflix.com/catalog/titles/movies/70111470",
        "rating": 5.0,
        "bookmark": [{ id:432534, time:65876586 }]
      }
    ];

// --------------------------------------------

//Make an array of IDs of movies with a rating of 5.0
var findFive = newReleases.filter(function(val){
    return val.rating === 5.0;
  })
  .map(function(val){
    return val.id;
  });

console.log(findFive);

// --------------------------------------------






//=======================================================================

  // TODO: complete calculateHypotenuse so that it returns the hypotenuse length
  // for a triangle with sides of length a, b, and c, where c is the hypotenuse.
  // The solution should verify that inputs are valid numbers (both above zero).

function calculateHypotenuse(a,b){
  try{
    if(a < 1 || b < 1) throw 'too low';
    if(typeof a !== 'number' || typeof b !== 'number') throw 'not a number';
    if(isNaN(a) || isNaN(b)) throw 'not a number';
    var c = Math.sqrt((a * a) + (b * b));
    return Math.round(c * 1000) / 1000;
  }
  catch(err) {
    return error;
  };
}

// var testCalculateHypotenuse = calculateHypotenuse(-2, 1);
// console.log(testCalculateHypotenuse);

//  Test.expect(boolean, [optional] message) 
//  Test.assertEquals(actual, expected, [optional] message)
//  Test.assertSimilar(actual, expected, [optional] message)
//  Test.assertNotEquals(actual, expected, [optional] message) 



//=======================================================================

//Implement the function unique_in_order which takes as argument a sequence and returns a list of items without any elements with the same value next to each other and preserving the original order of elements.

//For example:

// uniqueInOrder('AAAABBBCCDAABBB') == ['A', 'B', 'C', 'D', 'A', 'B']
// uniqueInOrder('ABBCcAD')         == ['A', 'B', 'C', 'c', 'A', 'D']
// uniqueInOrder([1,2,2,3,3])       == [1,2,3]



var uniqueInOrder=function(iterable){

  var returnArray = [];
  //check if iterable is a strring
  if(typeof iterable === 'string') {
    //break into an array
    iterable = iterable.split('');
  }
  //loop through array
  for(var i = 0; i < iterable.length; i++) {
    //check if current element = next element
    if(iterable[i] !== iterable[i+1]) {
      //if not, push current element
      returnArray.push(iterable[i]);
    }
  }
  //return array
  return returnArray;
};

// var iterableTest1 = uniqueInOrder('AAAABBBCCDAABBB');
// var iterableTest2 = uniqueInOrder('ABBCcAD');
// var iterableTest3 = uniqueInOrder([1,2,2,3,3]);
// console.log(iterableTest3);

//=======================================================================


function climb(n){
  //make a results array and make n the first element
  var results = [n];
  var newVal;
  //function to check odd or even
  var checkModulus = function(n) {
    //if var is 0 or 1, then return
    if(n ===0 || n === 1) {
      return;
    }
    //check if odd or even
    if(n % 2 === 0) {
      //if even, divide by 2 and unshift result into array
      newVal = n / 2;
      results.unshift(newVal);
      checkModulus(newVal)
    }
      //if odd, subtract 1 and then divide by 2 and unshift to result
    else {
      newVal = ((n - 1) / 2);
      results.unshift(newVal);
      checkModulus(newVal)
    }
  }
  checkModulus(n)
  //return results
  return results;
    
}

// var testClimb = climb(13)// [1]);
// climb(10)// [1, 2, 5, 10]);
// climb(13)//[1, 3, 6, 13]);

// console.log(testClimb);



//=======================================================================



/*You can print your name on a billboard ad. Find out how much it will cost you. Each letter has a default price of £30, 
but that can be different if you are given 2 parameters instead of 1.

You can not use multiplier "*" operator.

If your name would be Jeong-Ho Aristotelis, ad would cost £600. 20 leters * 30 = 600 (Space counts as a letter).*/

function billboard(name, price = 30){
  //make a total price var and set to 0
  var totalPrice = 0;
  //make a var that holds current price and set to 30
  var currentPrice = 30;
  //if second param, then change price to that param
  if (arguments.length >= 2) {
    currentPrice = arguments[1];
  }
//   console.log(currentPrice);
  //make a loop that increments the price for every char
  for (var i = 0; i < name.length; i++) {
    totalPrice += currentPrice;
  }
  //return total price
//   console.log(curentPrice);
  return totalPrice;
} 


//this shouldnt run { '0': 'Jeong-Ho Aristotelis' }
//this shouldnt run 2
// var test = billboard("Jeong-Ho Aristotelis");
// console.log(test);
// Create your own testcase with your name
// billboard("Jeong-Ho Aristotelis")// 600;
// billboard("Abishai Charalampos")// 570);
// Test.assertEquals(billboard("Idwal Augustin"), 420);
// Test.assertEquals(billboard("Hadufuns John",20), 260);
// Test.assertEquals(billboard("Zoroaster Donnchadh"), 570);
// Test.assertEquals(billboard("Claude Miljenko"), 450);
// Test.assertEquals(billboard("Werner Vígi",15), 165);
// Test.assertEquals(billboard("Anani Fridumar"), 420);
// Test.assertEquals(billboard("Paolo Oli"), 270);
// Test.assertEquals(billboard("Hjalmar Liupold",40), 600);
// Test.assertEquals(billboard("Simon Eadwulf"), 390);

//=======================================================================





Array.prototype.filter = function(callback) {
  //make a results array 
  var arr = this;
  var results = [];
  //loop through the array
  for(var i = 0; i < arr.length; i++) {
  //invoke the callback on each element
    if (callback(arr[i])) {
    //if it passes the callback, then push into the results
      results.push(arr[i]);
    }
  }
  // console.log(results);
  return results;
}

// console.log([1, 2, 3, 3].filter((num)=>{return num > 3}));

var test = [1, 2, 3, 4, 5];

// var testFilter = test.filter(function(n){return n > 3});

// console.log(testFilter);



//======================================================================



function rakeGarden(garden) {
  var rakedGarden = [];
  //split string into array of words
  rakedGarden = garden.split(' ');
  //loop through the array
  for(var i = 0; i < rakedGarden.length; i++) {
  //make an if that checks for not equal to rock or gravel
    if(rakedGarden[i] !== 'gravel') {
      if( rakedGarden[i] !== 'rock') {
    //replace that element with gravel
      rakedGarden[i] = 'gravel';
      }
    }
  }
  rakedGarden = rakedGarden.join(' ');
  // TODO: Program Me
  return rakedGarden;

}


var garden1 = 'slug spider rock gravel gravel gravel gravel gravel gravel gravel';
var garden2 = 'gravel gravel gravel gravel gravel gravel gravel gravel gravel rock slug ant gravel gravel snail rock gravel gravel gravel gravel gravel gravel gravel slug gravel ant gravel gravel gravel gravel rock slug gravel gravel gravel gravel gravel snail gravel gravel rock gravel snail slug gravel gravel spider gravel gravel gravel gravel gravel gravel gravel gravel moss gravel gravel gravel snail gravel gravel gravel ant gravel gravel moss gravel gravel gravel gravel snail gravel gravel gravel gravel slug gravel rock gravel gravel rock gravel gravel gravel gravel snail gravel gravel rock gravel gravel gravel gravel gravel spider gravel rock gravel gravel';


// var testGarden = rakeGarden(garden2)
// console.log(testGarden);

//======================================================================




















// Video Library Array

var newReleases = [
    {
      "id": 70111470,
      "title": "Die Hard",
      "boxart": "http://cdn-0.nflximg.com/images/2891/DieHard.jpg",
      "uri": "http://api.netflix.com/catalog/titles/movies/70111470",
      "rating": 4.0,
      "bookmark": []
    },
    {
      "id": 654356453,
      "title": "Bad Boys",
      "boxart": "http://cdn-0.nflximg.com/images/2891/BadBoys.jpg",
      "uri": "http://api.netflix.com/catalog/titles/movies/70111470",
      "rating": 5.0,
      "bookmark": [{ id:432534, time:65876586 }]
    },
    {
      "id": 65432445,
      "title": "The Chamber",
      "boxart": "http://cdn-0.nflximg.com/images/2891/TheChamber.jpg",
      "uri": "http://api.netflix.com/catalog/titles/movies/70111470",
      "rating": 4.0,
      "bookmark": []
    },
    {
      "id": 675465,
      "title": "Fracture",
      "boxart": "http://cdn-0.nflximg.com/images/2891/Fracture.jpg",
      "uri": "http://api.netflix.com/catalog/titles/movies/70111470",
      "rating": 5.0,
      "bookmark": [{ id:432534, time:65876586 }]
    }
  ];

var newReleasesString = '[{"id":70111470,"title":"Die Hard","boxart":"http://cdn-0.nflximg.com/images/2891/DieHard.jpg","uri":"http://api.netflix.com/catalog/titles/movies/70111470","rating":4,"bookmark":[]},{"id":654356453,"title":"Bad Boys","boxart":"http://cdn-0.nflximg.com/images/2891/BadBoys.jpg","uri":"http://api.netflix.com/catalog/titles/movies/70111470","rating":5,"bookmark":[{"id":432534,"time":65876586}]},{"id":65432445,"title":"The Chamber","boxart":"http://cdn-0.nflximg.com/images/2891/TheChamber.jpg","uri":"http://api.netflix.com/catalog/titles/movies/70111470","rating":4,"bookmark":[]},{"id":675465,"title":"Fracture","boxart":"http://cdn-0.nflximg.com/images/2891/Fracture.jpg","uri":"http://api.netflix.com/catalog/titles/movies/70111470","rating":5,"bookmark":[{"id":432534,"time":65876586}]}]'; 

// --------------------------------------------

//Make an array of IDs of movies with a rating of 5.0
var findFive = newReleases.filter(function(val){
    return val.rating === 5.0;
  })
  .map(function(val){
    return val.id;
  });

// console.log(findFive); //--> [654356453, 675465]


var JSONnewReleases = JSON.parse(newReleasesString);
// console.log(JSONnewReleases);





var containers = [
  {container: 'TGHU8568573', line: 'MOL', bol: 'MOLU1122334455', vessel: 'APL Mumbai', available: '',lfd: ''}, 
  {container: 'HDMU9871256', line: 'HUD', bol: 'HDMU1122334455', vessel: 'NYK Atlanta', available: '', lfd: ''},
  {container: 'NYKU5647382', line: 'NYK', bol: 'NYKU1122334455', vessel: 'NYK Atlanta', available: '', lfd: ''}
];






//=========================================================================================

var fibonacciNumber= function(n){
  //using loop (from http://www.programmingsimplified.com/c-program-generate-fibonacci-series)
  var counter,
      first = 0,
      second = 1,
      next = 0;

  for(counter = 0; counter < n; counter++) {

    next = first + second;
    first = second;
    second = next;

  }
  return next;
}


  // using recursion - Solved with Albrey on 4/19
//   var count = 0;
//   var fibo = function(n){
    
//     console.log("depth of recursion:", count);
//     console.log("current number", n);
    
//     if(n <= 1){
//       return n;
//     }
//     count++
//     return fibo(n-1) + fibo(n-2);
//   } 
  
//   return fibo(n);
  
// };

 // from CodeAccademy
var fibonacciNumber = function(n){
    if(n <= 2) {
    return 1;
  }
  return fibonacciNumber(n-1) + fibonacciNumber(n-2);
}

var fibonacciNumber = function(n){
  if(n === 0) {
    return 0;
  }
  else if(n === 1){
    return 1;
  }
  else {
    return fibonacciNumber(n-1) + fibonacciNumber(n-2);
  }
}


// console.log(fibonacciNumber(6));
// Target ==> 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, ... -- so if n = 6,  will === 8
//  Fn = Fn−1 + Fn−2 for n ≥ 2 with F0 = 0, F1 = 1.
















