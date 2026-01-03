const myFirstObj = { myProperty : true };
const mySecondObj = { myProperty : false };
const myMergedObj = { ...myFirstObj, ...mySecondObj };

console.log(myMergedObj);