var express = require("express");
const userController = require("../controllers/users");
var router = express.Router();

router.get("/", userController.getUsers);

router.post("/add", userController.Add);



module.exports = router;
