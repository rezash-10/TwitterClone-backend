const express = require('express')
const cors = require('cors');
//********************************************/
const app = express()
const corsOptions = {
    origin: 'http://localhost:9000',//(https://your-client-app.com)
    optionsSuccessStatus: 200,
  };
app.use(cors(corsOptions))


let data = getFakeJsonArr()
console.log(data)
app.get('/users', (req, res, next) => {
  console.log('api called')
  res.json(getFakeJsonArr())
})
//********************************************/
function getFakeJsonArr(){

    // Sample arrays of usernames and fullnames
    const usernames = ["user1", "user2", "user3", "user4", "user5", "user6", "user7", "user8", "user9", "user10"];
    const fullnames = ["John Doe", "Jane Smith", "Michael Johnson", "Emily Davis", "Daniel Wilson",
                       "Olivia Thompson", "David Anderson", "Sophia Martinez", "Joseph Taylor", "Emma Thomas"];
    
    const data = [];
    
    for (let i = 0; i < 10; i++) {
      const username = usernames[Math.floor(Math.random() * usernames.length)];
      const fullname = fullnames[Math.floor(Math.random() * fullnames.length)];
      const memoDate = Date.now();
      const caption = `Caption ${i + 1}`;
      const likes = i * 100;
    
      const item = {
        username,
        fullname,
        memo_date: memoDate,
        caption,
        likes
      };
    
      data.push(item);
    }
    
    
    return data
}
//*******************************************1*/
app.listen(3000, () => {
  console.log('Server running on port 3000')
})