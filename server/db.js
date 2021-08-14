const client = require('./mongo-handler');
const {seedDB} = require("./seed");

async function run() {
  try {
    // Connect the client to the server
    await client.connect();
    await client.db("admin").command({ping: 1});
    // seed db
    await seedDB(client);

    console.log("Connected successfully to server");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

module.exports = {
  run,
}