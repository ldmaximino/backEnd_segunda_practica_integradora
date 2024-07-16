import UserDao from "../daos/mongodb/user_dao.js";
import { UserModel } from "../daos/mongodb/models/user_model.js";
import { hashearPass, verifyPassHasheada } from "../utils.js";
const userDao = new UserDao(UserModel);

export const getUserById = async (id) => {
  try {
    return await userDao.getUserById(id);
  } catch (error) {
    throw new Error(error);
  }
};

export const getUserByEmail = async (email) => {
  try {
    return await userDao.getUserByEmail(email);
  } catch (error) {
    throw new Error(error);
  }
};

export const register = async (user) => {
  try {
    const { email, password } = user;
    const existUser = await getUserByEmail(email);
    if (!existUser) {
      const newUser = await userDao.register({
        ...user,
        password: hashearPass(password),
      });
      return newUser;
    } else {
      return null;
    }
  } catch (error) {
    throw new Error(error);
  }
};

export const login = async (user) => {
  try {
    let userExist = "";
    const { email, password } = user;
    if (email.toLowerCase() === "admincoder@coder.com" && password === "adminCod3r123") {
      userExist = {
        ...user,
        first_name: "Coderhouse",
        last_name: "",
        role: "admin",
      };
    } else {
      userExist = await getUserByEmail(email);
      if (!userExist) return null;
      const passValid = verifyPassHasheada(password, userExist.password);
      if (!passValid) return null;
    }
    return userExist;
  } catch (error) {
    throw new Error(error);
  }
};
