import {Strategy as FacebookStrategy} from "passport-facebook";
import passport from "passport";
import User from "../models/user_model.js";

export const connectPassportForFacebook = ()=> {
    passport.use( new FacebookStrategy( {
        clientID: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL: process.env.FACEBOOK_CALLBACK_URL,
      }, async function (accessToken, refreshToken, profile, done){
        //Database comes here
        const user = await User.findOne({
            googleId: profile.id,
        });
        if(!user){
            const newUser = await User.create({
                socialId: profile.id,
                name: profile.displayName,
                photo: profile.photos[0].value,
                email: profile.email,
                socialType: "facebook"
            });
            return done(null,newUser);
        }else {
            return done(null,user);
        }

    }));

passport.serializeUser((user,done)=> {
    done(null,user.id);
});
passport.deserializeUser(async (id,done) => {
    //*after database connect
    const user = await User.findById(id);
    done(null,user);
});

}

export default connectPassportForFacebook;