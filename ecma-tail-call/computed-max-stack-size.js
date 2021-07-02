'use strict';

function computedMaxStackSize (){
    try{
        return 1 + computedMaxStackSize();
    }
    catch(error){
        return 1
    }
}

console.log(computedMaxStackSize());