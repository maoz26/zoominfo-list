const jwt = require("jsonwebtoken");
const {basename} = require('path');
const {getUsersRepo, upsertUsersRepo} = require('../register/register.repository');
const bcrypt = require('bcrypt');

const getUserLogin = async (req) => {
  try {
    const {email, password} = req.body;

    if (!(email && password)) {
      return {
        data: null,
        err: 400,
      }
    }
    // Validate if user exist in our database
    const result = await getUsersRepo(req, {email});
    if (result && result[0]) {
      const user = result[0];
      if (user && (await bcrypt.compare(password, user.password))) {
        // Create token and save user token
        user.token = jwt.sign({user_id: user._id, email}, process.env.TOKEN_KEY, {expiresIn: "12h"});
        await upsertUsersRepo(req, {}, user);
        return {
          data: user,
          err: null
        }
      }
    }
    return {
      data: null,
      err: 99,
    }
  } catch (e) {
    return {
      data: null,
      err: 500,
    }
  }
}

module.exports = {
  getUserLogin
};