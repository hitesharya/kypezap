var express = require("express");
const userController = require("../controllers/users");
var router = express.Router();

/* GET users listing. */
router.get("/", userController.getUsers);

module.exports = router;
