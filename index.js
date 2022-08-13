const express = require('express')
const app = express()
const port = 8000;
var jwt = require('jsonwebtoken');


app.get('/', function (req, res) {
  res.json({message: 'Hey World'})
})


app.post('/tokenGeneration', (req, res) => {
  const user = {
    id:1,
    username: 'decbatch',
    email: 'dec@gmail.com'
  }
  jwt.sign(user, 'secretkey', function(err, token) {
    if(err){
      res.statusCode(403)
    }
    else{
      res.json({
        token
      })
    }
  });
})

app.listen(port, function(err){
    if(err){
        console.log(`error in runing server ${err}`)
    }
    console.log(`Server is up and running on port ${port}`)
})