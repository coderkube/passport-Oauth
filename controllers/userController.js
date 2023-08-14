import { asyncError } from "../middleware/error.js";
import User from "../models/user_model.js";
import ErrorHandler from "../utils/errorHandler.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// //* All the Users API functions

export const getUsers = async (req, res, next) => {
  const users = await User.find();
  res.status(201).json({
    success: true,
    data: users,
  });
};

export const getLogin = asyncError(async (req,res,next) => {

  const { email, password } = req.body;
  if (!(email && password)) {
   return res.status(400).send("All inputs are required");
  }
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    // Create token
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      // {
      //   expiresIn: "2h",
      // }
    );
    user.token = token;
    return res.status(200).json({
      success: true,
      message: "Logged In Successfully",
      user: user
    }); 
  }
 return  res.status(401).json({
    success: false,
    message: "user not found",
  });
});

//*---------google------------
export const getMyProfile = async (req,res,next) => {
  res.status(200).json({
    success: true,
    user:req.user
  });
};

export const logout = async(req,res,next)=> {
  req.session.destroy(()=>{
    if(err) return next(err);
    res.clearCookie("connect.sid");
    res.status(200).json({
      message: "Logged Out",
    });
  });
};
//*-------------------


export const createUser = async (req, res, next) => {
  console.log("response", req.body);
  const { name, email, password, socialType } = req.body;

  if (!(email && password && name && socialType)) {
    return res.status(400).send("All inputs are required");
  }

  const oldUser = await User.findOne({ email });

  if (oldUser) {
    return res.status(409).send("User Already Exists. Please Login");
  } else {
    const encryptedPassword = await bcrypt.hash(password, 8);

    const user = await User.create({ name, email, password: encryptedPassword , socialType: "manual"});

    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY
    );

    user.token = token;
    console.log(user.token);

    return res.status(200).json({
      success: true,
      data: user,
    });
  }
};


export const updateUser = async (req, res) => {
  let updateUser = await User.findById(req.params.id);
  if (!updateUser) {
    return res.status(500).json({
      success: false,
      message: "User not found.",
    });
  }
  updateUser = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    useFindAndModify: false,
    runValidators: true,
  });
  res.status(200).json({
    success: true,
    data: updateUser,
  });
};

export const deleteUser = async (req, res) => {
  const deleteUser = await User.findByIdAndRemove(req.params.id);
  try {
    if (!deleteUser) {
      return res.status(500).json({
        success: false,
        message: "User not found.",
      });
    }
    res.status(200).json({
      success: true,
      message: "User delete successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred while deleting the user.",
    });
  }
};


