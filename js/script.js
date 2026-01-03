const myArray = [ true, false ];
myArray.forEach( ( myElement, i, originalArray ) => {
  console.log( i, myElement, originalArray  );
});

const myMap = new Map([
    ['key1', true],
    ['key2', false],
]);

const singleMap = new Map([['key1', true]]);

console.log(singleMap);

myMap.forEach(
    (value, key, map)=> {
        console.log(key, value, map);
    }
);