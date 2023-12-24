const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstName: { type: String, required: true },
  middleName: { type: String, },
  lastName: { type: String, },
  age: { type: Number,index: true },
  country: { type: String,index: true },
  mobile: { type: String, index: true },
  email: { type: String, required: true, index: true },
  role: { type: String, default: "STUDENT", index: true },
  password: { type: String, required: true },
  avatar: { type: String, default: "" },
  otp: { type: String, default: "1234" },
  resetToken: { type: String, default: "" },
  isVerified: { type: Boolean, default: false },
  createdAt: { type: Date, required: true, default: Date.now },
  updatedAt: { type: Date, required: true, default: Date.now },
});

module.exports = mongoose.model("User", UserSchema);
