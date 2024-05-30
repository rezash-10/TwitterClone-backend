const pool = require('./mysql_manager')
const bcrypt = require("bcryptjs")
const saltRounds = 10
const tableName = process.env.USER_TABLE
//********************************************/
function createNewUser(json,profileUrl,callback){
    let { name, username, email,birthday_date,password} = json;
    
    pool.query(`select name from ${tableName} where username = '${username}'` , function(err,res){
        if(err){
            callback("There is error in handling event(1023)");
            return;
        } 
        if(res && res.length > 0){
            callback("Username is not available");
            return;
        }
        bcrypt
        .genSalt(saltRounds)
        .then(salt => {
            return bcrypt.hash(password, salt)
        })
        .then(hash => {
            pool.query(`insert into ${tableName} (name,username,email,password,birthday_date,register_date,profile_url) values
             (?, ?, ?, ?, ?, CURRENT_TIMESTAMP, ?)`,[name,username,email,hash,birthday_date,profileUrl],(err,res)=>{
                if(err){
                    console.log("(E)createNewUser : "+err)
                    callback("There is error in handling event(1024)");
                    return;
                }
            callback("1");
            return;
            })
            
            
            
        })
        .catch(err => console.error(err.message))
    
    
    })
    

}
//-----------------------------------------/
function checkUserLogin (json,callback){
    let{username,password} = json;


            pool.query(`select * from ${tableName} where username='${username}'`,(err,res)=>{
                if(err){
                    console.log("(E)checkUserLogin : "+err)
                    callback("There is error in handling event(1025)");
                    return;
                }
                


                if(res.length == 0){
                    callback("Username or password is incorrect");
                    return;
                }else{

                    let resJson = JSON.stringify(res);
                    let jsonData = JSON.parse(resJson);
                    let storedPassword = jsonData[0].password;
                    bcrypt.compare(password, storedPassword, (err, result) => {
                    if (err) {
                        callback("Username or password is incorrect");
                      return;
                    }
                  
                    if (result) {
                      callback("1");
                      
                    } else {
                        callback("Username or password is incorrect");
                        
                    }
                  });
                    
                   
                }
    
    
    
            })
        
    



}

//********************************************/
module.exports={
    createNewUser,checkUserLogin
}