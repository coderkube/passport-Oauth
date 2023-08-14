import express  from "express";
import dotenv from "dotenv";
import session from "express-session";
import cookieParser from "cookie-parser";
import {errorMiddleware} from "./middleware/error.js";
import userRouter from "./routes/user_routes.js";
import productRouter from "./routes/product_routes.js";
import orderRouter from "./routes/order_routes.js";
import bodyParser from "body-parser";
import passport from "passport";
import connectPassportForGoogle from "./utils/provider.js";
import connectPassportForFacebook from "./utils/secondProvider.js";

const app = express();
export default app;

dotenv.config({
  path: "./config/config.env",
});

//* using middleware
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  //* change cookie name
  // name: 
}));

//* parse the body - to access body
app.use(bodyParser.urlencoded({ extended: false }));

//* use express framework
app.use(express.json());

//*store cookie
app.use(cookieParser());

app.use(passport.authenticate("session"));
app.use(passport.initialize());
app.use(passport.session());

//* connect passport for google login
connectPassportForGoogle();
//* connect passport for facebook login
connectPassportForFacebook();

//* routes
app.use("/v1", userRouter);
app.use("/v2",productRouter);
app.use("/v3",orderRouter);

//* using error middleware
app.use(errorMiddleware);