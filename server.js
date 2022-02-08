const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport');
const session = require('express-session');


const app = express()
const db = require('./config/keys').MongoURI;

mongoose.connect(db,{useNewUrlParser:true})
.then(()=> {app.listen(3000)
console.log('mongodb connected')})
.catch(err => console.log(err));

require('./config/passport')(passport);

app.set('view engine','ejs')
app.use(express.urlencoded({extended:true}))

app.use(
    session({
      secret: 'secret',
      resave: true,
      saveUninitialized: true
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());

app.use('/', require('./routes/index.js'));
app.use('/user', require('./routes/user.js'));
    

