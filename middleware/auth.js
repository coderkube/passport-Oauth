import ErrorHandler from "../utils/errorHandler.js";
import jwt from "jsonwebtoken";

//* google
export const isAuthenticated = (req,res,next) => {
    const token = req.cookies["connect.sid"];
    // console.log(token);
    if(!token){
        return next(new ErrorHandler("Not Logged In", 401))
    }
    next();
}

//* manual
export const isAuthorized = (req,res,next) => {
    function extractToken (req) {
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            console.log("---1---");
            return req.headers.authorization.split(' ')[1];
        } else if (req.query && req.query.token) {
            console.log("---2---");
            return req.query.token;
        } else if(req.headers && req.headers["x-access-token"]) {
            console.log("---3---");
            return req.headers["x-access-token"];
        }else if(req.body &&  req.body.token) {
            console.log("---4---");
            return req.body.token;
        }
        console.log("---5---");
        return null;
    }
    
    // const token = req.body.token || req.query.token || req.headers["x-access-token"];

    const token = extractToken(req);
    console.log(token);
    if(!token){
        return next(new ErrorHandler("A token is required for authentication", 401))
    }
    try {
        const decoded = jwt.verify(token, process.env.TOKEN_KEY);
        req.user = decoded;
      } catch (err) {
        return res.status(401).send("Invalid Token");
      }
    next();
};

  