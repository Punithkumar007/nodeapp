const keyName = process.argv[2];
console.log(typeof(keyName));

const arr = JSON.parse(keyName);

console.log("The Max num is:", Math.max(...arr) );