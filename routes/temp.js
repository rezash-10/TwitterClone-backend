const express = require('express');
const {getFakeJsonArr} = require('../controllers/temp-controller');
const router = express.Router();
//*******************************************1*/
router.get('/users', getFakeJsonArr);
//*******************************************1*/
module.exports = router;