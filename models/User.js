const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  cname: {
    type: String,
    required: true
  },
  rollno: {
    type: Number,
    required: true
  },
  passyr: {
    type: Number,
    required: true
  },
  gender:{
    type: String,
    required : true
},
  dob: {
    type: Date,
    requied: true
  }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;