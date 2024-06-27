const express = require('express');
const {registerUser,loginUser,logoutUser,registerAuth,resendAuthToken} = require('../controllers/authentication-controller');
const router = express.Router();
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
//*******************************************1*/
router.post('/register',registerUser)
router.post('/register_auth',jsonParser,registerAuth)
router.post('/login',jsonParser,loginUser)
router.get('/logout',jsonParser,logoutUser)
router.get('/resend_auth_code',resendAuthToken)
//*******************************************1*/
module.exports = router;
