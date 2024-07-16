import * as services from "../services/user_services.js";
import passport from "passport";
import { Strategy as GithubStrategy } from "passport-github2";
import "dotenv/config";

const strategyConfig = {
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: process.env.CALLBACKURL
};

export const registerOrLogin = async (accessToken, refreshToken, profile, done) => {
    try {
        let first_name = '';
        let last_name = '';
        const email = profile._json.email || '';
        const longiName = profile._json.name.split(' ').length;
        if(longiName >= 3) {
            first_name = profile._json.name.split(' ')[0] + ' ' + profile._json.name.split(' ')[1];
            last_name = profile._json.name.split(' ')[2];
        } else {
            first_name = profile._json.name.split(' ')[0]
            last_name = profile._json.name.split(' ') === 2 ? profile._json.name.split(' ')[1] : '';
        };
        const user = await services.getUserByEmail(email);
        if(user) return done(null,user); //github callbackurl is executed
        const newUser = await services.register({
            first_name,
            last_name,
            email,
            password: ' ',
            isGithub: true
        })
    } catch (error) {
        return done(error);
    }
};

passport.use("github", new GithubStrategy(strategyConfig, registerOrLogin));

passport.serializeUser((user, done) => {
  return done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await services.getUserById(id);
    return done(null, user);
  } catch (error) {
    return done(error);
  }
});
