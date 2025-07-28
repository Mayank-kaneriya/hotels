const express = require('express');
const app = express();    //app is basically bluePrint of our application
const Person = require('./models/Person.js');
const MenuItem = require('./models/Menuitem.js');
const db = require('./db.js');
const bodyParser = require('body-parser');
require('dotenv').config();


app.use(bodyParser.json()); //req.body


const personRouter = require('./routes/personRoutes.js')
const menuItemRouter = require('./routes/menuItemRoutes.js');
app.use('/person', personRouter);
app.use('/menu', menuItemRouter);



const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server is running on port 3000");
});






















// const jsonString = '{"name":"mayank","age":"23","isgraduated":true}';
// const jsonObject = JSON.parse(jsonString);
// const stringFormation = JSON.stringify(jsonObject);
// console.log(jsonObject.isgraduated);
// console.log(stringFormation.length);


















// const fs = require('fs'); //import inbuilt modules
// const os = require('os');

// const user = os.userInfo();  //give user info
// console.log(user);

// fs.appendFile("check.txt", 'hi'  + user.username + '\n', () => console.log("file Created"));


// console.log(os);


























// console.log("server file is running");
// var a = 2;
// var b = 3;
// console.log(a + b);

// (function () {
//   console.log("don't call me");
// })();

// ( () => {
//   console.log("don't call me");
// })();

// function callback()
// {
//   console.log("Hi, I am callback");
// }

// function add(a,b,callback)
// {
//   var result = a+b;
//   console.log(result);
//   callback();
// }

// add(3,4,() => {
//   console.log("Hi, let's check");
// });

// add(3,4,callback);  