const userModel = require('../models/user.model');

module.exports.createUser = async ({
  firstname, lastname, email, password
}) => {
  if (!firstname || !email || !password) {
    throw new Error('All fields are required');
  }
  const existing = await userModel.findOne({ email });
  if (existing) {
    const err = new Error('Email already in use');
    err.code = 11000;
    throw err;
  }

  const user = await userModel.create({
    fullname: {
      firstname,
      lastname
    },
    email,
    password
  })
  return user;
}