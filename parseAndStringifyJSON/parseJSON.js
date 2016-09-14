// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;


var parseJSON = function(json) {
  // your code goes here
  if ( typeof json === 'string' ){
    var newJson = json.substring(1,json.length - 1);
		return newJson;
  } 
};
// JSON.parse("'my text'");

parseJSON('[]');

var testArray = [];

parsonJSON('[]');


parseableStrings = [
  // basic stuff
  '[]',
  '{"foo": ""}',
  '{}',
  '{"foo": "bar"}',
  '["one", "two"]',
  '{"a": "b", "c": "d"}',
  '[null,false,true]',
  '{"foo": true, "bar": false, "baz": null}',
  '[1, 0, -1, -0.3, 0.3, 1343.32, 3345, 0.00011999999999999999]',
  '{"boolean, true": true, "boolean, false": false, "null": null }',
  ];










// but you're not, so you'll write it from scratch:
var parseJSON = function(text, reviver) {
  // your code goes here
















// //********* NOTE:  THIS IS SOURCE CODE - NOT MY CODE **********************
// //******* FOUND AT http://docs.sencha.com/touch/1.1.1/source/JSON.html ****
// //*************************************************************************

// // The parse method takes a text and an optional reviver function, and returns
// // a JavaScript value if the text is a valid JSON text.



// // The walk method is used to recursively walk the resulting structure so
// // that modifications can be made.

//             function walk(holder, key) {

//                 var k, v, value = holder[key];
//                 if (value && typeof value === 'object') {
//                     for (k in value) {
//                         if (Object.hasOwnProperty.call(value, k)) {
//                             v = walk(value, k);
//                             if (v !== undefined) {
//                                 value[k] = v;
//                             } else {
//                                 delete value[k];
//                             }
//                         }
//                     }
//                 }
//                 return reviver.call(holder, key, value);
//             }


// // Parsing happens in four stages. In the first stage, we replace certain
// // Unicode characters with escape sequences. JavaScript handles many characters
// // incorrectly, either silently deleting them, or treating them as line endings.

//             var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;

//             text = String(text);
//             cx.lastIndex = 0;
//             if (cx.test(text)) {
//                 text = text.replace(cx, function (a) {
//                     return '\\u' +
//                         ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
//                 });
//             }

// // In the second stage, we run the text against regular expressions that look
// // for non-JSON patterns. We are especially concerned with '()' and 'new'
// // because they can cause invocation, and '=' because it can cause mutation.
// // But just to be safe, we want to reject all unexpected forms.

// // We split the second stage into 4 regexp operations in order to work around
// // crippling inefficiencies in IE's and Safari's regexp engines. First we
// // replace the JSON backslash pairs with '@' (a non-JSON character). Second, we
// // replace all simple value tokens with ']' characters. Third, we delete all
// // open brackets that follow a colon or comma or that begin the text. Finally,
// // we look to see that the remaining characters are only whitespace or ']' or
// // ',' or ':' or '{' or '}'. If that is so, then the text is safe for eval.


//             if (/^[\],:{}\s]*$/.
// test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@').
// replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').
// replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {

// // In the third stage we use the eval function to compile the text into a
// // JavaScript structure. The '{' operator is subject to a syntactic ambiguity
// // in JavaScript: it can begin a block or an object literal. We wrap the text
// // in parens to eliminate the ambiguity.

//                 var j = eval('(' + text + ')');

// // In the optional fourth stage, we recursively walk the new structure, passing
// // each name/value pair to a reviver function for possible transformation.

//                 return typeof reviver === 'function' ?
//                     walk({'': j}, '') : j;
//             }

// // If the text is not JSON parseable, then a SyntaxError is thrown.

//             throw new SyntaxError('JSON.parse');
//         };








// //--* tests *----------------------------------------

// parseableStrings = [
//   // basic stuff
//   '[]',
//   '{"foo": ""}',
//   '{}',
//   '{"foo": "bar"}',
//   '["one", "two"]',
//   '{"a": "b", "c": "d"}',
//   '[null,false,true]',
//   '{"foo": true, "bar": false, "baz": null}',
//   '[1, 0, -1, -0.3, 0.3, 1343.32, 3345, 0.00011999999999999999]',
//   '{"boolean, true": true, "boolean, false": false, "null": null }',

//   // basic nesting
//   '{"a":{"b":"c"}}',
//   '{"a":["b", "c"]}',
//   '[{"a":"b"}, {"c":"d"}]',
//   '{"a":[],"c": {}, "b": true}',
//   '[[[["foo"]]]]',

//   // escaping
//   '["\\\\\\"\\"a\\""]',
//   '["and you can\'t escape thi\s"]',

//   // everything all at once
//   '{"CoreletAPIVersion":2,"CoreletType":"standalone",' +
//     '"documentation":"A corelet that provides the capability to upload' +
//     ' a folderâ€™s contents into a userâ€™s locker.","functions":[' +
//     '{"documentation":"Displays a dialog box that allows user to ' +
//     'select a folder on the local system.","name":' +
//     '"ShowBrowseDialog","parameters":[{"documentation":"The ' +
//     'callback function for results.","name":"callback","required":' +
//     'true,"type":"callback"}]},{"documentation":"Uploads all mp3 files' +
//     ' in the folder provided.","name":"UploadFolder","parameters":' +
//     '[{"documentation":"The path to upload mp3 files from."' +
//     ',"name":"path","required":true,"type":"string"},{"documentation":' +
//     ' "The callback function for progress.","name":"callback",' +
//     '"required":true,"type":"callback"}]},{"documentation":"Returns' +
//     ' the server name to the current locker service.",' +
//     '"name":"GetLockerService","parameters":[]},{"documentation":' +
//     '"Changes the name of the locker service.","name":"SetLockerSer' +
//     'vice","parameters":[{"documentation":"The value of the locker' +
//     ' service to set active.","name":"LockerService","required":true' +
//     ',"type":"string"}]},{"documentation":"Downloads locker files to' +
//     ' the suggested folder.","name":"DownloadFile","parameters":[{"' +
//     'documentation":"The origin path of the locker file.",' +
//     '"name":"path","required":true,"type":"string"},{"documentation"' +
//     ':"The Window destination path of the locker file.",' +
//     '"name":"destination","required":true,"type":"integer"},{"docum' +
//     'entation":"The callback function for progress.","name":' +
//     '"callback","required":true,"type":"callback"}]}],' +
//     '"name":"LockerUploader","version":{"major":0,' +
//     '"micro":1,"minor":0},"versionString":"0.0.1"}',
//   '{ "firstName": "John", "lastName" : "Smith", "age" : ' +
//     '25, "address" : { "streetAddress": "21 2nd Street", ' +
//     '"city" : "New York", "state" : "NY", "postalCode" : ' +
//     ' "10021" }, "phoneNumber": [ { "type" : "home", ' +
//     '"number": "212 555-1234" }, { "type" : "fax", ' +
//     '"number": "646 555-4567" } ] }',
//   '{\r\n' +
//     '          "glossary": {\n' +
//     '              "title": "example glossary",\n\r' +
//     '      \t\t"GlossDiv": {\r\n' +
//     '                  "title": "S",\r\n' +
//     '      \t\t\t"GlossList": {\r\n' +
//     '                      "GlossEntry": {\r\n' +
//     '                          "ID": "SGML",\r\n' +
//     '      \t\t\t\t\t"SortAs": "SGML",\r\n' +
//     '      \t\t\t\t\t"GlossTerm": "Standard Generalized ' +
//     'Markup Language",\r\n' +
//     '      \t\t\t\t\t"Acronym": "SGML",\r\n' +
//     '      \t\t\t\t\t"Abbrev": "ISO 8879:1986",\r\n' +
//     '      \t\t\t\t\t"GlossDef": {\r\n' +
//     '                              "para": "A meta-markup language,' +
//     ' used to create markup languages such as DocBook.",\r\n' +
//     '      \t\t\t\t\t\t"GlossSeeAlso": ["GML", "XML"]\r\n' +
//     '                          },\r\n' +
//     '      \t\t\t\t\t"GlossSee": "markup"\r\n' +
//     '                      }\r\n' +
//     '                  }\r\n' +
//     '              }\r\n' +
//     '          }\r\n' +
//     '      }\r\n'
// ];

// // JSON does not allow you to parse these strings
// unparseableStrings = [
//     '["foo", "bar"',
//     '["foo", "bar\\"]'
// ];





// var test = _.forEach(parseableStrings, function(test){
//   console.log("Test result: ", parseJSON(test));
//   console.log("JSON target: ", JSON.parse(test));
// });
// console.log(test);


// // var test = _.forEach(unparseableStrings, function(test){
// //   console.log("Test result: " + parseJSON(test));
// //   console.log("JSON target: " + JSON.parse(test));
// // });
// // console.log(test);












// Precourse Thursday Session:

// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// JSON.parse(text[, reviver])

// but you're not, so you'll write it from scratch:
var parseJSON = function(json) {
  debugger
  if ( typeof json === 'string' ){
   	// Start everything 
    var parseArray = [];
    var parseObject = {};

    //
    var count = 0;

    var indexIterator = function() {
      var x = json.charAt(count);
      count++;
      return x;
    };
    
    // Start
    
    
    // Boolean && Null
    var checkBoolean = function(char, index) {
      //check if char is 't'
     	if(char === 't') {
        var trueArray = [];
        count = index;
         //get next three chars using indexItertor
         for ( var i = 0; i <= 4; i++){
           trueArray.push(indexIterator());
         }
         //concat the 4 chars and see if equal to true
         var trueTest = trueArray.join('');
         //return boolean true
         if ( trueTest === 'true' ){
           return true;
         }
      } else if( !true ) {
    	//check if char is 'f'
			
          //get next four chars using indexItertor
         
         //concat the 5 chars and see if equal to 'false'
         
         //return boolean false
      } else if (!true){
      //check if char is 'n'

          //get next three chars using indexItertor
         
         //concat the 4 chars and see if equal to 'null'
         
         //return boolean null
      }
    };
    
    
    // Checks if Number
    var checkNumber = function(){};
    // Checks if Misc / Blank space / 
    var checkMisc = function(){};
    // Checks if string
    var checkString = function(){};

    // Check if Array
    var arrayCheck = function(json){
      // your code goes here
      if ( json.charAt(0) === '[' && json.charAt(json.length - 1) === ']' ){
        if ( json.length === 2 ){
          return []; 
        } else {
					console.log('else check');
          checkBoolean('true', 1);
        }
      } // End if
    }; // End arrayCheck
    
    
    // Check if Object
    var objectCheck = function(json){
      if ( json.charAt(0) === '{' && json.charAt(json.length - 1) === '}' ){

      } // End if
    }; // End objectCheck

    
    
    //make if else chain to check first char for json input
    if (json.charAt(0) === '[') {
      arrayCheck();
    }
    else if (json.charAt(0) === '{') {
      objectCheck();
    }
    else if (json.charAt(0) === 't' || json.charAt(0) === 'f'|| json.charAt(0) === 'n') {
      checkBoolean();
    }
    else if (json.charAt(0) === "'" || json.charAt(0) === '"') {
//       checkString("'", whateverIndex ); // Or
//       checkString('"', whateverIndex ); // Or
      checkString();
    }
    else if (json.charAt(0) === ' ') {
      checkMisc();
    }
    
    
    
    
	} // If 'string' check
};
// JSON.parse("'my text'");


parseJSON('[true]');


var parseableStrings = [
  // basic stuff
  '[]',
  '{"foo": ""}',
  '{}',
  '{"foo": "bar"}',
  '["one", "two"]',
  '{"a": "b", "c": "d"}',
  '[null,false,true]',
  '{"foo": true, "bar": false, "baz": null}',
  '[1, 0, -1, -0.3, 0.3, 1343.32, 3345, 0.00011999999999999999]',
  '{"boolean, true": true, "boolean, false": false, "null": null }',
  ];
