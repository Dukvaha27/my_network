const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  image:String,
  name: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  isActivated: { type: Boolean ,default:false},
  isActivationLink: { type: String },
});

const User = model("User", userSchema);

module.exports = User;
