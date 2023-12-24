var express = require("express");
const userController = require("../controllers/users");
var router = express.Router();
const validate = require("../validations");
const { register } = require("../validations/users");

router.get("/", userController.getUsers);

router.post("/add", userController.Add);

router.post("/signup", validate(register), userController.Signup);

module.exports = router;
