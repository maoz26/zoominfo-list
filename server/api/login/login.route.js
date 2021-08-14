const {Router} = require('express');
const router = Router();
const {basename} = require('path');
const {getUserLogin} = require('../login/login.service');

router.post('/', loginRoute);

async function loginRoute(req, res) {
  try {
    const result = await getUserLogin(req);
    if (result.err) {
      if (result.err === 400) {
        res.status(400).send({
          data: null,
          err: "All input is required",
        });
      } else if (result.err === 99) {
        res.status(400).send({
          data: null,
          err: "Invalid Credentials",
        });
      } else if (result.err === 500) {
        res.status(400).send({
          data: null,
          err: 'service error',
        });
      }
    } else {
      res.status(200).json({
        data: result.data,
        err: null
      });
    }
  } catch (err) {
    res.status(500).send({
      data: null,
      err: 'service error'
    });
  }
}

module.exports = router;