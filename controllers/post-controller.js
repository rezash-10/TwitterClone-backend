const {addPost} = require('../models/post-manager')
//********************************************/
const post = (req, res, next) => {
    console.log("Adding a post");

    if(!req.session.username)
        return res.status(401).json({msg: "Need to login First!"})

    if(!req.body.text || req.body.text == '')
        return res.status(400).json({msg: "Can't post empty posts!"})

    if(!req.body.date || req.body.date == '')
        return res.status(400).json({msg: "date fild is missing!"})

    addPost(req.body.date, req.session.username, req.body.text, (err, result) => {
        if(err) {
            console.log("Error in addPost: "+err)
            return res.status(500).json({msg: "Server DB error!"})
        }
        return res.status(200).json({msg: 1})
    })
}
//********************************************/
module.exports = {
    post
}