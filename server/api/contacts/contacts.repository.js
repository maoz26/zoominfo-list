const {basename} = require('path');
const client = require('../../mongo-handler');
const {DB, CONTACTS_COLLECTION} = process.env;

const getUsersRepo = async (req) => {
  try {
    await client.connect();
    const db = client.db(DB);
    return await db.collection(CONTACTS_COLLECTION)
      .find({})
      .project({})
      .sort({firstname: 1})
      .toArray();
  } catch (e) {
    return null;
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

module.exports = {
  getUsersRepo
};