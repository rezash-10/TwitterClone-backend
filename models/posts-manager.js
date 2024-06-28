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

function likePost(postId, callback) {
    pool.query(`SELECT id FROM ${postTableName} WHERE id = ?`, [postId], (err, res) => {
        if (err) {
            console.error('Error querying database:', err);
            return callback(1, err, res)
        }

        if (res.length === 0) { //check to see if the post with post Id exists
            console.error("Post with postId doesn't exist.", err);
            return callback(404 ,err, res)
        }

        pool.query(`UPDATE ${postTableName} SET likes = likes + 1 WHERE id = ?`, [postId], (err, result) => {
            if (err) {
                console.error('Error querying database:', err);
                return callback(2 ,err, result)
            }
            return callback(0, err, result)
        })
    })
}
//********************************************/
module.exports = {
    fetchPosts,
    likePost
}