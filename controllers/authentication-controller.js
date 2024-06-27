const mysql_dao = require('../models/authentication-queries')
const multiparty = require('multiparty');
var nodemailer = require('nodemailer');

//********************************************/
const registerUser = (req, res,next) => {

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
        
    
    
        // Access the uploaded file
        const file = files.user_profile[0];
        
        mysql_dao.checkUserExists(username,(msg)=>{
            if(msg=="1"){
                sendAuthenticationCode(name,email,(sendEmailRes)=>{
                    //
                    if(sendEmailRes!=-1){
                        req.session.auth_code = sendEmailRes
                        req.session.auth_name = name
                        req.session.auth_username = username
                        req.session.auth_email = email
                        req.session.auth_birthday_date = birthday_date
                        req.session.auth_password = password
                        req.session.auth_prfile_url = file.path
                        req.session.auth_expire_time = Date.now() + (1000*180)
                        return sendResponse(msg,200,res);

                    }else{
                        return sendResponse("Cannot send email, please try again later.",200,res);
                    }
                });
                
               
            }else{
                return sendResponse(msg,200,res);

            }
            
        })
        

          
      });
}
//-------------------------------------------------/
function sendAuthenticationCode(name,userEmail,callback){
    let tempCode = Math.floor((Math.random()*99999)+10000)
    console.log(`temp_code : ${tempCode}`)
    // email init
    let senderEmail = process.env.SENDER_EMAIL
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: senderEmail,
          pass: process.env.EMAIL_PASS
        }
      });
      //email info
      var mailOptions = {
        from: senderEmail,
        to: userEmail,
        subject: 'Twitter Clone - Authentication code',
        text: `Hi ${name} , welcome to Twitter clone.\n This is your authentication code:\n---------${tempCode}---------\n Good luck`
      };
      //send email
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
          return callback(-1);
        } else {
          console.log('Email sent: ' + info.response);
          return callback(tempCode);
        }
      }); 
      


}
//-------------------------------------------------/
const registerAuth = (req, res,next) => {

    //first check if user has session
    if(!req.session.auth_username){
        return sendResponse('Please first register in site ',200,res);
    }
    
    let{auth_code} = req.body;

    if(!auth_code){
        
        return sendResponse("Fill the blank fields",200,res);
    }
    if(req.session.auth_expire_time<Date.now()){
        return sendResponse("Time limit reached , please resend authentication token",200,res);
    }

    if(auth_code==req.session.auth_code){
        const fs = require('fs');
        const path = require('path');
        //
        const json = {
            name : req.session.auth_name,
            username : req.session.auth_username,
            email : req.session.auth_email,
            birthday_date : req.session.auth_birthday_date,
            password : req.session.auth_password,
            temporary_path : req.session.auth_prfile_url


        }
        let { name, username, email,birthday_date,password,temporary_path} = json;
        //
        let fileName = null
        let size = fs.statSync(temporary_path).size
        if(size!=0){
            const extension = path.extname(temporary_path);
            fileName = Date.now() + '-' + Math.round(Math.random() * 1E9)+extension;   
        }
        //
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

                fs.rename(temporary_path, targetPath, (err) => {
                    if (err) {
                      // Handle file moving error
                      return sendResponse('Error saving the image',500,res);
                    }
                    
                    return sendResponse(msg,200,res);

                  });

            }else{
               
                return sendResponse(msg,200,res);

            }
            
        });
    }else{
        return sendResponse("Authentication code is wrong",200,res);
    }
}
//-------------------------------------------------/
const resendAuthToken = (req, res,next) => {

    if(!req.session.auth_username){
        return sendResponse('Cannot resend auth token , please register again ',200,res);
    }
    
    sendAuthenticationCode(req.session.auth_name,req.session.auth_email,(sendEmailRes)=>{
        //
        if(sendEmailRes!=-1){
            req.session.auth_code = sendEmailRes
            req.session.auth_expire_time = Date.now() + (1000*180)
            return sendResponse("1",200,res);

        }else{
            return sendResponse("Cannot send email, please try again later.",200,res);
        }
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
    registerUser,loginUser,logoutUser,registerAuth,resendAuthToken
}