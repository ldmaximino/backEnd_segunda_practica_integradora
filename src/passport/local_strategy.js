import * as services from "../services/user_services.js";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";

const strategyConfig = {
  usernameField: "email",
  passwordField: "password",
  passReqToCallback: true,
};

export const register = async (req, email, password, done) => {
  try {
    const existUser = await services.getUserByEmail(email);
    if (existUser) return done(null, false); //If it returns an email from a user that already exists, false is returned so that the user is not entered again
    const newUser = await services.register(req.body);
    return done(null, newUser); //If the user's email does not exist in the database, then return newUser to register it
  } catch (error) {
    return done(error);
  }
};

export const login = async (req, email, password, done) => {
  try {
    const userLogin = await services.login({ email, password });
    if (!userLogin) {
      req.session.destroy();
      return done(null, false);
    }
    return done(null, userLogin);
  } catch (error) {
    return done(error);
  }
};

const registerStrategy = new LocalStrategy(strategyConfig, register);
const loginStrategy = new LocalStrategy(strategyConfig, login);

passport.use("registerStrat", registerStrategy);
passport.use("loginStrat", loginStrategy);

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
