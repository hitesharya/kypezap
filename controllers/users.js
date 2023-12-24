const { model } = require("mongoose");
const UserModel = require("../db/models/User.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.getUsers = (req, res) => {
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

exports.Signup = async (req,res) => {


 
  try {
    const {firstName , lastName, middleName, age, country, mobile, email, password} = req.body;
    // Existing User Check
    const existingUser = await UserModel.findOne({email : email});
    if(existingUser){
      return res.status(400).json({message:"User Already Exists"});
    }
    // HashedPassword
    const hashedPassword = await bcrypt.hash(password, 10);

    // User Creation
    const result = await UserModel.create({
      email : email,
      password : hashedPassword,
      firstName,
      lastName,
      middleName,
      age,
      country,
      mobile,
    })

    // Token Generate with using JWT
    const token = jwt.sign({email : result.email , id : result._id},process.env.SECRET_KEY);
    res.status(201).json({user : result, token: token})
    
  } catch (error) {
    console.log(error);
    res.status(500).json({message : "Internal Server Error"});
  }
}
