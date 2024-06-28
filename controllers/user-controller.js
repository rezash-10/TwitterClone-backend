let {fetchUsers} = require("../models/users-manager");

const getUsers = (req, res, next) => {
    console.log(`Fetching user ${req.params.username}`);
    fetchUsers(req.params.username, (err, result)=>{
        if(err == 404){
            return res.status(404).json({error: `User ${req.params.username} doesn't exist`})
        }
        if(err){
            return res.status(500).json({error: "Error querying DB"})
        }
        return res.status(200).json(result)
    })
}
module.exports = {
    getUsers
}