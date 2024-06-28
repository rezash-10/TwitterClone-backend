const {fetchPosts, likePost} = require('../models/posts-manager')
const postTableName = process.env.POST_TABLE
//********************************************/
const getPosts = (req, res, next) => {
    if(req.params.username){ //fetching posts of a specific user
        console.log(`Fetching Posts of ${req.params.username}`);
        result = fetchPosts(req.params.username, (err, result)=>{
            res.status(200).json(result)
        })
    }
    else{
        console.log("Fetching Posts");
        result = fetchPosts(null, (err, result)=>{
            res.status(200).json(result)
        })
    }
}

const like = (req, res, next) => {
    if(!req.session.username) {
        return res.status(400).json({ error: 'Must login first!' });
    }
    const postId = req.params.postId
    if (!(/^\d+$/.test(postId))) {
        return res.status(403).json({ error: 'Invalid user ID. Must be a number.' });
    }

    likePost(postId, (err_cd, err, result) => {
        if(err_cd == 1 || err_cd == 2) {
            console.log("Error querying DB, "+err_cd)
            return res.status(500).json({error: "Error querying DB"})
        }
        else if (err_cd == 404) {
            console.log(`Post with postId=${postId} doesn't exist`)
            return res.status(404).json({error: `Post with postId=${postId} doesn't exist`})
        }
        else {
            return res.status(200).json({msg: "1"})
        }
    })
}
//********************************************/
module.exports = {
    getPosts,
    like
}