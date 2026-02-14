const userModel=require('../models/user.model');

module.exports.createUser =async ({
  firstname,lastname,email,password
}) =>{
  if(!firstname || !email || !password){
    throw new Error('All fields are required');
  }
  // Check if email already exists to return a clearer error
  const existing = await userModel.findOne({ email });
  if (existing) {
    const err = new Error('Email already in use');
    err.code = 11000; // align with Mongo duplicate key handling
    throw err;
  }

  const user =await userModel.create({
    fullname:{
      firstname,
      lastname
    },
    email,
    password 
  })
  return user;
}