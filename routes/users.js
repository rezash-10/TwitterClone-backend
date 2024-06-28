const express = require('express');
const {getUsers} = require('../controllers/user-controller');
const router = express.Router();
//*******************************************1*/
router.get('/users/:username', getUsers);
//*******************************************1*/
module.exports = router;