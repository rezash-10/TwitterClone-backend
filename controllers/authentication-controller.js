const mysql_dao = require('../models/authentication-queries')
const multiparty = require('multiparty');
//********************************************/
const registerUser = (req, res,next) => {
    console.log("registerUser")

    //get image if avaialble
    const form = new multiparty.Form();


    form.parse(req, (err, fields, files) => {
        if (err) {
          // Handle error
          return sendResponse('Form parsing error',400,res);
        }
        const json = {
            name : fields.name[0],
            username : fields.username[0],
            email : fields.email[0],
            birthday_date : fields.birthday_date[0],
            password : fields.password[0],
            password_conf : fields.password_conf[0]

        }
        let { name, username, email,birthday_date,password,password_conf} = json;
        if(!name.trim()||!username.trim()||!email.trim()||!password.trim()||!password_conf.trim()||!birthday_date.trim()){
        
            return sendResponse("Fill the blank fields",200,res);
        }
        
        if(password!=password_conf){
            return sendResponse("Please enter password correctly",200,res);
        }
        const fs = require('fs');
        const path = require('path');
    
    
        // Access the uploaded file
        const file = files.user_profile[0];
        
        const size = file.size;

        let fileName = null
        const temporaryPath = file.path;
        if(size!=0){
            
            const extension = path.extname(temporaryPath);
            fileName = Date.now() + '-' + Math.round(Math.random() * 1E9)+extension;
        
            
        }

          mysql_dao.createNewUser(json,fileName,(msg)=>{
 
            if(msg=='1'&&size!=0){
                //save user profile image
                const dirname = './src/user_profiles/'
                const targetPath =  dirname+ fileName;

                if(!fs.existsSync(dirname)){
                    fs.mkdirSync('./src/user_profiles/',{ recursive: true },(err)=>{
                        if (err) {
                            console.log(err)
                            // Handle file moving error
                            return sendResponse('Error creating directory',500,res);
                          }
                    })
                }

                fs.rename(temporaryPath, targetPath, (err) => {
                    if (err) {
                      // Handle file moving error
                      return sendResponse('Error saving the image',500,res);
                    }
                    return sendResponse(msg,200,res);

                  });

            }else{
                sendResponse(msg,200,res);

            }
            
        });
      });
}
//-------------------------------------------------/
const loginUser = (req, res,next) => {

    //first check if user has session
    if(req.session.username){
        return sendResponse('1',200,res);
    }
    
    let{username,password} = req.body;

    if(!username.trim()||!password.trim()){
        
        return sendResponse("Fill the blank fields",200,res);
    }

    mysql_dao.checkUserLogin(req.body,(msg)=>{
        if(msg=='1'){
            req.session.username = username
            
        }
        return sendResponse(msg,200,res)
    });


}
//-------------------------------------------------/
const logoutUser = (req, res,next) => {

    //first check if user has session
    if(req.session.username){
        req.session.destroy((err) => {
            if (err) {
                return sendResponse('Could not log out',500,res)
            } 
        });
    }
    return sendResponse('1',200,res)
   

}

//-------------------------------------------------/
function sendResponse(msg,status,res){
    const responseJson = {
        msg
      };
      res.status(status).json(responseJson)
}
//********************************************/
module.exports = {
    registerUser,loginUser,logoutUser
}