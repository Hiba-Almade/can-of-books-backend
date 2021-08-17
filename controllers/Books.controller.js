'use strict';
const userModel = require("../schema");
 

const gitBook = (req,res)=>{
    let email = req.query.email;
    userModel.find({email:email},(error, data)=>{
      if(error){
        res.send("something error");
      }else{
        res.send(data[0].books);
      }
    });
  }
 
  const createBook =()=>{
    let data={
        email:req.body["email"],
        title:req.body["title"],
        descripyion:req.body["descripyion"],
        status:req.body["status"]
    }
    userModel.find({email:email},(err,data) =>{
        if(err){
                res.send('no data ',error)
        }else{
            data[0].books.push({
                title: title,
                descripyion:descripyion,
                status:status
            })
            data[0].save();
            res.send(data[0].books);
        }
    })

    // let newBook= new userModel(data);
    // newBook.save().then(    
    //     res.json({message:"Book Add succefully",book:newBook})
    // )

  }

  const deleteBook = () =>{
console.log("delete book");
  }




module.exports={gitBook , createBook , deleteBook }