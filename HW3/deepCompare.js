
"use strict"
var deepEqual = function(value1, value2) {
    //check for actual objects
    if (typeof value1 == "object" && value1 != null) {
        if (typeof value2 == "object" && value2 != null) {
            //check for number of properties
            if (Object.keys(value1).length !== Object.keys(value2).length) {
                return false;
            }
            else {
                for (var p in value1) {
                    if (!deepEqual(value1[p], value2[p])) {
                        return false;
                    }
                }
            }
        }
    }
    if (value1 != value2) {
         return false;
    }
    return true;
}

let obj = {here: {is: "an"}, object: 2};
console.log(deepEqual(obj, obj));
// → true
console.log(deepEqual(obj, {here: 1, object: 2}));
// → false
console.log(deepEqual(obj, {here: {is: "an"}, object: 2}));
// → true
console.log(deepEqual(obj, {here:1, hi: 2, happy:3}));
// false
