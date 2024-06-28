const express = require('express');
const {post} = require('../controllers/post-controller');
const router = express.Router();
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
//*******************************************1*/
router.post('/post',jsonParser, post)
//*******************************************1*/
module.exports = router;