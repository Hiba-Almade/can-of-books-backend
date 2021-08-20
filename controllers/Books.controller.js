'use strict';
const userModel = require("../schema");


const gitBook = (req, res) => {
  let email = req.query.email;
  userModel.find({ email: email }, (error, data) => {
    if (error) {
      res.send("something error");
    } else {
      res.send(data[0].books);
    }
  });
}

const createBook = (req, res) => {
  console.log(req.body)
  //let {email,title ,description , status } = req.body
  userModel.findOne({ email: req.body.email }, (err, userdata) => {
    if (err) {
      res.send('no data ', error)
    } else {
      userdata.books.push({
        title: req.body.title,
        description: req.body.description,
        status: req.body.status
      })

      userdata.save();
      res.json(userdata);
    }
  })

  // let newBook= new userModel(data);
  // newBook.save().then(    
  //     res.json({message:"Book Add succefully",book:newBook})
  // )

}

const deleteBook = (req, res) => {
  //console.log("delete book");
  userModel.findOne({ email: req.query.email }, (error, userdata) => {
    console.log(req.params.id)
    console.log(req.query.email)
    if (error) {
      res.send(error)
    } else {
      userdata.books.splice(req.params.id, 1);

      userdata.save();
      res.send(userdata.book);
    }

  });
}

const editbook =(req,res) => {
  userModel.findOne({ email: req.body.email }, (error, userdata) => {
    if (error) {
      res.send(error)
    } else {
      userdata.books.splice(req.params.id, 1, {
        title: req.body.name,
        description:req.body.description,
        status:req.body.status
      });
      userdata.save();
      res.send(userdata)
    }
  });
}


module.exports = { gitBook, createBook, deleteBook , editbook}