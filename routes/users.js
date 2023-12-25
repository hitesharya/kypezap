var express = require("express");
const userController = require("../controllers/users");
var router = express.Router();
const validate = require("../validations");
const { register } = require("../validations/users");

router.get("/", userController.getUsers);

router.post("/add", userController.Add);

router.post("/login", userController.login);
router.post("/signup", validate(register), userController.Signup);
router.post("/verifyMail", userController.verifyMail);

module.exports = router;
