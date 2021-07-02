'use strict';

function fn(num,total = 1){
    if(num === 0 ){
        console.trace()
        return total;
    }
    return fn(num-1, num * total);
}

console.log(fn(100000))