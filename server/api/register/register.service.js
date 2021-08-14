const jwt = require("jsonwebtoken");
const {basename} = require('path');
const {TOKEN_KEY} = process.env;
const {getUsersRepo, upsertUsersRepo} = require('./register.repository');
const bcrypt = require('bcrypt');

const getUser = async (req) => {
  try {
    const {first_name, last_name, email, password} = req.body;

    // Validate user input
    if (!(email && password && first_name && last_name)) {
      return {
        data: null,
        err: 400
      };
    }

    const oldUser = await getUsersRepo(req, {email}); // check if user already exist Validate if user exist in our database
    if (oldUser && oldUser.length > 0) {
      return {
        data: null,
        err: 409
      };
    }

    const encryptedPassword = await bcrypt.hash(password, 10);
    const user = {
      first_name,
      last_name,
      email: email.toLowerCase(), // sanitize: convert email to lowercase
      password: encryptedPassword,
    };
    // Create token and save user token
    user.token = jwt.sign({user_id: user._id, email}, TOKEN_KEY, {expiresIn: "12h"});
    const insertedUser = await upsertUsersRepo(req, {email}, user);

    if (insertedUser) {
      return {
        data: user,
        err: null
      };
    }
  } catch (e) {
    return {
      data: null,
      err: 500
    };
  }
}

module.exports = {
  getUser
};