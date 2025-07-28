const _ = require('lodash');

const array = [1,'1','name','name',2,'2'];

const filter = _.uniq(array);  // give unique array
console.log(filter);