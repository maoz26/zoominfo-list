const faker = require("faker");
const {DB, CONTACTS_COLLECTION} = process.env;

async function seedDB(client) {
  try {
    console.log("Connected correctly to server, trying to seed");
    const db = client.db(DB);
    const collection = db.collection(CONTACTS_COLLECTION);
    // The drop() command destroys all data from a collection. Make sure you run it against proper database and collection.
    collection.drop()
      .then(() => console.log('reset seed database'))
      .catch(() => {
        console.log('no seeded db yet, cant renew')
      });

    let seedArr = [];
    for (let i = 0; i < 100; i++) {
      const firstname = faker.name.firstName();
      const lastname = faker.name.lastName();
      const email = faker.internet.email(firstname, lastname);
      const image = 'https://via.placeholder.com/150';
      const description = faker.lorem.words(600);
      const date = faker.date.past();
      const docObj = {
        firstname,
        lastname,
        email,
        image,
        date,
        description,
      }
      seedArr.push(docObj);
    }
    await collection.insertMany(seedArr);
    console.log("Database seeded! :)");
  } catch (err) {
    console.log(err.stack);
  }
}

module.exports = {
  seedDB,
}