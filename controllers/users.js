const UserModel = require("../db/models/User.model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.getUsers= (req, res) => {
  return res.status(200).send({ data: "respond with a resource" });
};

exports.Add = async (req, res) => {
  try {
    const body = req.body;

    console.log(body);

    const user = new UserModel(body);
    await user.save();
    return res.status(200).send({ status: true, message: "User added" });
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};


exports.login = async (req, res, next) => {
  try {
    const body = req.body;

    console.log(body);
     return
     UserModel.find({email:req.body.name}).exec()
     .then(user=>{
      if(user.length < 1)
      return res.status(401).json({
    msg:"user not found"})

    bcrypt.compare(req.body.password, user[user.length-1].password, (err, result)=>{
      if(!result){
      return res.status(401).json({
        msg:"Password is incorrect!"})
    }
    if(result){
      const token = jwt.sign({
        email:user[user.length-1].email
      },
      'this is confidential',
        {expiresIn:"1h"}
      );
      res.status(200).json({
        msg:"User login Successfully.",
        token:token
      })

    }})


  })}

     catch (err) {
      return res.status(500).send({ status: false, message: err.message });
    }
  
};