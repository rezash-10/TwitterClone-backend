const express = require('express');
const {registerUser,loginUser,logoutUser} = require('../controllers/authentication-controller');
const router = express.Router();
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
//*******************************************1*/
router.post('/register',registerUser)
router.post('/login',jsonParser,loginUser)
router.post('/logout',jsonParser,logoutUser)
//*******************************************1*/
module.exports = router;
