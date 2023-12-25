var createError = require("http-errors");
require("dotenv").config();
var express = require("express");
const http = require("http");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");

var usersRouter = require("./routes/users");

var app = express();
require("./db/db");
 




var port = process.env.PORT || "4000";

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

app.use("/", usersRouter);

// catch 404 and forward to error handler

var server = http.createServer(app);
server.listen(port, () => {
  console.log(`server listening on ${port}`);
});
