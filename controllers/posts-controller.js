const {fetchPosts} = require('../models/posts-fetcher')
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
//********************************************/
module.exports = {
    getPosts
}