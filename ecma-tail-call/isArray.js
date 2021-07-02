const noProtoArray = [1];
// Object.setPrototypeOf(noProtoArray, null);
// console.log(noProtoArray.map); // undefined
// console.log(noProtoArray instanceof Array); // false
// console.log(Array.isArray(noProtoArray)); // true


const mappedArray = Array.prototype.map.call(noProtoArray, (a)=>{
    return a
});

console.log(mappedArray)
