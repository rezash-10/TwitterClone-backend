const express = require('express');
const cors = require('cors');
var uuid=require('uuid');
const session=require('express-session');
require('./models/init-db')
//********************************************/
const app = express()
const corsOptions = {
    origin: 'http://localhost:9000',//(https://your-client-app.com)
    optionsSuccessStatus: 200,
  };
app.use(cors(corsOptions))
app.use(session(
    { name:'Session',
      genid: function(req) {
        
        return uuid.v4();}, // use UUIDs for session IDs
      secret: 'secret',
      resave: false,
      saveUninitialized: false,
      cookie: { secure: false,expires:1800000 }
    }));
app.use('/', require('./routes/temp'));
app.use('/', require('./routes/authentication'));
app.use('/', require('./routes/post'));
app.use('/', require('./routes/posts'));

//*******************************************1*/
app.listen(3000, () => {
  console.log('Server running on port 3000')
})