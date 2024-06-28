const pool = require('./mysql_manager')
const postTableName = process.env.POST_TABLE
const userTableName = process.env.USER_TABLE
//********************************************/
function fetchUsers(username, callback) {
  if(username) {
    q1 = `SELECT name FROM ${userTableName} WHERE username = ?`
    q2 = `SELECT p.id, p.date, p.text, p.likes
          FROM ${userTableName} u
          JOIN ${postTableName} p ON u.username = p.username
          WHERE u.username = ?`
    pool.query(q1, [username], (err, res1) => {
      if(err){
        console.log("Error querying DB")
        return callback(err, res1)
      }
      if(res1.length == 0) {
        return callback(404, res1)
      }

      pool.query(q2, [username], (err, res2) => {
        if(err){
          console.log("Error querying DB")
          return callback(err, res2)
        }
        callback(err, {name: res1[0].name, posts: res2})
      })
    })
  }
}
module.exports = {
    fetchUsers
}