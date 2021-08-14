//Initializations
const {Router} = require('express');
const router = Router();
// const auth = require("../middlewares/auth");

//Middlewares

//Routes
const registerRoutes = require('../api/register/register.route');
const loginRoutes = require('../api/login/login.route');
const contactsRoutes = require('../api/contacts/contacts.route');

//Routes usages
router.use('/register', registerRoutes);
router.use('/login', loginRoutes);
router.use('/contacts', contactsRoutes);

module.exports = router;