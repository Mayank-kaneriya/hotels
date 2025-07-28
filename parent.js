const child = require('./child.js');
console.log('parent file is running');

const age = child.age;  //here we are importing age of child file
console.log(age);

const updateAge = child.add(age,10);  //and their age function too
console.log(updateAge);