const UserModel = require("../db/models/User.model");

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
