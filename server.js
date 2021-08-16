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

function seedCollection(){
  const Hiba = new userModel({
    email:"hibaalmade998@gmail.com",
    books:[
      {
        title:"Forty rules of love",
        descripyion:"The Turkish writer Alf Shafak was published after her novel The Bastard of Istanbul. In this novel, the writer narrates two parallel tales, one in contemporary times and the other in the thirteenth century, when Rumi encountered his spiritual guide, the traveling dervish known as “Shams of Tabrizi” and how they together embodied the eternal message of love poetry..",
        status:"A novel"
    
      },
      {
        title:"pulse",
        descripyion:"Romantic novel of four chapters that tells of a love affair in a time of war, which includes a lot of social, political and intellectual documentation, a cultural novel par excellence within the framework of a flirtatious description full of feelings.",
        status:"A novel"
      },
      {
        title:"I am Youssef",
        descripyion:"Writer Ayman Al-Atoum creates some dialogues between the protagonists of the novel, in which he deals with the story of Prophet Yusuf, peace be upon him. Through the dialogues, the writer reviews the story mentioned in the Qur’an in Surat Yusuf, as well as answers some of the questions that revolve in the mind of the one who knows the story of the Prophet of God Yusuf, peace be upon him.",
        status:"A novel"
      }


    ]
  })
  Hiba.save();
}
// seedCollection();

app.get('/books',(req,res)=>{
  let email = req.query.email;
  userModel.find({email:email},(error, data)=>{
    if(error){
      res.send("something error");
    }else{
      res.send(data[0].books);
    }
  });
});

app.listen(8000, () => console.log(`listening on 8000`));
