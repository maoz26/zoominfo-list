const {basename} = require('path');
const {getUsersRepo} = require('./contacts.repository');

const getUsers = async (req) => {
  try {
    return await getUsersRepo(req);
  } catch (e) {
    return null;
  }
}

module.exports = {
  getUsers
};