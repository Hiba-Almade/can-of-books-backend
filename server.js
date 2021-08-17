'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');
const userModel = require('./schema')
const mongoose = require('mongoose');

const app = express();
app.use(cors());

mongoose.connect("mongodb://localhost:27017/bookdb", {
  userNewUrlParser: true
})
const PORT = process.env.PORT;

const {gitBook , createBook , deleteBook } = require('./controllers/Books.controller')

const client = jwksClient({
  // this url comes from your app on the auth0 dashboard 
  jwksUri: `https://dev-126gsiqt.us.auth0.com/.well-known/jwks.json`
});

// this is a ready to use function
const getKey=(header, callback)=>{
  client.getSigningKey(header.kid, function(err, key) {
      const signingKey = key.publicKey || key.rsaPublicKey;
      callback(null, signingKey);
    });
}
app.get('/',(req,res)=>{
  res.send('working well....')
});

app.get('/auth',(req,res)=>{
  const token=req.headers.authorization.split(' ')[1];
  jwt.verify(token,getKey,{},(err,user)=>{
      if(err){
          res.send('invalid token');
      }
      res.send(user)
  })
});



app.get('/test', (request, response) => {

  // TODO: 
  // STEP 1: get the jwt from the headers
  // STEP 2. use the jsonwebtoken library to verify that it is a valid jwt
  // jsonwebtoken dock - https://www.npmjs.com/package/jsonwebtoken
  // STEP 3: to prove that everything is working correctly, send the opened jwt back to the front-end

});

app.get('/books',gitBook);
app.post("/addbooks",createBook);
app.delete("/delbooks/:id",deleteBook);

app.listen(8000, () => console.log(`listening on 8000`));
