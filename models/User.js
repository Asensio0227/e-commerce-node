const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const path = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Pease provide name"],
    minlenght: 5,
    maxlenght: 50,
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Pease provide email"],
    validate: {
      validator: validator.isEmail,
      message: "Please enter a valid email address",
    }
  },
  password: {
    type: String,
    required: [true, "Pease provide password"],
    minlenght:6,
  },
  roles: {
    type: String,
    enum: ["admin", "user"],
    default:"user",
  }
},
  {
    timestamps: true
  }
);

UserSchema.pre('save', async function () {
  if (!this.isModified("password")) return;
  const genSalt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, genSalt)
});

UserSchema.methods.ComparePassword =async function (candidatePassword) {
  const isMatch =await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
}



module.exports = mongoose.model('User', UserSchema);