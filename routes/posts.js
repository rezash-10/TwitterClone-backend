const express = require('express');
const {getPosts} = require('../controllers/posts-controller');
const router = express.Router();
//*******************************************1*/
router.get('/posts/:username?', getPosts)
//*******************************************1*/
module.exports = router;