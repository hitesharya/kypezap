const mongoose = require("mongoose");

const dbUrl = process.env.DB_URL;

mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  //   useCreateIndex: false,
  //   useFindAndModify: false,
});

const db = mongoose.connection;

db.on("error", (err) => {
  console.error(`MongoDB connection error: ${err}`);
  //process.exit(1);
});

db.once("open", () => {
  console.log("MongoDB connection established successfully");
});

module.exports = db;
