const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: { 
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: { 
    type: String, 
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: { 
    type: String,
    required: true,
    minlength: 6,
  }
});

module.exports = mongoose.model("User", userSchema);
