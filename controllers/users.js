const UserModel = require("../db/models/User.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mailService = require("../services/mailService");
const CryptoJS = require("crypto-js");

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

exports.login = async (req, res, next) => {
  try {
    const body = req.body;

    console.log(body);
    return;
    UserModel.find({ email: req.body.name })
      .exec()
      .then((user) => {
        if (user.length < 1)
          return res.status(401).json({
            msg: "user not found",
          });

        bcrypt.compare(
          req.body.password,
          user[user.length - 1].password,
          (err, result) => {
            if (!result) {
              return res.status(401).json({
                msg: "Password is incorrect!",
              });
            }
            if (result) {
              const token = jwt.sign(
                {
                  email: user[user.length - 1].email,
                },
                "this is confidential",
                { expiresIn: "1h" }
              );
              res.status(200).json({
                msg: "User login Successfully.",
                token: token,
              });
            }
          }
        );
      });
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};
exports.Signup = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      middleName,
      role,
      age,
      country,
      mobile,
      email,
      password,
    } = req.body;
    // Existing User Check
    const existingUser = await UserModel.findOne({
      email: email,
      isDeleted: false,
    });
    if (existingUser) {
      return res
        .status(400)
        .json({ status: false, message: "User Already Exists" });
    }
    // HashedPassword
    const hashedPassword = await bcrypt.hash(password, 10);

    // User Creation
    const result = await UserModel.create({
      email: email,
      password: hashedPassword,
      firstName,
      lastName,
      middleName,
      role,
      age,
      country,
      mobile,
    });

    // Token Generate with using JWT
    const token = jwt.sign(
      { user: result, email: result.email, id: result._id },
      process.env.SECRET_KEY
    );
    res.status(201).json({
      status: true,
      message: "User register successfully.",
      data: { user: result, token: token },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, message: error.message });
  }
};

exports.verifyMail = async (req, res) => {
  try {
    const encryptData = (data) => {
      const encryptedData = CryptoJS.AES.encrypt(
        data,
        "my_super_key"
      ).toString();
      return encryptedData;
    };

    const encryptedEmailData = encryptData(
      req.body.email + "|" + req.body.password
    );

    const resetLink = `https://kype-zap.vercel.app/roles?data=${encodeURIComponent(
      encryptedEmailData
    )}`;

    const data = {
      email: req.body.email,
      body: ` <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5f5; border-radius: 5px; font-family: Arial, sans-serif; line-height: 1.6;">
      <h2 style="text-align: center;">Verification email address</h2>
      <p>Dear User,</p>
      <p>Welcome to KypeZap, Before you start we just need to confirm you email address. To proceed with the verification link, please click the button below:</p>
      <p style="text-align: center; margin-bottom: 20px;">
        <a style="display: inline-block; background-color: #4CAF50; color: #ffffff; text-decoration: none; padding: 10px 20px; border-radius: 5px;" href="${resetLink}">Verify Email Address</a>
      </p>
      <p>If you have not requested this, please ignore this email.</p>
      <div style="margin-top: 20px; text-align: center;">
        <p>Best regards,</p>
        <p>Team KypeZap</p>
      </div>
    </div>`,
    };
    const result = await mailService.sendMail(data.email, data.body);
    return res.json(result);
  } catch (error) {
    return res.status(404).status(error.message);
  }
};
