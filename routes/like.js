const express = require('express');
const {like} = require('../controllers/posts-controller');
const router = express.Router();
//*******************************************1*/
router.get('/like/:postId', like)
//*******************************************1*/
module.exports = router;