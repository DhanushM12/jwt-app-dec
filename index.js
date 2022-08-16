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
  jwt.sign(user, 'secretkey', {expiresIn: '60s'}, function(err, token) {
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


app.post('/verifyToken', extractToken, (req, res) => {
  jwt.verify(req.token, 'secretkey', function(err, data) {
    if(err){
      res.sendStatus(403);
    }
    else{
      res.json({
        message: 'user access granted',
        data
      })
    }
  });
   

})
// middleware
function extractToken(req, res, next){
  const bearerHeader = req.headers['authorization']; // Bearer token
  if(bearerHeader !== undefined){
    const bearer = bearerHeader.split(' '); // [bearer, token]
    const bearerToken = bearer[1]; // token
    req.token = bearerToken;
    next();
  }
  else{
    res.sendStatus(403);
  }
}

app.listen(port, function(err){
    if(err){
        console.log(`error in runing server ${err}`)
    }
    console.log(`Server is up and running on port ${port}`)
})