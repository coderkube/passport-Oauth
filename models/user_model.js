  import mongoose from "mongoose";
  import joi from "joi";

  // * user schema
  const userSchema = new mongoose.Schema({
    name: String,
    email: {
      type: String,
      required: [true, "Please enter your email"],
      unique: true,
    },
    photo: String,
    socialId: {
      type: String,
      default: null
    },
    socialType: {
      type: String,
      enum: ["manual","google","facebook"],
      default: "manual"
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user"
    },
    token: { 
      type: String 
    },
    password: { 
      type: String 
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  }); 

  //* Middleware to update 'updatedAt' whenever a user is modified

  userSchema.pre("save", function (next) {
    this.updatedAt = new Date();
    next();
  });

  // * product model
  const User = mongoose.model("user", userSchema);
  export default User;

