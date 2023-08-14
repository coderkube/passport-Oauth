import express from "express";
import { createUser, getUsers, updateUser, deleteUser, getLogin, getMyProfile, logout  } from "../controllers/userController.js";
import passport from "passport";
import { isAuthenticated, isAuthorized } from "../middleware/auth.js";

//* routing
const router = express.Router();

//*--------google auth------------
router.get("/google-login", passport.authenticate("google",{
    scope: ["profile"],
}));

router.get("/login", passport.authenticate("google",{
    scope: ["profile"],
    successRedirect: process.env.FRONTEND_URL,
    failureRedirect: "/"
}),

(req,res,next)=> {
    res.send("Logged in with Google");
}
);
//*--------------------



//*------------facebook------------
router.get("/auth/facebook", passport.authenticate("facebook"));

router.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: process.env.FRONTEND_URL,
    failureRedirect: "/"
  }),
  (req,res,next)=> {
    res.send("Logged in with Facebook");
}
);
//*--------------

//*manual login
router.post("/get-login", getLogin);

//* get user profile with google or facebook using passport
router.get("/me", isAuthorized, getMyProfile);
//* logout user profile from google or facebook using passport
router.get("/logout", logout);

//*  create product
router.post("/create-user", createUser);

//* read product
router.get("/get-user",isAuthorized, getUsers);

// * update product
router.put("/user/:id", updateUser);

// * delete product
router.delete("/user/:id", deleteUser);

export default router;