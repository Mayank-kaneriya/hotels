const express = require('express');
const app = express();    //app is basically bluePrint of our application
const Person = require('./models/Person.js');
const db = require('./db.js');
const bodyParser = require('body-parser');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
require('dotenv').config();


app.use(bodyParser.json()); //req.body

// middleware  function
// const logrequest =(req,res,next)=>{
//   console.log(`[${new Date().toLocaleString()}]request made on ${req.originalUrl} `);
//   next();
// }
// app.use(logrequest);   //This is for all the routes

passport.use(new localStrategy(async (USERNAME, password, done) => {
  //authentication logic here
  try {
    console.log("Received credentials : ", USERNAME, password);
    const user = await Person.findOne({ username: USERNAME });
    console.log("user kaha he");
    if (!user) {
      return done(null, false, { message: "User doesn't exist" });
    }
    else {
      const ispasswordmatch = user.password == password ? true : false;
      if (ispasswordmatch)
        return done(null, user);
      else
        return done(null, false, { message: "Incorrect password" });

    }



  } catch (error) {
    console.log("error");
    return done(error);

  }

}));

app.use(passport.initialize());


const localAuth = passport.authenticate('local', { session: false, failureRedirect: '/unauthorized' });

app.get('/', localAuth, (req, res) => {
  console.log('Welcome to the hotel');
  res.json({
    message: "welcome to the hotel"
  })
})

app.get('/unauthorized', (req, res) => {
  res.status(401).json({ message: "Unauthorized" });
});


const personRouter = require('./routes/personRoutes.js')
const menuItemRouter = require('./routes/menuItemRoutes.js');

app.use('/person', personRouter);
app.use('/menu', menuItemRouter);



const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is runninng on port ${PORT} `);
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