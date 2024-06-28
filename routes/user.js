const express = require('express');
const {getUser} = require('../controllers/user-controller');
const router = express.Router();
//*******************************************1*/
router.get('/user/:username', getUser);
//*******************************************1*/
module.exports = router;