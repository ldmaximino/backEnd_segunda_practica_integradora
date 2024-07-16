import * as services from "../services/user_services.js";
import { generateToken } from "../middlewares/jwt.js";

export const registerResponse = (req, res, next) => {
  try {
    return res.redirect("/user_registered");
  } catch (error) {
    next(error);
  }
};

export const loginJwt = async(req,res,next)=>{
  try {
    const user = await services.login(req.body);
    if (!user) return res.redirect("/user_login_error");
    const token = generateToken(user);
    res.cookie('token', token, { httpOnly: true });
    return res.redirect("/products");
      } catch (error) {
    next(error)
  }
}