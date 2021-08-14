const {basename} = require('path');
const client = require('../../mongo-handler');
const {DB, USERS_COLLECTION} = process.env;

const getUsersRepo = async (req, filter) => {
  try {
    await client.connect();
    const db = client.db(DB);
    return await db.collection(USERS_COLLECTION)
      .find(filter)
      .project({})
      .sort({_id: -1})
      .toArray();
  } catch (e) {
    return null;
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

const upsertUsersRepo = async (req, filterObj, insertObj, options = { upsert: true}) => {
  try {
    await client.connect();
    const db = client.db(DB);
    return await db.collection(USERS_COLLECTION).updateOne(filterObj, { $set: insertObj }, options);
  } catch (e) {
    return null;
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

module.exports = {
  getUsersRepo,
  upsertUsersRepo
};