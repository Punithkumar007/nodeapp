// const keyName = process.argv[2];
// console.log(typeof(keyName));

// const arr = JSON.parse(keyName);

// console.log("The Max num is:", Math.max(...arr) );
import os from 'os';
import path from "path";

console.log(os.totalmem(), os.freemem());

console.log(path.parse(__filename));