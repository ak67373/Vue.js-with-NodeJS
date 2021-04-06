const mysql=require('mysql')

const express = require('express');
const path = require('path');
const randomId = require('random-id');
const app = express(),
      bodyParser = require("body-parser");
      port = 3080;

const db=mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'12345678',
  database:'vuejs'
})

db.connect((err)=>{
  if(err) throw err
  console.log('connected')
})

// place holder for the data
const users = [];

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../my-app/dist')));

app.get('/api/users', (req, res) => {
  console.log('GET api/users called!!!!!!!')
  res.json(users);
});

app.post('/api/user', (req, res) => {
  const user = req.body.user;
  user.id = randomId(10);
  console.log('POST Adding user:::::', user.id);
  console.log("All records",users)
  users.push(user);
  var sql = 'INSERT INTO users SET ?';
  db.query(sql, user,function (err, data) { 
      if (err) throw err;
         console.log("User dat is inserted successfully "); 
  });
  
  res.json("user addedd");

});

app.get('/', (req,res) => {
  res.sendFile(path.join(__dirname, '../my-app/build/index.html'));
});

app.listen(port, () => {
    console.log(`Server listening on the port::${port}`);
});

