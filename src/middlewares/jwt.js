import jwt from "jsonwebtoken";
import "dotenv/config";

export const generateToken = (user, time = `${process.env.TIMETOKEN}m`) => {
  const payload = {
    userId: user._id,
  };

  return jwt.sign(payload, process.env.SECRET_KEY, {
    expiresIn: time,
  });
};

