const {MongoClient} = require("mongodb");
const {MONGO_URI} = process.env || "mongodb://localhost:27017/";

const client = new MongoClient(MONGO_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  connectTimeoutMS: 30000,
  keepAlive: 1
});

module.exports = client;