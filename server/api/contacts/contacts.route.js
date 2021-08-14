//Initializations
const {Router} = require('express');
const router = Router();
const {basename} = require('path');
const {getUsers} = require('./contacts.service');

router.get('/', userRoute);

async function userRoute(req, res) {
  try {
    const users = await getUsers(req);
    if (users) {
      return res.json({
        data: users,
        err: null
      });
    } else {
      return res.json({
        data: null,
        err: 500
      })
    }
  } catch (e) {
    return res.json({
      data: null,
      err: 500
    })
  }
}

module.exports = router;