require('dotenv').config()
const express = require('express');
const next = require('next');
const mongodb = require('./db');

//Settings
const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({dev});
const handle = app.getRequestHandler();
const apiPrefix = '/api/v1';
// connect db
mongodb.run().catch(console.dir);

app
  .prepare()
  .then(() => {

    //Initializations
    const server = express();
    const Routes = require('./routes/routes');

    //Middlewares
    server.use(express.json());

    //Route
    server.use(apiPrefix, Routes);

    server.get(apiPrefix, (req, res) => {
      res.send('api is up!');
    });

    //Settings
    //Static Files

    server.get('*', (req, res) => {
      return handle(req, res);
    })

    server.listen(port, err => {
      if (err) throw err;
      console.log(`Now listening at port ${port}`)
    })
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  })