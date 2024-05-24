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
module.exports = {
    getFakeJsonArr
}