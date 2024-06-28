const pool = require('./mysql_manager')
const postTableName = process.env.POST_TABLE
//********************************************/
function fetchPosts(username=null, callback) {
    if(username) {
        pool.query(`SELECT id, date, username, likes, text FROM ${postTableName} WHERE ${postTableName}.username = ?`,[username], (err, result) => {
            if(err) {
                console.log(`Fetching Posts of ${username} err: `+err)
                return
            }
            callback(null, result)
        })
    }
    else {
        pool.query(`SELECT id, date, username, likes, text FROM ${postTableName}`, (err, result) => {
            if(err) {
                console.log(`Fetching Posts err: `+err)
                return
            }
            callback(null, result)
        })
    }
}
//********************************************/
module.exports = {
    fetchPosts
}