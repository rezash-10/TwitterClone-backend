const pool = require('./mysql_manager')
const tableName = process.env.POST_TABLE
//********************************************/
function addPost(date, user, text, callback) {
    user = 'testUser'// NOTE: for test purpose, to be removed
    pool.query(`INSERT INTO ${tableName} (date, username, text) VALUES ('${date}', '${user}', '${text}')`, (err,res)=>{
        callback(err, res)
        }
    )
}
//********************************************/
module.exports = {
    addPost
}