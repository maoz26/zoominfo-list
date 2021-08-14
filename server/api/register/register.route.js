const {Router} = require('express');
const router = Router();
const {basename} = require('path');
const {getUser} = require('./register.service');

router.post('/', registerRoute);

async function registerRoute(req, res) {
  try {
    const user = await getUser(req);
    if (user.err) {
      if (user.err === 400) {
        res.status(400).send({
          data: null,
          err: "All input is required"
        });
      } else if (user.err === 409) {
        res.status(409).send({
          data: null,
          err: "User Already Exist. Please Login"
        })
      } else if (user.err === 500) {
        res.status(500).send({
          data: null,
          err: "service error"
        })
      }
    }
    const registeredUser = user.data;
    res.status(200).json({
      data: registeredUser,
      err: null
    });
  } catch (err) {
    console.log(err);
  }
}

module.exports = router;