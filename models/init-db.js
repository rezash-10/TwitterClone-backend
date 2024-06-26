const mysql = require("mysql")
const dotenv = require('dotenv')
//********************************************/
dotenv.config({ path: './.env'})
const databaseName = process.env.DATABASE
const userTable = process.env.USER_TABLE
const postTable = process.env.POST_TABLE

function initDB(){
    let pool = mysql.createPool({
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
    });
    pool.query("show databases",function(err,res,fields){
            if(err) throw err
            
            //check if our database available
            let createDbState = true
            for (let key in res){
                let databse  = Object.values(res[key])
                if(databse==databaseName){
                    createDbState = false
                    break
                }
            }
            if(createDbState){
                //Create database
                pool.query("CREATE DATABASE "+databaseName+";" , function(err,res){
                    if(err) throw err;
                    //Create tables inside database
                    pool.end(function (err) {
                        if(err) throw err
                      });
                    createCouseTables()
                })
            }   
        })

}
//------------------------------------------------/
function createCouseTables(){


    let pool = mysql.createPool({
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database:process.env.DATABASE

    });

    pool.query(`create table if not exists ${userTable} (username varchar(255) primary key ,name varchar(255) , email varchar(255),birthday_date date,register_date timestamp , profile_url varchar(255),password varchar(255))`,(err,res)=>{

        if(err)throw err;
        pool.end(function (err) {
            if(err) throw err
          });
    })
    
    pool.query(
        `create table if not exists ${postTable} (
            id MEDIUMINT NOT NULL AUTO_INCREMENT primary key, 
            username varchar(255),
            text VARCHAR(1000),
            date date,
            likes MEDIUMINT DEFAULT 0,
            foreign key (username) references ${userTable}(username)
            )`,(err,res)=>{

        if(err)throw err;
        pool.end(function (err) {
            if(err) throw err
          });
    })  
}
initDB()