import "dotenv/config";

let cartDao;

// Function that makes the Dao connection variable
const initializeCartDao = async () => {
  if (process.env.PERSISTENCE === "fs") {
    const { __dirname } = await import("../utils.js");
    const { default: CartDaoFS } = await import(
      "../daos/filesystem/cart_dao.js"
    );
    cartDao = new CartDaoFS(`${__dirname}/data/carts.json`);
  } else if (process.env.PERSISTENCE === "mongodb") {
    const { default: CartDaoMongoDB } = await import(
      "../daos/mongodb/cart_dao.js"
    );
    cartDao = new CartDaoMongoDB();
  } else {
    throw new Error("PERSISTENCE not defined or supported");
  }
};

// Call the function to initialize 'productDao'
await initializeCartDao();

export const getAllCarts = async () => {
  try {
    return await cartDao.getAllCarts();
  } catch (error) {
    throw new Error(error);
  }
};

export const getCartById = async (cid) => {
  try {
    return await cartDao.getCartById(cid);
  } catch (error) {
    throw new Error(error);
  }
};

export const createCart = async (object) => {
  try {
    return await cartDao.createCart(object);
  } catch (error) {
    throw new Error(error);
  }
};

export const saveProductToCart = async (cid, pid) => {
  try {
    return await cartDao.saveProductToCart(cid, pid);
  } catch (error) {
    throw new Error(error);
  }
};

export const updateCartWithProducts = async (cid, object) => {
  try {
    return await cartDao.updateCartWithProducts(cid, object);
  } catch (error) {
    throw new Error(error);
  }
};

export const updateProductQuantity = async (cid, pid, quantity) => {
  try {
    return await cartDao.updateProductQuantity(cid, pid, quantity);
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteProductFromCart = async (cid, pid) => {
  try {
    return await cartDao.deleteProductFromCart(cid, pid);
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteAllProductsFromCart = async (cid) => {
  try {
    return await cartDao.deleteAllProductsFromCart(cid);
  } catch (error) {
    throw new Error(error);
  }
};
