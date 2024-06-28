# Run Node.js Server

To run node js server in your localhost just run following command in your terminal:
```bash
npm run start-server
```

## Setup mysql service 
see this website to know how to setup mysql in windows 
https://www.geeksforgeeks.org/how-to-install-mysql-in-windows/

After setup mysql just put your username and password in .env file:
DATABASE_USER = your_username
DATABASE_PASSWORD = your_password

### Available apis 
```bash
# get dummy users(for test purpose)
API_URL = GET:http://localhost:3000/users
RESPONSE = JsonArray
ACTIVE = true
```

##### Auth-related APIs

```bash
# register user
API_URL = POST(form-data):http://localhost:3000/register
REQUEST_ARGS = {name,username,email,birthday_date,password,password_conf,user_profile(image)}
RESPONSE = JsonObject
RESPONSE_SAMPLE = {msg:"1"} => successfull , {msg:"other message than 1"} => show this error to user
ACTIVE = true
```

```bash
# login user
API_URL = POST(raw-json):http://localhost:3000/login
REQUEST_ARGS = {username,password}
RESPONSE = JsonObject
RESPONSE_SAMPLE = {msg:"1"} => successfull , {msg:"other message than 1"} => show this error to user
ACTIVE = true
```

```bash
# logout user
API_URL = GET:http://localhost:3000/logout
RESPONSE = JsonObject
RESPONSE_SAMPLE = {msg:"1"} => successfull , {msg:"other message than 1"} => show this error to user
ACTIVE = true
```
For using following apis consider following workflow in your code:
1. After register user and get "1" response from server, redirect user to user authentication page
2. In user authentication page , user should enter the code send to his/her email(use "register_auth" api).
3. Authentication code has 3 min expire time , so if it expires , use resend code button (use "resend_auth_code" api)

```bash
# send auth code
API_URL = POST(raw-json):http://localhost:3000/register_auth
REQUEST_ARGS = {auth_code(int)}
RESPONSE = JsonObject
RESPONSE_SAMPLE = {msg:"1"} => successfull , {msg:"other message than 1"} => show this error to user
ACTIVE = true
```

```bash
# resend auth code
API_URL = GET(raw-json):http://localhost:3000/resend_auth_code
RESPONSE = JsonObject
RESPONSE_SAMPLE = {msg:"1"} => successfull , {msg:"other message than 1"} => show this error to user
ACTIVE = true
```

##### Post-related APIs

```bash
# Adding Posts
API_URL = POST(JSON):http://localhost:3000/post
REQUEST_BODY_SAMPLE = 
    {
        "text": "My New Post",
        "date": "2020-11-19"
    }
RESPONSE = JsonObject
RESPONSE_SAMPLE = 
    {msg:"1"} => successfull ,
    {msg:"Need to Login first!"} => anonymous users can not post,
    {msg:"Can't post empty posts"} => posts should not be empty,
    {msg:"Date field is missing"} => date is mandatory
ACTIVE = true
```

```bash
# Retrieve posts
# Has an optional path param, if you pass it, it retrieves the posts of that specific user,if not, retrieves all the posts
API_URL = GET:http://localhost:3000/posts/:username?
RESPONSE = JsonObject
RESPONSE_SAMPLE = 
    [
        {
            "id": "4",
            "date": "2020-12-01T20:30:00.000Z",
            "username": "testUser",
            "likes": "10",
            "text": "testPost"
        },
        {
            "id": "5",
            "date": "2020-11-30T20:30:00.000Z",
            "username": "testUser2",
            "likes": "15",
            "text": "undefined"
        }
    ]
ACTIVE = true
```