const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const passport = require('passport');

router.get('/register',(req,res) => {res.render('register')
});

router.get('/login',(req,res) => res.render('login'));
console.log('works')

router.post('/register', (req, res) => {
    console.log('hits')
    const { name, email, password, cpassword,cname,rollno,passyr,dob } = req.body;
    let errors = [];
  
    if (!name || !email || !password || !cpassword || !cname  || !rollno  || !passyr || !dob  ) {
      errors.push({ msg: 'Please enter all fields' });
    }
  
    if (password != cpassword) {
      errors.push({ msg: 'Passwords do not match' });
    }
  
    if (password.length < 6) {
      errors.push({ msg: 'Password must be at least 6 characters' });
    }
    if(errors.length > 0){
    console.log(errors)
    res.redirect('/users/register')
    }
    else {
        User.findOne({ email: email }).then(user => {
          if (user) {
            errors.push({ msg: 'Email already exists' });
          } else {
            const newUser = new User({
              name,
              email,
              password,
              cname,
              rollno,
              passyr,
              dob
            });

            
bcrypt.hash(newUser.password,(err, hash) => {
    if (err) throw err;
    newUser.password = hash;
    newUser
      .save()
      .then(user => 
        alert('You are now registered and can log in')
          );
        res.redirect('/users/login');
      })
      .catch(err => console.log(err));
        }
        
    })
}   


  });
 router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
      successRedirect: '/dashboard',
      failureRedirect: '/users/login',
    })(req, res, next);
  });
  
  // Logout
  router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/users/login');
  });
    
    
   

module.exports = router;