'use strict' ;
const mongoose = require('mongoose');

let bookSchema = new mongoose.Schema({
    title:String,
    descripyion:String,
    status:String

});

let userSchema =  new mongoose.Schema({
    email:String,
    books:[bookSchema]
});

let bookModel = mongoose.model("book", bookSchema);
let userModel = mongoose.model("user", userSchema);



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


  module.exports = userModel;