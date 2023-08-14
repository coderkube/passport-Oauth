import {Strategy as GoogleStrategy} from "passport-google-oauth20";
import passport from "passport";
import User from "../models/user_model.js";

export const connectPassportForGoogle = ()=> {
    passport.use( new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
    }, async function (accessToken, refreshToken, profile, done){
        //Database comes here
        const user = await User.findOne({
            socialId: profile.id,
        });
        if(!user){
            const newUser = await User.create({
                socialId: profile.id,
                name: profile.displayName,
                photo: profile.photos[0].value,
                email: profile.email,
                socialType: "google"
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

export default connectPassportForGoogle;